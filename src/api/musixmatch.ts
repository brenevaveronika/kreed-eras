interface LyricsResponse {
    subtitle_body?: string;
}

interface TrackSearchResult {
    track_id: number;
}

interface MusixmatchCache {
    get(key: string): Promise<string | null>;
    set(key: string, value: string, ttl?: number): Promise<void>;
}

class MemoryCache implements MusixmatchCache {
    private store: Map<string, { value: string; expires: number }> = new Map();

    async get(key: string): Promise<string | null> {
        const item = this.store.get(key);
        if (!item || item.expires < Date.now()) {
            this.store.delete(key);
            return null;
        }
        return item.value;
    }

    async set(key: string, value: string, ttl: number = 600): Promise<void> {
        this.store.set(key, {
            value,
            expires: Date.now() + ttl * 1000
        });
    }
}

export class MusixmatchAPI {
    private cache: MusixmatchCache;
    private baseUrl = '/musixmatch/ws/1.1';
    private userToken: string | null = null;
    private tokenExpires = 0;

    constructor(cache?: MusixmatchCache) {
        this.cache = cache || new MemoryCache();
    }

    private async fetchAPI(url: string): Promise<any> {
        const response = await fetch(url, {
            headers: {
                'authority': 'apic-desktop.musixmatch.com',
                'cookie': 'AWSELBCORS=0; AWSELB=0;'
            }
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        return response.json();
    }

    private async getToken(): Promise<void> {
        const cachedToken = await this.cache.get('musix_token');
        if (cachedToken) {
            const { token, expires } = JSON.parse(cachedToken);
            this.userToken = token;
            this.tokenExpires = expires;
            return;
        }

        const data = await this.fetchAPI(`${this.baseUrl}/token.get?app_id=web-desktop-app-v1.0`);

        if (data.message.header.status_code !== 200) {
            throw new Error('Failed to retrieve token');
        }

        this.userToken = data.message.body.user_token;
        this.tokenExpires = Date.now() + 600000; // 10 minutes

        await this.cache.set(
            'musix_token',
            JSON.stringify({
                token: this.userToken,
                expires: this.tokenExpires
            }),
            600
        );
    }

    private async ensureToken(): Promise<void> {
        if (!this.userToken || this.tokenExpires < Date.now()) {
            await this.getToken();
        }
    }

    public async searchTrack(query: string): Promise<TrackSearchResult> {
        await this.ensureToken();
        const cacheKey = `search_${query}`;
        const cached = await this.cache.get(cacheKey);

        if (cached) {
            return JSON.parse(cached);
        }

        const url = `${this.baseUrl}/macro.search?app_id=web-desktop-app-v1.0&page_size=5&page=1&s_track_rating=desc&quorum_factor=1.0&q=${encodeURIComponent(query)}&usertoken=${this.userToken}`;
        const data = await this.fetchAPI(url);

        if (!data.message?.body?.macro_result_list?.track_list?.[0]?.track) {
            throw new Error('Track not found');
        }

        const result = {
            track_id: data.message.body.macro_result_list.track_list[0].track.track_id
        };

        await this.cache.set(cacheKey, JSON.stringify(result), 600);
        return result;
    }

    public async getLyrics(trackId: number): Promise<string> {
        await this.ensureToken();
        const cacheKey = `lyrics_${trackId}`;
        const cached = await this.cache.get(cacheKey);

        if (cached) {
            return cached;
        }

        const url = `${this.baseUrl}/track.subtitle.get?app_id=web-desktop-app-v1.0&subtitle_format=lrc&track_id=${trackId}&usertoken=${this.userToken}`;
        const data = await this.fetchAPI(url);

        if (!data.message?.body?.subtitle?.subtitle_body) {
            throw new Error('Lyrics not found');
        }

        const lyrics = data.message.body.subtitle.subtitle_body;
        await this.cache.set(cacheKey, lyrics, 600);
        return lyrics;
    }

    public async getSyncedLyrics(title: string, artist: string, duration?: number): Promise<string> {
        await this.ensureToken();
        const cacheKey = `synced_${artist}_${title}_${duration || ''}`;
        const cached = await this.cache.get(cacheKey);

        if (cached) {
            return cached;
        }

        let url = `${this.baseUrl}/macro.subtitles.get?format=json&namespace=lyrics_richsynched&subtitle_format=mxm&app_id=web-desktop-app-v1.0&usertoken=${this.userToken}&q_artist=${encodeURIComponent(artist)}&q_track=${encodeURIComponent(title)}`;

        if (duration) {
            url += `&q_duration=${duration}&f_subtitle_length=${duration}`;
        }

        const data = await this.fetchAPI(url);
        const subtitles = data.message?.body?.macro_calls?.['track.subtitles.get']?.message?.body?.subtitle_list;

        if (!subtitles?.[0]?.subtitle?.subtitle_body) {
            throw new Error('Synced lyrics not found');
        }

        const lrcText = this.convertToLRC(JSON.parse(subtitles[0].subtitle.subtitle_body));
        await this.cache.set(cacheKey, lrcText, 600);
        return lrcText;
    }

    private convertToLRC(lyricsData: any[]): string {
        return lyricsData.map(item => {
            const time = item.time;
            const text = item.text || '♪';
            return `[${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}.${time.hundredths.toString().padStart(2, '0')}]${text}`;
        }).join('\n');
    }
}

export const musixmatchAPI = new MusixmatchAPI();