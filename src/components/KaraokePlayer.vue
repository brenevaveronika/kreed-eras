<template>
  <div class="karaoke-player">
    <audio
        ref="audioPlayer"
        @timeupdate="updateCurrentLine"
        @play="isPlaying = true"
        @pause="isPlaying = false"
    ></audio>

    <div class="controls">
      <button @click="playPause">
        {{ isPlaying ? 'Пауза' : 'Играть' }}
      </button>
      <input
          type="range"
          v-model="currentTime"
          min="0"
          :max="duration"
          @input="seekAudio"
      >
    </div>

    <div class="lyrics-display">
      <div
          class="lyrics-line prev-line"
          :style="{ opacity: 0.6 }"
      >
        {{ prevLine?.text || ' ' }}
      </div>

      <div class="lyrics-line current-line">
        {{ currentLine?.text || ' ' }}
      </div>

      <div
          class="lyrics-line next-line"
          :style="{ opacity: 0.6 }"
      >
        {{ nextLine?.text || ' ' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

interface LyricLine {
  time: number;
  text: string;
}

const props = defineProps<{
  lrcText: string;
  audioSrc: string;
}>();

const audioPlayer = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const lyrics = ref<LyricLine[]>([]);
const currentLineIndex = ref(-1);

// Исправленный парсер LRC
const parseLRC = (text: string): LyricLine[] => {
  const lines = text.trim().split('\n');
  const result: LyricLine[] = [];
  const timeRegex = /\[(\d+):(\d+)\.(\d+)\]/;

  lines.forEach(line => {
    let match;
    const textPart = line.replace(timeRegex, '').trim();

    // Создаем новый RegExp для каждой строки
    const regex = new RegExp(timeRegex.source, 'g');
    while ((match = regex.exec(line)) !== null) {
      const minutes = parseInt(match[1]);
      const seconds = parseInt(match[2]);
      const hundredths = parseInt(match[3]);
      const time = minutes * 60 + seconds + hundredths / 100;

      result.push({
        time,
        text: textPart || '♪'
      });
    }
  });

  return result.sort((a, b) => a.time - b.time);
};

// Остальной код без изменений...
const currentLine = computed(() => {
  return currentLineIndex.value >= 0
      ? lyrics.value[currentLineIndex.value]
      : null;
});

const prevLine = computed(() => {
  return currentLineIndex.value > 0
      ? lyrics.value[currentLineIndex.value - 1]
      : null;
});

const nextLine = computed(() => {
  return currentLineIndex.value < lyrics.value.length - 1
      ? lyrics.value[currentLineIndex.value + 1]
      : null;
});

const updateCurrentLine = () => {
  if (!audioPlayer.value) return;

  currentTime.value = audioPlayer.value.currentTime;

  for (let i = 0; i < lyrics.value.length; i++) {
    if (lyrics.value[i].time > currentTime.value) {
      currentLineIndex.value = i - 1;
      return;
    }
  }

  currentLineIndex.value = lyrics.value.length - 1;
};

const playPause = () => {
  if (!audioPlayer.value) return;

  if (isPlaying.value) {
    audioPlayer.value.pause();
  } else {
    audioPlayer.value.play();
  }
};

const seekAudio = (e: Event) => {
  if (!audioPlayer.value) return;

  const target = e.target as HTMLInputElement;
  audioPlayer.value.currentTime = parseFloat(target.value);
};

onMounted(() => {
  lyrics.value = parseLRC(props.lrcText);

  if (audioPlayer.value) {
    audioPlayer.value.src = props.audioSrc;

    audioPlayer.value.addEventListener('loadedmetadata', () => {
      duration.value = audioPlayer.value?.duration || 0;
    });
  }
});
</script>

<style scoped>
.karaoke-player {
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  text-align: center;
}

.controls {
  margin-bottom: 20px;
}

.controls button {
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
}

.lyrics-display {
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.lyrics-line {
  font-size: 24px;
  transition: all 0.3s ease;
}

.current-line {
  font-size: 32px;
  font-weight: bold;
  color: #ffffff;
}

.prev-line, .next-line {
  color: #666;
}

input[type="range"] {
  width: 100%;
  margin-top: 10px;
}
</style>