<template>
  <div
    class="relative flex items-center justify-center bg-no-repeat px-[25px]"
    :style="{
      backgroundImage: `url(${resolvedBg})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      height: height
    }"
  >
    <div class="absolute inset-0 bg-black/40"></div>

    <div 
      v-if="$slots.default" 
      class="relative z-10 w-full text-center"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <slot></slot>
    </div>

    <div 
      v-else 
      class="relative z-10 text-center"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <h1 class="text-5xl font-bold text-white drop-shadow-lg">
        {{ title }}
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroBanner',
  props: {
    title: { type: String, default: '' },
    backgroundImage: { type: String, required: true },
    height: { type: String, default: '500px' } 
  },
  computed: {
    resolvedBg() {
      if (this.backgroundImage.startsWith('@/')) {
        return new URL(this.backgroundImage.replace(/^@\//, '/src/'), import.meta.url).href
      }
      return this.backgroundImage
    }
  }
}
</script>
