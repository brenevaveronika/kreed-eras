<template>
  <div class="song-lyrics">
    <h3>{{ currentSong.title }}</h3>
    <div class="lyrics-container">
      <pre v-if="currentSong.lyrics">{{ currentSong.lyrics }}</pre>
      <div v-else class="loading">Загрузка текста...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useEras } from '@/composables/useEras';
import { musixmatchAPI } from '@/api/musixmatch';

interface SongBasic {
  title: string;
  lyrics: string;
  artist: string;
  duration: number;
}

const { eras } = useEras();
const props = defineProps<{
  songId: number;
}>();

const currentSong = ref<SongBasic>({
  title: '',
  lyrics: '',
  artist: '',
  duration: 0
});

onMounted(async () => {
  // Находим песню в данных эр
  for (const era of eras.value) {
    const song = era.songs.find(s => s.id === Number(props.songId));
    if (song) {
      // Явно копируем только необходимые поля
      currentSong.value = {
        title: song.title,
        artist: song.artist,
        duration: song.duration || 0, // обеспечиваем значение по умолчанию
        lyrics: song.lyrics || ''     // обеспечиваем значение по умолчанию
      };

      try {
        // Загружаем текст песни только если его нет
        if (!currentSong.value.lyrics) {
          currentSong.value.lyrics = await musixmatchAPI.getSyncedLyrics(
              song.title,
              song.artist,
              song.duration || 0
          );
        }
      } catch (error) {
        console.error('Ошибка загрузки текста:', error);
        currentSong.value.lyrics = 'Не удалось загрузить текст песни';
      }
      break;
    }
  }
});
</script>

<style scoped>
.song-lyrics {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  color: black;
}

.lyrics-container {
  margin-top: 15px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
  min-height: 200px;
}

.loading {
  color: #666;
  font-style: italic;
}
</style>