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
      {{ activeEra?.name || 'Выберите эру' }} ({{activeEra.year}})
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import IconEgorKreedLogo from "@/components/icons/IconEgorKreedLogo.vue";
import Header from "@/components/Header.vue";

const router = useRouter();

const eras = ref([
  { id: 1, name: "Холостяк", year: 2015, color: "#5a5a5a", image: "src/assets/holostyak_main.jpg" },
  { id: 2, name: "Что они знают?", year: 2017, color: "#8a0808", image: "src/assets/whatdoestheyknow_main.jpeg" },
  { id: 3, name: "58", year: 2020, color: "#d9d952", image: "src/assets/58_main.jpg" },
  { id: 4, name: "PUSSY BOY", year: 2021, color: "#A3AD96", image: "src/assets/pussyboy_main.png" },
  { id: 5, name: "<3>", year: 2024, color: "#E0C1C6", image: "src/assets/lessthan3_main.webp" },

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
}

.eras-container {
  display: flex;
  width: 100vw;
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
</style>