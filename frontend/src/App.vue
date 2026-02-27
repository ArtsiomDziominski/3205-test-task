<script setup lang="ts">
import PreviewCard from "./components/PreviewCard.vue";
import SkeletonLoader from "./components/SkeletonLoader.vue";
import UrlForm from "./components/UrlForm.vue";
import { useShortener } from "./composables/useShortener";

const { url, loading, error, result, hasResult, shorten } = useShortener();
</script>

<template>
  <main class="layout">
    <section class="panel">
      <h1>URL Shortener &amp; Preview</h1>
      <p class="subtitle">Create short links and fetch preview metadata in one request.</p>

      <UrlForm v-model="url" :loading="loading" :error="error" @submit="shorten" />
      <SkeletonLoader v-if="loading" />
      <PreviewCard v-else-if="hasResult && result" :data="result" />
    </section>
  </main>
</template>
