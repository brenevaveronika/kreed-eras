
import { ref } from 'vue';
import { musixmatchAPI} from "@/api/musixmatch"

interface Song {
    id: number;
    title: string;
    artist: string;
    duration?: number;
    lyrics?: string;
}

interface Era {
    id: number;
    name: string;
    year: number;
    color: string;
    image: string;
    songs: Song[];
}

const eras = ref<Era[]>([
    {
        id: 1,
        name: "Холостяк",
        year: 2015,
        color: "#5a5a5a",
        image: "/img/holostyak_main.jpg",
        songs: [
            {
                id: 101,
                title: "Самая самая",
                artist: "Егор Крид",
                duration: 231
            },
            {
                id: 102,
                title: "Закрой глаза",
                artist: "Егор Крид",
                duration: 230
            },
            {
                id: 103,
                title: "Запомни и запиши",
                artist: "Егор Крид",
                duration: 200
            },
            {
                id: 104,
                title: "Надо ли",
                artist: "Егор Крид",
                duration: 200
            },
            {
                id: 105,
                title: "Ревность",
                artist: "Егор Крид",
                duration: 198
            },
            {
                id: 106,
                title: "Не мы",
                artist: "Егор Крид",
                duration: 179
            },
            {
                id: 107,
                title: "Только ты, только я",
                artist: "Егор Крид",
                duration: 218
            },
            {
                id: 108,
                title: "Ей наплевать",
                artist: "Егор Крид",
                duration: 161
            },
            {
                id: 109,
                title: "Невеста",
                artist: "Егор Крид",
                duration: 206
            },
            {
                id: 110,
                title: "Не вынести",
                artist: "Егор Крид",
                duration: 201
            },
            {
                id: 111,
                title: "Тишина",
                artist: "Егор Крид",
                duration: 167
            },
        ]
    }
    // ... другие эры
]);

async function loadLyricsForEra(eraId: number) {
    const era = eras.value.find(e => e.id === eraId);
    if (!era) return;

    for (const song of era.songs) {
        try {
            song.lyrics = await musixmatchAPI.getSyncedLyrics(
                song.title,
                song.artist,
                song.duration
            );
        } catch (error) {
            console.error(`Ошибка загрузки текста для ${song.title}:`, error);
        }
    }
}

export function useEras() {
    return {
        eras,
        loadLyricsForEra
    };
}