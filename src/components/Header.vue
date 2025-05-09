<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import IconSearch from "@/components/icons/IconSearch.vue";
import IconEgorKreedLogo from "@/components/icons/IconEgorKreedLogo.vue";
import { useEras } from '@/composables/useEras';

const searchQuery = ref('');
const router = useRouter();
const { eras } = useEras();
const notFoundMessage = ref('');

const searchSong = () => {
  const allSongs = eras.value.flatMap(era => era.songs);
  const foundSong = allSongs.find(song =>
      song.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  if (foundSong) {
    notFoundMessage.value = '';
    router.push({ name: 'song', params: { id: foundSong.id } });
  } else {
    notFoundMessage.value = 'Песня не найдена';
  }
};
</script>

<template>
  <header>
    <nav>
      <router-link to="/" class="nav-link">ГЛАВНАЯ</router-link>
      <router-link to="/" class="nav-link">КОНЦЕРТЫ</router-link>
      <div class="logo-container">
        <IconEgorKreedLogo class="logo" />
      </div>
      <div class="search-input">
        <IconSearch />
        <input
            v-model="searchQuery"
            @keyup.enter="searchSong"
            placeholder="Поиск песен..."
            type="text"
        />
      </div>
    </nav>
    <p v-if="notFoundMessage" class="not-found-message">{{ notFoundMessage }}</p>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 10vh;
  align-items: center;
  box-sizing: border-box;
}
.not-found-message {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}

nav {
  display: grid;
  grid-template-columns: 0.5fr 0.5fr auto 1fr;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
}

.logo-container {
  display: flex;
  justify-content: center;
}

.logo {
  height: 30px;
  width: auto;
}

.nav-link {
  justify-self: start;
}

.search-input {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 15px;
  justify-self: end;
  width: fit-content;
}

input {
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
  margin-left: 10px;
  width: 100%;
}

router-link {
  color: white;
  text-decoration: none;
  white-space: nowrap;
}

/* TODO: исправить расположение ссылок (они по центру должны быть на маленьких экранах) */
@media (max-width: 768px) {
  nav {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
    gap: 10px;
  }

  .logo-container {
    order: -1;
  }
  .nav-link,
  .search-input {
    justify-self: center;
    width: 100%;
  }

  .search-input {
    max-width: 100%;
  }
}
</style>