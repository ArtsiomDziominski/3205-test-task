<template>
  <section class="skeleton">
    <div class="line line-short"></div>
    <div class="line line-full"></div>
    <div class="card"></div>
  </section>
</template>

<style scoped>
.skeleton {
  display: grid;
  gap: 0.75rem;
  margin-top: 1rem;
}

.line,
.card {
  border-radius: 10px;
  background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);
  background-size: 200% 100%;
  animation: shimmer 1.2s linear infinite;
}

.line {
  height: 16px;
}

.line-short {
  width: 55%;
}

.line-full {
  width: 100%;
}

.card {
  height: 160px;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
