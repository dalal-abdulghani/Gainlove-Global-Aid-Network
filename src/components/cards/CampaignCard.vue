<template>
  <div
    class="relative overflow-hidden transition duration-700 transform bg-white shadow-sm hover:shadow-lg rounded-tr-3xl rounded-bl-3xl"
  >
    <div class="relative">
      <img
        :src="campaign.image"
        alt="Campaign"
        class="object-cover w-full h-56 rounded-tr-3xl rounded-bl-3xl"
      />
      <span
        class="absolute px-3 py-1 text-xs font-semibold text-black bg-white rounded-full top-3 left-3"
      >
        {{ campaign.status }}
      </span>
      <span class="absolute text-white top-3 right-3">
        <i
          class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/60"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"
            />
            <rect x="2" y="6" width="14" height="12" rx="2" />
          </svg>
        </i>
      </span>
    </div>

    <div class="relative p-6">
      <div class="flex justify-between mb-2 text-sm text-gray-600">
        <span>
          Current<br />
          <strong class="text-lg">{{ campaign.current }}</strong>
        </span>
        <span class="text-3xl text-black">{{ campaign.percentage }}</span>
        <span>
          Target<br />
          <strong class="text-lg">{{ campaign.target }}</strong>
        </span>
      </div>
      <h3
        class="mt-6 mb-2 text-lg font-bold text-gray-900 hover:text-[#ff9f0d]"
      >
        {{ campaign.title }}
      </h3>
      <p class="mb-4 text-sm text-gray-600">{{ campaign.description }}</p>

      <div
        class="absolute bottom-0 right-0 flex items-center justify-center bg-[#ff9f0d] rounded-tl-full cursor-pointer w-14 h-14 hover:bg-orange-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16l4-4-4-4M8 12h8" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  campaign: {
    type: Object,
    required: true
  }
});
</script>
