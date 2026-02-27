<script setup lang="ts">
import { computed, ref } from "vue";
import type { ShortenResponse } from "../types/url";

const props = defineProps<{
  data: ShortenResponse;
}>();

const copied = ref(false);
const fallbackImage = "https://placehold.co/1200x630?text=No+Preview";

const imageSrc = computed(() => props.data.preview.image || fallbackImage);
const title = computed(() => props.data.preview.title || "Untitled page");
const description = computed(() => props.data.preview.description || "No description available.");

const copy = async (): Promise<void> => {
  await navigator.clipboard.writeText(props.data.shortUrl);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 1500);
};
</script>

<template>
  <section class="wrapper">
    <div class="short-link-row">
      <a class="short-link" :href="data.shortUrl" target="_blank" rel="noreferrer">{{ data.shortUrl }}</a>
      <button class="copy-btn" type="button" @click="copy">{{ copied ? "Copied" : "Copy" }}</button>
    </div>

    <article class="card">
      <img class="image" :src="imageSrc" alt="Preview image" />
      <div class="body">
        <h2 class="title">{{ title }}</h2>
        <p class="description">{{ description }}</p>
        <p class="visits">Visits: {{ data.visits }}</p>
      </div>
    </article>
  </section>
</template>

<style scoped>
.wrapper {
  margin-top: 1rem;
  display: grid;
  gap: 1rem;
}

.short-link-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.short-link {
  font-weight: 600;
  color: #1d4ed8;
  text-decoration: none;
  word-break: break-all;
}

.copy-btn {
  border: 1px solid #d1d5db;
  background: #fff;
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  font-weight: 600;
}

.card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}

.image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  background: #f3f4f6;
}

.body {
  padding: 1rem;
}

.title {
  margin: 0;
  color: #111827;
  font-size: 1.1rem;
}

.description {
  margin: 0.6rem 0 0;
  color: #4b5563;
}

.visits {
  margin: 0.8rem 0 0;
  color: #6b7280;
  font-size: 0.92rem;
}
</style>
