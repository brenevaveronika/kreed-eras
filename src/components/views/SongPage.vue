<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useEras } from '@/composables/useEras';
import { musixmatchAPI } from '@/api/musixmatch';
import Header from "@/components/Header.vue";
import KaraokePlayer from "@/components/KaraokePlayer.vue";

const route = useRoute();
const { eras } = useEras();
const songId = ref(Number(route.params.id));
const lrcText = ref('');
const audioSrc = ref('');
const loading = ref(true);
const error = ref('');
const currentSong = ref(null);
const currentEra = ref(null);

const eraImage = computed(() => {
  return ('../' + currentEra.value?.image) || '';
});

const songTitle = computed(() => {
  return currentSong.value?.title || '';
});

onMounted(async () => {
  try {
    if (!eras.value) {
      throw new Error('Данные эр не загружены');
    }
    let foundSong = null;
    let foundEra = null;

    for (const era of eras.value) {
      const song = era.songs?.find(s => s.id === songId.value);
      if (song) {
        foundSong = song;
        foundEra = era;
        break;
      }
    }

    if (!foundSong || !foundEra) {
      throw new Error('Песня не найдена');
    }

    currentSong.value = foundSong;
    currentEra.value = foundEra;
    let lyrics = foundSong.lyrics || '';

    try {
      if (!lyrics) {
        lyrics = await musixmatchAPI.getSyncedLyrics(
            foundSong.title,
            foundSong.artist,
            foundSong.duration || 0
        );
      }
    } catch (apiError) {
      console.error('Ошибка загрузки текста:', apiError);
      lyrics = 'Не удалось загрузить текст песни';
    }

    lrcText.value = lyrics;
    audioSrc.value = foundSong.audioSrc || getDefaultAudioSrc(foundSong.id);

  } catch (err) {
    console.error('Ошибка загрузки песни:', err);
    error.value = err.message || 'Не удалось загрузить данные песни';
  } finally {
    loading.value = false;
  }
});

function getDefaultAudioSrc( songId) {
  return new URL(`/src/assets/audio/${songId}.mp3`, import.meta.url).href;
}
</script>

<template>
  <Header />

  <div v-if="loading" class="loading">Загрузка песни...</div>
  <div v-else-if="error" class="error">{{ error }}</div>
  <div v-else class="song-page">
    <div class="song-header">
      <img :src="eraImage" :alt="currentEra.name" class="era-image" />
      <h1 class="song-title">{{ songTitle }}</h1>
      <h2 class="era-name">{{ currentEra.name }} ({{ currentEra.year }})</h2>
    </div>
    <KaraokePlayer
        :lrc-text="lrcText"
        :audio-src="audioSrc"
    />
  </div>
</template>

<style scoped>
.loading, .error {
  padding: 20px;
  text-align: center;
  font-size: 18px;
}

.error {
  color: #ff4d4f;
}

.song-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.song-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 30px;
}

.era-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 15px;
}

.song-title {
  font-size: 28px;
  margin: 0;
  color: white;
}

.era-name {
  font-size: 18px;
  margin: 5px 0 0;
  color: white;
  font-weight: normal;
}
</style>