<template>
  <div class="bg-white p-6 rounded-tr-[30px] rounded-bl-[30px] shadow-sm transition-all duration-300 hover:shadow-2xl group">
    <div class="flex items-start gap-4">
      <div class="text-[#ffa111]">
        <i :data-lucide="icon" class="w-8 h-8 mt-4 mr-3 lucide-icon"></i>
      </div>
      <div>
        <h3 class="text-2xl font-bold transition-colors duration-300 group-hover:text-[#ffa111]">
          {{ value }}
        </h3>
        <p class="text-sm text-gray-600">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatCard',
  props: {
    icon: String,
    value: String,
    description: String
  },
  mounted() {
    this.loadLucideIcons();
  },
  methods: {
    async loadLucideIcons() {
      if (!window.lucide) {
        await loadScript('https://unpkg.com/lucide@latest');
      }
      window.lucide.createIcons();
    }
  }
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
</script>

<style>
.lucide-icon {
  stroke-width: 1.5;
}
</style>