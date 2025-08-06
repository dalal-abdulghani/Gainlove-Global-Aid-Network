<template>
  <section class="py-16 overflow-hidden text-center bg-gray-50">
    <h2 class="mb-4 text-3xl font-bold md:text-4xl">Committed to Transparency</h2>
    <p class="max-w-3xl mx-auto mb-12 text-gray-600">
      84% of our total operating expenses fund programs for children in the countries we serve.
      So when you make a monthly gift or donation to our organization, the majority of your
      dollars go toward exactly what you intended – supporting children in poverty.
    </p>

    <div v-if="logos.length > 0" class="relative w-full mt-5 mb-20">
      <div class="absolute inset-0 z-10 bg-gradient-to-r from-gray-50 via-transparent to-gray-50"></div>
      <div class="flex items-center gap-16 marquee whitespace-nowrap animate-marquee">
        <img v-for="(logo, index) in logos" :key="index" :src="logo" class="inline-block h-15" />
      </div>
    </div>
    
    <div v-else class="py-12 text-gray-500">
      No partners available. Check back later for updates.
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const logos = ref([]);

const defaultLogos = [
  'src/assets/images/brand-04.svg',
  'src/assets/images/brand-01.svg',
  'src/assets/images/brand-03.svg',
  'src/assets/images/brand-02.svg',
  'src/assets/images/brand-02.svg',
  'src/assets/images/brand-02.svg',
  'src/assets/images/brand-02.svg',
  'src/assets/images/brand-02.svg',
  'src/assets/images/brand-02.svg',
  'src/assets/images/brand-02.svg',
  'src/assets/images/brand-02.svg',
  'src/assets/images/brand-02.svg',
  'src/assets/images/brand-02.svg',
  'src/assets/images/brand-05.svg'
];

const loadPartners = () => {
  const savedData = JSON.parse(localStorage.getItem('dashboardContent'));
  
  if (savedData && savedData.partners && savedData.partners.length > 0) {
    logos.value = savedData.partners.map(partner => partner.logo);
  } else {
    logos.value = defaultLogos;
  }
};

onMounted(() => {
  loadPartners();
  
  window.addEventListener('storage', () => {
    loadPartners();
  });
});
</script>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.animate-marquee {
  animation: marquee 40s linear infinite;
}
</style>