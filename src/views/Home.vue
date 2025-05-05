<template>
  <div class="home">
    <header>
      <nav>
        <router-link to="/">Главная</router-link>
        <input type="text" placeholder="Поиск песен..." />
      </nav>
    </header>
    <div class="eras">
      <div
          v-for="era in eras"
          :key="era.id"
          class="era-card"
          @click="selectEra(era)"
      >
        <img :src="era.image" :alt="era.name" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const eras = ref([
  { id: 1, name: "Холостяк", image: "src/assets/holostyak_main.jpg" },
  { id: 2, name: "Что они знают?", image: "src/assets/whatdoestheyknow_main.jpeg" },
  { id: 3, name: "58", image: "src/assets/58_main.jpg" },
  { id: 4, name: "PUSSY BOY", image: "src/assets/pussyboy_main.png" },
  { id: 5, name: "<3>", image: "src/assets/lessthan3_main.webp" },

]);

const selectEra = (era) => {
  router.push(`/album/${era.id}`);
};
</script>

<style scoped>
.eras {
  display: flex;
  width: 100vw;
  box-sizing: border-box;
  height: 100vh;
}

.era-card {
  cursor: pointer;
  flex-grow: 1;
  overflow: hidden;
  height: 100%;
}

.era-card > img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
</style>