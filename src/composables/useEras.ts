
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
        image: "src/assets/img/holostyak_main.jpg",
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
    },
    {
        id: 2,
        name: "Что они знают?",
        year: 2017,
        color: "#8a0808",
        image: "src/assets/img/whatdoestheyknow_main.jpeg",
        songs: [
            {
                id: 201,
                title: "Интро",
                artist: "Егор Крид",
                duration: 160
            },
            {
                id: 202,
                title: "Что они знают",
                artist: "Егор Крид",
                duration: 176
            },
            {
                id: 203,
                title: "Не могу",
                artist: "Егор Крид",
                duration: 198
            },
            {
                id: 204,
                title: "Алло",
                artist: "Егор Крид",
                duration: 192
            },
            {
                id: 205,
                title: "Потрачу",
                artist: "Егор Крид",
                duration: 184
            },
            {
                id: 206,
                title: "Засыпай",
                artist: "Егор Крид, МОТ",
                duration: 222
            },
            {
                id: 207,
                title: "Стой",
                artist: "Егор Крид",
                duration: 213
            },
            {
                id: 208,
                title: "Не обманывай",
                artist: "Егор Крид",
                duration: 211
            },
            {
                id: 209,
                title: "Самба белого мотылька",
                artist: "Егор Крид",
                duration: 185
            },
            {
                id: 210,
                title: "Что скажет мама",
                artist: "Егор Крид",
                duration: 212
            },
            {
                id: 211,
                title: "Зажигалки",
                artist: "Егор Крид",
                duration: 219
            },
            {
                id: 212,
                title: "Если ты меня не любишь",
                artist: "Егор Крид, MOLLY",
                duration: 206
            },
        ]
    },
    {
        id: 3,
        name: "58",
        year: 2020,
        color: "#d9d952",
        image: "src/assets/img/58_main.jpg",
        songs: [
            {
                id: 301,
                title: "Интро",
                artist: "Егор Крид",
                duration: 231
            },
            {
                id: 302,
                title: "Что они знают",
                artist: "Егор Крид",
                duration: 230
            },
            {
                id: 203,
                title: "Не могу",
                artist: "Егор Крид",
                duration: 200
            },
            {
                id: 204,
                title: "Алло",
                artist: "Егор Крид",
                duration: 200
            },
            {
                id: 205,
                title: "Потрачу",
                artist: "Егор Крид",
                duration: 198
            },
            {
                id: 206,
                title: "Засыпай",
                artist: "Егор Крид, МОТ",
                duration: 179
            },
            {
                id: 207,
                title: "Стой",
                artist: "Егор Крид",
                duration: 218
            },
            {
                id: 208,
                title: "Не обманывай",
                artist: "Егор Крид",
                duration: 161
            },
            {
                id: 209,
                title: "Самба белого мотылька",
                artist: "Егор Крид",
                duration: 206
            },
            {
                id: 210,
                title: "Что скажет мама",
                artist: "Егор Крид",
                duration: 201
            },
            {
                id: 211,
                title: "Зажигалки",
                artist: "Егор Крид",
                duration: 167
            },
            {
                id: 212,
                title: "Если ты меня не любишь",
                artist: "Егор Крид, MOLLY",
                duration: 167
            },
        ]
    },
    {
        id: 4,
        name: "PUSSY BOY",
        year: 2021,
        color: "#A3AD96",
        image: "src/assets/img/pussyboy_main.png",
        songs: [
            {
                id: 401,
                title: "Интро",
                artist: "Егор Крид",
                duration: 231
            },
            {
                id: 402,
                title: "Что они знают",
                artist: "Егор Крид",
                duration: 230
            },
            {
                id: 203,
                title: "Не могу",
                artist: "Егор Крид",
                duration: 200
            },
            {
                id: 204,
                title: "Алло",
                artist: "Егор Крид",
                duration: 200
            },
            {
                id: 205,
                title: "Потрачу",
                artist: "Егор Крид",
                duration: 198
            },
            {
                id: 206,
                title: "Засыпай",
                artist: "Егор Крид, МОТ",
                duration: 179
            },
            {
                id: 207,
                title: "Стой",
                artist: "Егор Крид",
                duration: 218
            },
            {
                id: 208,
                title: "Не обманывай",
                artist: "Егор Крид",
                duration: 161
            },
            {
                id: 209,
                title: "Самба белого мотылька",
                artist: "Егор Крид",
                duration: 206
            },
            {
                id: 210,
                title: "Что скажет мама",
                artist: "Егор Крид",
                duration: 201
            },
            {
                id: 211,
                title: "Зажигалки",
                artist: "Егор Крид",
                duration: 167
            },
            {
                id: 212,
                title: "Если ты меня не любишь",
                artist: "Егор Крид, MOLLY",
                duration: 167
            },
        ]
    },
    {
        id: 5,
        name: "<3>",
        year: 2024,
        color: "#E0C1C6",
        image: "src/assets/img/lessthan3_main.webp",
        songs: [
            {
                id: 501,
                title: "Интро",
                artist: "Егор Крид",
                duration: 231
            },
            {
                id: 502,
                title: "Что они знают",
                artist: "Егор Крид",
                duration: 230
            },
            {
                id: 503,
                title: "Не могу",
                artist: "Егор Крид",
                duration: 200
            },
            {
                id: 504,
                title: "Алло",
                artist: "Егор Крид",
                duration: 200
            },
            {
                id: 505,
                title: "Потрачу",
                artist: "Егор Крид",
                duration: 198
            },
            {
                id: 506,
                title: "Засыпай",
                artist: "Егор Крид, МОТ",
                duration: 179
            },
            {
                id: 207,
                title: "Стой",
                artist: "Егор Крид",
                duration: 218
            },
            {
                id: 208,
                title: "Не обманывай",
                artist: "Егор Крид",
                duration: 161
            },
            {
                id: 209,
                title: "Самба белого мотылька",
                artist: "Егор Крид",
                duration: 206
            },
            {
                id: 210,
                title: "Что скажет мама",
                artist: "Егор Крид",
                duration: 201
            },
            {
                id: 211,
                title: "Зажигалки",
                artist: "Егор Крид",
                duration: 167
            },
            {
                id: 212,
                title: "Если ты меня не любишь",
                artist: "Егор Крид, MOLLY",
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