import { computed, ref } from "vue";
import axios from "axios";
import { api } from "../services/api";
import type { ShortenResponse } from "../types/url";

const MIN_URL_LENGTH = 4;

export const useShortener = () => {
  const url = ref("");
  const loading = ref(false);
  const error = ref<string | null>(null);
  const result = ref<ShortenResponse | null>(null);

  const hasResult = computed(() => result.value !== null);

  const validateUrl = (value: string): string | null => {
    const normalized = value.trim();
    if (!normalized) return "Please enter a URL.";
    if (normalized.length < MIN_URL_LENGTH) return "URL is too short.";
    return null;
  };

  const shorten = async (): Promise<void> => {
    error.value = validateUrl(url.value);
    if (error.value) return;

    loading.value = true;
    try {
      const response = await api.post<ShortenResponse>("/api/shorten", { url: url.value });
      result.value = response.data;
    } catch (requestError) {
      if (axios.isAxiosError<{ message?: string }>(requestError)) {
        error.value = requestError.response?.data?.message ?? "Unable to shorten URL right now.";
      } else {
        error.value = "Unexpected error occurred.";
      }
    } finally {
      loading.value = false;
    }
  };

  return {
    url,
    loading,
    error,
    result,
    hasResult,
    shorten
  };
};
