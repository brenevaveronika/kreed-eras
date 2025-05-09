import {ref} from 'vue';
import {musixmatchAPI} from "@/api/musixmatch"

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
            {
                id: 112,
                title: "Мы просто любили так",
                artist: "Егор Крид",
                duration: 188
            },
            {
                id: 113,
                title: "Берегу",
                artist: "Егор Крид",
                duration: 192
            },
            {
                id: 114,
                title: "Папина дочка",
                artist: "Егор Крид",
                duration: 161
            },
            {
                id: 115,
                title: "Холостяк",
                artist: "Егор Крид",
                duration: 167
            },
            {
                id: 116,
                title: "Я останусь",
                artist: "Егор Крид",
                duration: 201
            },
            {
                id: 117,
                title: "Вдаль",
                artist: "Егор Крид",
                duration: 184
            },
            {
                id: 118,
                title: "You're My Galaxy",
                artist: "Егор Крид",
                duration: 238
            },
            {
                id: 119,
                title: "Важно",
                artist: "Егор Крид",
                duration: 195
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
                title: "58",
                artist: "Egor Kreed",
                duration: 113
            },
            {
                id: 302,
                title: "Мне всё Монро",
                artist: "Egor Kreed, HammAli & Navai",
                duration: 140
            },
            {
                id: 303,
                title: "Хуракан",
                artist: "Egor Kreed",
                duration: 134
            },
            {
                id: 304,
                title: "Барби (feat. DAVA)",
                artist: "Egor Kreed, DAVA",
                duration: 150
            },
            {
                id: 305,
                title: "Девочка с картинки",
                artist: "Egor Kreed",
                duration: 148
            },
            {
                id: 306,
                title: "Mr. & Mrs. Smith (feat. Nyusha)",
                artist: "Egor Kreed, NYUSHA",
                duration: 190
            },
            {
                id: 307,
                title: "Веселая песня",
                artist: "Egor Kreed, MORGENSHTE...",
                duration: 187
            }
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
                title: "PUSSY BOY",
                artist: "Egor Kreed",
                duration: 214
            },
            {
                id: 402,
                title: "ЗДРАВСТВУЙТЕ (feat. OG Buda)",
                artist: "Egor Kreed, OG Buda",
                duration: 217
            },
            {
                id: 403,
                title: "HA MHE HOE",
                artist: "Egor Kreed",
                duration: 210
            },
            {
                id: 404,
                title: "PUFF (feat. MAYOT)",
                artist: "Egor Kreed, MAYOT",
                duration: 206
            },
            {
                id: 405,
                title: "ДЕД РОЕТ",
                artist: "Egor Kreed",
                duration: 211
            },
            {
                id: 406,
                title: "DOROGO (feat. blago white)",
                artist: "Egor Kreed, blago white",
                duration: 328
            },
            {
                id: 407,
                title: "CHOPPA",
                artist: "Egor Kreed",
                duration: 213
            },
            {
                id: 408,
                title: "ABTOMAT (feat. Гуф)",
                artist: "Egor Kreed, GUF",
                duration: 259
            },
            {
                id: 409,
                title: "ТЕЛЕФОН",
                artist: "Egor Kreed",
                duration: 205
            },
            {
                id: 410,
                title: "ГРУСТНО (feat. SODA LUV)",
                artist: "Egor Kreed, SODA LUV",
                duration: 233
            }
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