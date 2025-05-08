<script setup>
import { ref, onMounted } from 'vue';
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

onMounted(async () => {
  try {
    // Находим песню в данных эр
    for (const era of eras.value) {
      const song = era.songs.find(s => s.id === songId.value);
      if (song) {
        // Получаем текст песни
        let lyrics = song.lyrics || '';

        try {
          if (!lyrics) {
            lyrics = await musixmatchAPI.getSyncedLyrics(
                song.title,
                song.artist,
                song.duration || 0
            );
          }
        } catch (error) {
          console.error('Ошибка загрузки текста:', error);
          lyrics = 'Не удалось загрузить текст песни';
        }

        lrcText.value = lyrics;
        audioSrc.value = song.audioSrc || getDefaultAudioSrc(era.name, song.id);
        break;
      }
    }

    if (!lrcText.value) {
      throw new Error('Песня не найдена');
    }
  } catch (err) {
    console.error('Ошибка загрузки песни:', err);
    error.value = 'Не удалось загрузить данные песни';
  } finally {
    loading.value = false;
  }
});

function getDefaultAudioSrc(eraName, songId) {
  return new URL(`/src/assets/audio/${songId}.mp3`, import.meta.url).href;
}
</script>

<template>
  <Header />

  <div v-if="loading" class="loading">Загрузка песни...</div>
  <div v-else-if="error" class="error">{{ error }}</div>
  <KaraokePlayer
      v-else
      :lrc-text="lrcText"
      :audio-src="audioSrc"
  />
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
</style>