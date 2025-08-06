<template>
  <div class="p-6 duration-700 bg-white shadow-sm rounded-bl-3xl rounded-tr-3xl hover:shadow-2xl">
    <img :src="feature.icon" :alt="feature.alt" class="w-20 mx-auto mb-4">
    <h3 class="mb-3 text-lg font-semibold hover:text-secondary">{{ feature.title }}</h3>
    <p class="text-sm text-gray-500">{{ feature.description }}</p>
  </div>
</template>

<script>
export default {
  name: 'FeatureCard',
  props: {
    feature: {
      type: Object,
      required: true
    }
  }
}
</script> 