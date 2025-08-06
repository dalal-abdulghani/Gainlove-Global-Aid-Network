<template>
  <div
    class="text-center transition-transform duration-300 transform cursor-pointer group hover:scale-105"
    :aria-label="label"
    @click="$emit('select', category)"
    data-aos="fade-up"
    data-aos-duration="600"
  >
    <div class="relative inline-block">
      <span
        class="absolute -top-3 -right-3 text-xs font-bold px-1.5 py-0.5 rounded-full transition-colors duration-300"
        :class="active ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-700'"
      >
        {{ count }}
      </span>
      <span
        class="text-sm font-semibold transition-colors duration-300"
        :class="active ? 'text-orange-500' : 'text-gray-700 group-hover:text-orange-500'"
      >
        {{ label }}
      </span>
      <div
        class="w-full h-1 mt-1 transition-all duration-300"
        :class="active ? 'bg-orange-500' : 'bg-transparent group-hover:bg-orange-400'"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GalleryFilterTab',
  props: {
    label: { type: String, required: true },
    category: { type: String, required: true },
    count: { type: Number, default: 0 },
    active: { type: Boolean, default: false }
  }
}
</script>
