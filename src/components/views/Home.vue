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
    <div class="description-container">
      <div class="eras-description">
        <p class="eras-d-year"> Дата выхода:  </p>
        <p class="eras-d-year"> {{ activeEra.year}} </p>
        <p class="eras-d-tracks-count"> Количество треков: </p>
        <p class="eras-d-tracks-count"> 19 </p>
        <h2 class="eras-d-heading"> Трек-лист: </h2>
        <ul class="eras-track-list">
          <li class="eras-track">
            <a class="eras-track-title"> "Самая самая"</a>
            <div class="eras-track-duration"> 3:51 </div>
          </li>
          <li class="eras-track">
            <a class="eras-track-title"> "Закрой глаза"</a>
            <div class="eras-track-duration"> 3:50 </div>
          </li>
          <li class="eras-track">
            <a class="eras-track-title"> "Запомни и запиши"</a>
            <div class="eras-track-duration"> 3:20 </div>
          </li>
          <li class="eras-track">
            <a class="eras-track-title"> "Надо ли"</a>
            <div class="eras-track-duration"> 3:50 </div>
          </li>
          <li class="eras-track">
            <a class="eras-track-title"> "Ревность"</a>
            <div class="eras-track-duration"> 3:50 </div>
          </li>
          <li class="eras-track">
            <a class="eras-track-title"> "Ревность"</a>
            <div class="eras-track-duration"> 3:50 </div>
          </li>
          <li class="eras-track">
            <a class="eras-track-title"> "Ревность"</a>
            <div class="eras-track-duration"> 3:50 </div>
          </li>
          <li class="eras-track">
            <a class="eras-track-title"> "Ревность"</a>
            <div class="eras-track-duration"> 3:50 </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import Header from "@/components/Header.vue";

const eras = ref([
  { id: 1, name: "Холостяк", year: 2015, color: "#5a5a5a", image: "src/assets/img/holostyak_main.jpg" },
  { id: 2, name: "Что они знают?", year: 2017, color: "#8a0808", image: "src/assets/img/whatdoestheyknow_main.jpeg" },
  { id: 3, name: "58", year: 2020, color: "#d9d952", image: "src/assets/img/58_main.jpg" },
  { id: 4, name: "PUSSY BOY", year: 2021, color: "#A3AD96", image: "src/assets/img/pussyboy_main.png" },
  { id: 5, name: "<3>", year: 2024, color: "#E0C1C6", image: "src/assets/img/lessthan3_main.webp" },
]);

const activeEra = ref(eras.value[0]);

const selectEra = (era) => {
  activeEra.value = era;
};

watch(activeEra, (newEra) => {
  if (newEra) {
    document.documentElement.style.setProperty('--era-bg', newEra.color);
  }
}, { immediate: true });
</script>

<style scoped>
.home {
  background: rgba(0, 0, 0, 0.2); /* Полупрозрачный слой поверх фона */
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
  display: contents; /* Дочерние элементы становятся частью grid */
}

.eras-d-heading {
  font-weight: bold;
  font-size: 16pt;
  grid-column: span 2;
  margin: 15px 0 10px 0;
}
.eras-d-heading {
  grid-column: 1/-1;
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