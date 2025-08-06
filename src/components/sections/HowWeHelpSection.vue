<template>
  <section
    class="relative mx-4 my-8 lg:mx-12 lg:my-16"
    data-aos="fade-up"
    data-aos-duration="1000"
  >
    <div class="flex flex-col rounded-tr-3xl rounded-bl-3xl bg-[#f3f4f6] overflow-hidden lg:flex-row h-full">
      <div
        class="z-10 w-full px-6 py-12 space-y-6 lg:w-1/2 lg:px-12 lg:py-24"
        data-aos="fade-right"
        data-aos-duration="1200"
        data-aos-delay="200"
      >
        <p class="font-semibold tracking-wide uppercase text-secondary">How we help.</p>
        <h2 class="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">Give a future full<br />of choices</h2>

        <div class="mt-8 border-b border-gray-200">
          <nav
            class="grid grid-cols-2 gap-4 text-sm font-semibold text-center text-gray-400 uppercase sm:grid-cols-4"
            data-aos="fade-left"
            data-aos-duration="1200"
            data-aos-delay="300"
          >
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'tab-btn flex flex-col items-center pb-2 group transition-colors',
                activeTab === tab.id ? 'text-secondary border-b-2 border-secondary' : ''
              ]"
            >
              <i :class="tab.icon" class="w-6 h-6 transition-colors group-hover:text-secondary"></i>
              <span class="mt-2 transition-colors group-hover:text-secondary">{{ tab.name }}</span>
            </button>
          </nav>
        </div>

        <div class="px-4 space-y-6 md:px-6 lg:px-5" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="400">
          <div 
            v-for="tab in tabs" 
            :key="tab.id"
            :class="['tab-content', { 'hidden': activeTab !== tab.id }]"
          >
            <h3 class="mb-3 text-xl font-semibold text-gray-900">{{ tab.title }}</h3>
            <p class="mb-4 leading-relaxed text-gray-600">{{ tab.description }}</p>
            <p v-if="tab.additionalDescription" class="mb-4 leading-relaxed text-gray-600">{{ tab.additionalDescription }}</p>
          </div>

          <router-link 
            to="/how-we-help"
            class="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition duration-700 ease-in-out transform bg-black rounded-tl-none rounded-tr-full rounded-bl-full rounded-br-full hover:bg-secondary md:px-8 md:py-4"
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="500"
          >
            <svg class="w-5 h-5 transition-transform duration-300 ease-in-out group-hover:-translate-x-1"
              fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
            LEARN MORE
          </router-link>
        </div>
      </div>

      <div
        class="relative w-full lg:w-1/2 lg:h-auto min-h-[350px]"
        data-aos="fade-left"
        data-aos-duration="1200"
        data-aos-delay="600"
      >
        <div class="absolute inset-0 h-full overflow-hidden">
          <img src="@/assets/images/h1-banner06.jpg" alt="Smiling child" class="object-cover w-full h-full" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HowWeHelpSection',
  data() {
    return {
      activeTab: 'health',
      tabs: [
        {
          id: 'health',
          name: 'Health',
          icon: 'fas fa-heartbeat',
          title: 'We always see hope',
          description: 'Provide exceptional healthcare, foods & funds to support victims in disasters, pandemics, wars, etc.',
          additionalDescription: 'They refer patients to a program like any other specialty and improve health outcomes.'
        },
        {
          id: 'education',
          name: 'Education',
          icon: 'fas fa-graduation-cap',
          title: 'Empowering through education',
          description: 'We provide access to quality education for children and adults in underprivileged areas.'
        },
        {
          id: 'protection',
          name: 'Protection',
          icon: 'fas fa-shield-alt',
          title: 'Safe and secure',
          description: 'Our programs ensure children and families are protected from abuse, violence, and exploitation.'
        },
        {
          id: 'emergency',
          name: 'Emergency',
          icon: 'fas fa-exclamation-triangle',
          title: 'Rapid response',
          description: 'We act quickly in emergencies, delivering essential supplies and support when it\'s needed most.'
        }
      ]
    }
  }
}
</script>

<style scoped>
@media (max-width: 1023px) {
  .lg\:w-1\/2 {
    width: 100%;
  }
  
  .lg\:flex-row {
    flex-direction: column;
  }
  
  .lg\:order-last {
    order: 0;
  }
  
  .lg\:h-auto {
    height: 350px;
  }
}

.relative, .flex {
  height: inherit;
}
</style>