<script setup lang="ts">
const model = defineModel<string>({ required: true });

const props = defineProps<{
  loading: boolean;
  error: string | null;
}>();

const emit = defineEmits<{
  submit: [];
}>();

const onSubmit = () => {
  emit("submit");
};
</script>

<template>
  <form class="url-form" @submit.prevent="onSubmit">
    <label class="label" for="url">Long URL</label>
    <div class="row">
      <input
        id="url"
        v-model="model"
        class="input"
        name="url"
        type="text"
        placeholder="example.com/article"
        autocomplete="off"
      />
      <button class="button" type="submit" :disabled="props.loading">
        {{ props.loading ? "Shortening..." : "Shorten" }}
      </button>
    </div>
    <p v-if="props.error" class="error">{{ props.error }}</p>
  </form>
</template>

<style scoped>
.url-form {
  display: grid;
  gap: 0.75rem;
}

.label {
  font-weight: 600;
  color: #1f2937;
}

.row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.75rem;
}

.input {
  width: 100%;
  min-height: 42px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  padding: 0 0.9rem;
  font-size: 0.95rem;
}

.input:focus {
  outline: 2px solid #93c5fd;
  border-color: #60a5fa;
}

.button {
  min-height: 42px;
  border: none;
  border-radius: 10px;
  padding: 0 1rem;
  background: #2563eb;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

.button:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

.error {
  color: #b91c1c;
  margin: 0;
}

@media (max-width: 640px) {
  .row {
    grid-template-columns: 1fr;
  }
}
</style>
