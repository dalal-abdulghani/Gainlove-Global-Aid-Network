<template>
  <section
    class="relative bg-cover bg-center bg-no-repeat min-h-[700px] mx-6 my-12 rounded-tr-[80px] rounded-bl-[80px] overflow-hidden shadow-xl"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <div class="absolute inset-0 bg-black/30"></div>

    <div class="relative z-10 flex items-center h-full max-w-6xl px-6 py-20 mx-auto">
      <div
        class="w-full max-w-xl p-8 rounded-xl"
        data-aos="fade-right"
        data-aos-duration="1200"
      >
        <h2 class="mb-4 text-3xl text-black md:text-4xl">Questions? Ask!</h2>
        <p class="mb-6 text-gray-800">
          Fill in your information and we will get back to you – <br />
          or just give us a call: <strong>(+84) 1800 700 999</strong>
        </p>

        <form @submit.prevent="handleSubmit" class="grid grid-cols-1 gap-4">
          <input
            v-model="form.name"
            type="text"
            placeholder="Name"
            :class="inputClass(errors.name)"
          />
          <input
            v-model="form.phone"
            type="text"
            placeholder="Phone"
            :class="inputClass(errors.phone)"
          />
          <input
            v-model="form.email"
            type="email"
            placeholder="Email"
            :class="inputClass(errors.email)"
          />
          <textarea
            v-model="form.question"
            placeholder="Enter your question here"
            class="h-32"
            :class="inputClass(errors.question)"
          ></textarea>

          <button
            type="submit"
            class="flex items-center justify-center gap-2 px-6 py-3 w-fit text-white bg-[#ff9f0d] hover:bg-orange-400 rounded-br-3xl rounded-bl-3xl rounded-tr-3xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-white"
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
            <span class="text-base font-medium">Ask Question</span>
          </button>
        </form>

        <transition name="fade">
          <div
            v-if="notification.message"
            :class="[ 'mt-6 p-4 rounded-lg text-center text-sm font-semibold',
              notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            ]"
          >
            {{ notification.message }}
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import bgImage from '@/assets/images/h1-banner08.jpg'
import { messageAPI } from '../../services/api'

const form = reactive({
  name: '',
  phone: '',
  email: '',
  question: '',
})

const errors = reactive({
  name: '',
  phone: '',
  email: '',
  question: '',
})

const notification = reactive({
  message: '',
  type: '',
})

const inputClass = (error) =>
  `px-4 py-3 text-gray-800 placeholder-gray-400 bg-white border ${
    error ? 'border-red-500' : 'border-white'
  } rounded-tr-2xl rounded-bl-2xl focus:outline-none focus:ring-2 focus:ring-orange-400`

const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

async function handleSubmit() {
  Object.keys(errors).forEach((key) => (errors[key] = ''))

  if (!form.name) errors.name = 'Name is required'
  if (!form.phone) errors.phone = 'Phone is required'
  if (!form.email) {
    errors.email = 'Email is required'
  } else if (!validateEmail(form.email)) {
    errors.email = 'Email is invalid'
  }
  if (!form.question) errors.question = 'Message is required'

  if (Object.values(errors).some((e) => e)) {
    notification.message = 'Please fill all required fields correctly.'
    notification.type = 'error'
    setTimeout(() => (notification.message = ''), 3000)
    return
  }

  try {
    await saveMessageToApi()

    notification.message = 'Thank you! We received your message.'
    notification.type = 'success'
    setTimeout(() => (notification.message = ''), 3000)


    Object.keys(form).forEach((key) => (form[key] = ''))
  } catch (error) {
    notification.message = 'Something went wrong. Please try again.'
    notification.type = 'error'
    setTimeout(() => (notification.message = ''), 3000)
  }
}

async function saveMessageToApi() {
  const newMessage = {
    ...form,
    date: new Date().toISOString(),
  }
const response = await messageAPI.createMessage(newMessage)
console.log('API response:', response)

if (response.status !== 201) {
  throw new Error('Failed to save message')
}

return response.data


}


function saveMessageToLocalStorage() {
  const messages = JSON.parse(localStorage.getItem('contactMessages')) || []
  
  const newMessage = {
    ...form,
    date: new Date().toISOString()
  }
  
  messages.push(newMessage)
  
  localStorage.setItem('contactMessages', JSON.stringify(messages))
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>