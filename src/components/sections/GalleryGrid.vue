<template>
  <div>
    <div class="grid grid-cols-1 gap-6 mx-auto mb-[60px] sm:grid-cols-2 lg:grid-cols-3 max-w-7xl">
      <div
        v-for="(src, i) in images"
        :key="i"
        class="relative overflow-hidden transition duration-700 transform rounded-lg shadow-md group"
        data-aos="zoom-in-up"
        data-aos-duration="1200"
        data-aos-easing="ease-in-out"
        :data-aos-delay="i * 50"
      >
        <img
          :src="resolveImage(src)"
          :alt="`Image ${i + 1}`"
          class="w-full h-auto transition duration-700 ease-in-out transform group-hover:scale-105"
          loading="lazy"
        />

        <button
          @click="openPreview(src)"
          class="absolute p-1 text-gray-700 transition bg-white rounded-full shadow top-2 right-2 hover:text-orange-500"
          title="معاينة"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      </div>
    </div>

    <div
      v-if="previewImage"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      @click="closePreview"
    >
      <img
        :src="resolveImage(previewImage)"
        alt="معاينة"
        class="max-w-full max-h-[90vh] rounded-lg shadow-lg transition-transform duration-500 scale-100"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'GalleryGrid',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const previewImage = ref(null)

    const openPreview = (src) => {
      previewImage.value = src
    }

    const closePreview = () => {
      previewImage.value = null
    }

    const resolveImage = (src) => {
      if (typeof src === 'string' && src.startsWith('@/')) {
        try {
          return new URL(src.replace(/^@\//, '/src/'), import.meta.url).href
        } catch {
          console.warn('Could not resolve image path:', src)
          return ''
        }
      }
      return src
    }

    return {
      resolveImage,
      previewImage,
      openPreview,
      closePreview
    }
  }
}
</script>
