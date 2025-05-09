<template>
  <div class="home">
    <Header></Header>
    <div class="eras-container">
      <div
          v-for="era in eras"
          :key="era.id"
          class="era-card"
          :class="{ 'active-era': activeEra?.id === era.id }"
          @click="selectEra(era)"
      >
        <img :src="era.image" :alt="era.name" />
      </div>
    </div>
    <div class="eras-heading">
      {{ activeEra?.name || 'Выберите эру' }}
    </div>
    <div class="description-container" v-if="activeEra">
      <div class="eras-description">
        <p class="eras-d-year">Дата выхода: </p>
        <p class="eras-d-year">{{ activeEra.year }}</p>
        &nbsp;
        <p class="eras-d-tracks-count">Количество треков:</p>
        &nbsp;
        <p class="eras-d-tracks-count">{{ activeEra.songs.length }}</p>
        <h2 class="eras-d-heading">Трек-лист:</h2>
        <ul class="eras-track-list">
          <li
              v-for="song in activeEra.songs"
              :key="song.id"
              class="eras-track"
              @click="goToSong(song.id)"
          >
            <a class="eras-track-title">{{ song.title }}</a>
            <div class="eras-track-duration">
              {{ formatDuration(song.duration) }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useEras } from '@/composables/useEras';
import Header from '@/components/Header.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { eras } = useEras();
const activeEra = ref(null);

onMounted(() => {
  if (eras.value.length > 0) {
    activeEra.value = eras.value[0];
  }
});

const goToSong = (songId) => {
  router.push({ name: 'song', params: { id: songId } });
};

const selectEra = (era) => {
  activeEra.value = era;
};

const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

watch(activeEra, (newEra) => {
  if (newEra) {
    document.documentElement.style.setProperty('--era-bg', newEra.color);
  }
}, { immediate: true });
</script>

<style scoped>
.home {
  background: rgba(0, 0, 0, 0.2);
  min-height: 100vh;
  box-sizing: border-box;
}

.eras-container {
  display: flex;
  width: 100%;
  height: 80vh;
}

.era-card {
  flex: 1;
  min-width: 0;
  transition: all 0.3s ease;
  overflow: hidden;
  height: 100%;
}

.era-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.eras-heading {
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 16pt;
}

.active-era {
  flex: 4;
  position: relative;
}

.description-container {
  display: flex;
  min-height: 90vh;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
}

.eras-description {
  width: 90%;
  min-width: 340px;
  height: fit-content;
  margin: auto;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 5px 10px;
  align-items: baseline;
  box-sizing: border-box;
}

.eras-d-year,
.eras-d-tracks-count {
  grid-column: span 2;
  display: contents;
}

.eras-d-heading {
  font-weight: bold;
  font-size: 16pt;
  grid-column: span 2;
  margin: 15px 0 10px 0;
}

.eras-track-list {
  grid-column: span 2;
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 8px 0;
}

.eras-track {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}
</style>