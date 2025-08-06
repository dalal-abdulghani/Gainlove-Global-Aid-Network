<template>
  <div
    class="transition-shadow duration-700 hover:shadow-2xl rounded-tr-[30px] rounded-bl-[30px] bg-[#f3f4f6]"
    data-aos="fade-up"
    data-aos-duration="1000"
    data-aos-easing="ease-in-out"
  >
    <div class="rounded-tr-[30px] rounded-bl-[30px] overflow-hidden">
      <img
        :src="resolvedImage"
        :alt="title"
        class="w-full h-64 object-cover rounded-tr-[30px] rounded-bl-[30px] transform transition-transform duration-700 ease-in-out hover:scale-110"
        loading="lazy"
      />
    </div>
    <div class="p-6">
      <h3
        class="mb-4 text-xl font-semibold transition duration-500 ease-in-out group-hover:text-orange-500"
      >
        {{ title }}
      </h3>
      <p class="max-w-xs mx-auto text-sm text-gray-600">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeatureCard',
  props: {
    title: String,
    description: String,
    image: String
  },
  computed: {
    resolvedImage() {
      if (this.image.startsWith('@/')) {
        return new URL(this.image.replace(/^@\//, '/src/'), import.meta.url).href
      }
      return this.image
    }
  }
}
</script>
