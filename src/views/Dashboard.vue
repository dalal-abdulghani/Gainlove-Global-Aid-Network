<template>
  <div :class="['min-h-screen', theme === 'dark' ? 'bg-gray-900' : 'bg-[#f7f8f9]']">
    <div class="fixed z-50 flex flex-col items-end gap-2 bottom-4 right-4">
      <transition name="fade-slide-up" mode="out-in">
        <div v-if="showFabMenu" class="flex flex-col gap-2 mr-2">
          <button
            @click="clearLocalStorage"
            class="p-3 text-white bg-[#ea5b08] rounded-full shadow-lg hover:bg-red-700"
            title="Clear Storage"
            data-aos="fade-left"
            data-aos-delay="100"
          >
            <i class="fas fa-trash-alt"></i>
          </button>
          <button
            @click="toggleTheme"
            class="p-3 text-white bg-indigo-500 rounded-full shadow-lg hover:bg-indigo-600"
            title="Toggle Theme"
            data-aos="fade-left"
          >
            <i :class="theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'"></i>
          </button>
        </div>
      </transition>

      <button
        @click="toggleFabMenu"
        class="p-4 text-white rounded-full shadow-lg bg-[#ea9b08] hover:bg-orange-600 transition-all duration-300"
        :class="{ 'rotate-45': showFabMenu }"
        data-aos="fade-left"
      >
        <i class="fas fa-cog"></i>
      </button>
    </div>

    <div class="px-4 py-8 mx-auto max-w-7xl">
      <div class="flex items-center justify-between mb-8" data-aos="fade-down">
        <h1 :class="['text-3xl font-bold', theme === 'dark' ? 'text-white' : 'text-gray-800']">Dashboard</h1>
        <button 
          @click="logout"
          class="px-6 py-2 text-white transition-colors bg-[#ea9b08] rounded-3xl rounded-tl-none hover:bg-orange-400"
          data-aos="fade-left"
          data-aos-delay="100"
        >
          Logout
        </button>
      </div>
      
      <div class="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
        <div 
          v-for="(stat, index) in stats" 
          :key="index" 
          :class="['stat-card', theme === 'dark' ? 'bg-gray-800' : 'bg-white']"
          data-aos="fade-up"
          :data-aos-delay="100 * index"
        >
          <h3 :class="theme === 'dark' ? 'text-gray-300' : 'text-gray-600'">{{ stat.title }}</h3>
          <p :class="theme === 'dark' ? 'text-white' : 'text-gray-800'">{{ stat.value }}</p>
          <div class="mt-2 text-sm" :class="stat.trend > 0 ? 'text-green-500' : 'text-red-500'">
            <i :class="stat.trend > 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
            {{ Math.abs(stat.trend) }}% {{ stat.trend > 0 ? 'Increase' : 'Decrease' }}
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-8 mb-8 lg:grid-cols-2">
        <div 
          :class="['p-6 rounded-lg shadow-lg', theme === 'dark' ? 'bg-gray-800' : 'bg-white']"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h2 :class="['mb-4 text-xl font-bold', theme === 'dark' ? 'text-white' : 'text-gray-800']">Donations Overview</h2>
          <canvas ref="donationsChart" height="250"></canvas>
        </div>
        
        <div 
          :class="['p-6 rounded-lg shadow-lg', theme === 'dark' ? 'bg-gray-800' : 'bg-white']"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h2 :class="['mb-4 text-xl font-bold', theme === 'dark' ? 'text-white' : 'text-gray-800']">Campaigns Progress</h2>
          <canvas ref="campaignsChart" height="250"></canvas>
        </div>
      </div>

      <div 
        :class="['mb-8 overflow-hidden rounded-lg shadow-lg', theme === 'dark' ? 'bg-gray-800' : 'bg-white']"
        data-aos="fade-up"
      >
        <div :class="['border-b', theme === 'dark' ? 'border-gray-700' : 'border-gray-200']">
          <nav class="flex -mb-px">
            <button 
              v-for="(tab, index) in tabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                activeTab === tab.id 
                  ? (theme === 'dark' ? 'border-orange-500 text-orange-400' : 'border-orange-500 text-orange-600')
                  : (theme === 'dark' ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'),
                'whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm'
              ]"
              data-aos="fade-up"
              :data-aos-delay="100 * index"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <div v-if="activeTab === 'programs'" class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 :class="['text-xl font-bold', theme === 'dark' ? 'text-white' : 'text-gray-800']">Manage Programs</h2>
            <button 
              @click="showProgramForm = !showProgramForm" 
              class="px-4 py-2 text-white bg-[#ea9b08] rounded-3xl rounded-tl-none hover:bg-orange-400"
              data-aos="fade-left"
            >
              {{ showProgramForm ? 'Cancel' : 'Add Program' }}
            </button>
          </div>

          <div v-if="showProgramForm" :class="['p-4 mb-6 rounded-lg', theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50']">
            <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
              <div>
                <label :class="['block mb-1 text-sm font-medium', theme === 'dark' ? 'text-gray-300' : 'text-gray-700']">Program Title</label>
                <input 
                  v-model="currentProgram.title" 
                  :class="['w-full p-2 border rounded', theme === 'dark' ? 'bg-gray-600 text-white border-gray-500' : 'bg-white']"
                >
              </div>
              <div>
                <label :class="['block mb-1 text-sm font-medium', theme === 'dark' ? 'text-gray-300' : 'text-gray-700']">Upload Image</label>
                <input 
                  type="file" 
                  @change="handleProgramImage" 
                  :class="['w-full p-2 border rounded', theme === 'dark' ? 'bg-gray-600 text-white border-gray-500' : 'bg-white']"
                >
              </div>
            </div>
            <div class="mb-4">
              <label :class="['block mb-1 text-sm font-medium', theme === 'dark' ? 'text-gray-300' : 'text-gray-700']">Description</label>
              <textarea 
                v-model="currentProgram.description" 
                rows="4" 
                :class="['w-full p-2 border rounded', theme === 'dark' ? 'bg-gray-600 text-white border-gray-500' : 'bg-white']"
              >                {{ isEditingProgram ? currentProgram.description
               : '' }}
</textarea>
            </div>
            <div class="flex justify-end space-x-2">
              <button 
                @click="cancelProgramForm" 
                :class="['px-4 py-2 border rounded-tl-none rounded-3xl', theme === 'dark' ? 'bg-gray-600 text-white border-gray-500' : '']"
              >
                Cancel
              </button>
              <button 
                @click="saveProgram" 
                class="px-4 py-2 text-white bg-green-500 rounded-tl-none rounded-3xl hover:bg-green-600"
              >
                {{ isEditingProgram ? 'Update Program' : 'Save Program' }}
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div 
              v-for="(program, index) in programs" 
              :key="index" 
              :class="['overflow-hidden border rounded-lg shadow-sm', theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white']"
              data-aos="fade-up"
              :data-aos-delay="100 * index"
            >
              <img :src="'http://gainlove-api-v2.test/'+program.image" alt="Program Image" class="object-cover w-full h-48">
              <div class="p-4">
                <h3 :class="['mb-2 text-lg font-bold', theme === 'dark' ? 'text-white' : 'text-gray-800']">{{ program.title }}</h3>
                <p :class="['mb-4 text-sm', theme === 'dark' ? 'text-gray-300' : 'text-gray-600']">{{ program.description }}</p>
                <div class="flex justify-end space-x-2">
                  <button @click="editProgram(program.id)" class="text-sm text-orange-500 hover:text-orange-600">Edit</button>
                  <button @click="confirmDelete('program', program.id)" class="text-sm text-red-500 hover:text-red-600">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'news'" class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 :class="['text-xl font-bold', theme === 'dark' ? 'text-white' : 'text-gray-800']">Manage News</h2>
            <button 
              @click="showNewsForm = !showNewsForm" 
              class="px-4 py-2 text-white bg-[#ea9b08] rounded-3xl rounded-tl-none hover:bg-orange-400"
              data-aos="fade-left"
            >
              {{ showNewsForm ? 'Cancel' : 'Add News' }}
            </button>
          </div>

          <div v-if="showNewsForm" :class="['p-4 mb-6 rounded-lg', theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50']">
            <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
              <div>
                <label :class="['block mb-1 text-sm font-medium', theme === 'dark' ? 'text-gray-300' : 'text-gray-700']">News Title</label>
                <input 
                  v-model="currentNews.title" 
                  :class="['w-full p-2 border rounded', theme === 'dark' ? 'bg-gray-600 text-white border-gray-500' : 'bg-white']"
                >
              </div>
              <div>
                <label :class="['block mb-1 text-sm font-medium', theme === 'dark' ? 'text-gray-300' : 'text-gray-700']">Date</label>
                <input 
                  v-model="currentNews.date" 
                  type="date" 
                  :class="['w-full p-2 border rounded', theme === 'dark' ? 'bg-gray-600 text-white border-gray-500' : 'bg-white']"
                >
              </div>
            </div>
            <div class="mb-4">
              <label :class="['block mb-1 text-sm font-medium', theme === 'dark' ? 'text-gray-300' : 'text-gray-700']">Upload Image</label>
              <input 
                type="file" 
                @change="handleNewsImage" 
                :class="['w-full p-2 border rounded', theme === 'dark' ? 'bg-gray-600 text-white border-gray-500' : 'bg-white']"
              >
            </div>
            <div class="mb-4">
              <label :class="['block mb-1 text-sm font-medium', theme === 'dark' ? 'text-gray-300' : 'text-gray-700']">Content</label>
              <textarea 
                v-model="currentNews.content" 
                rows="4" 
                :class="['w-full p-2 border rounded', theme === 'dark' ? 'bg-gray-600 text-white border-gray-500' : 'bg-white']"
              ></textarea>
            </div>
            <div class="flex justify-end space-x-2">
              <button 
                @click="cancelNewsForm" 
                :class="['px-4 py-2 border rounded-tl-none rounded-3xl', theme === 'dark' ? 'bg-gray-600 text-white border-gray-500' : '']"
              >
                Cancel
              </button>
              <button 
                @click="saveNews" 
                class="px-4 py-2 text-white bg-green-500 rounded-tl-none rounded-3xl hover:bg-green-600"
              >
                {{ isEditingNews ? 'Update News' : 'Publish News' }}
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div 
              v-for="(news, index) in newsList" 
              :key="index" 
              :class="['overflow-hidden border rounded-lg shadow-sm', theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white']"
              data-aos="fade-up"
              :data-aos-delay="100 * index"
            >
              <img v-if="  news.image" :src="'http://gainlove-api-v2.test/'+news.image" alt="News Image" class="object-cover w-full h-48">
              <div class="p-4">
                <div class="flex items-start justify-between mb-2">
                  <h3 :class="['text-lg font-bold', theme === 'dark' ? 'text-white' : 'text-gray-800']">{{ news.title }}</h3>
                  <span :class="['text-sm', theme === 'dark' ? 'text-gray-400' : 'text-gray-500']">{{ formatDate(news.date) }}</span>
                </div>
                <p :class="['mb-4', theme === 'dark' ? 'text-gray-300' : 'text-gray-600']">{{ news.content }}</p>
                <div class="flex justify-end space-x-2">
                  <button @click="editNews(news.id)" class="text-sm text-orange-500 hover:text-orange-600">Edit</button>
                  <button @click="confirmDelete('news', news.id)" class="text-sm text-red-500 hover:text-red-600">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'partners'" class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 :class="['text-xl font-bold', theme === 'dark' ? 'text-white' : 'text-gray-800']">Manage Partners</h2>
            <button 
              @click="showPartnerForm = !showPartnerForm" 
              class="px-4 py-2 text-white bg-[#ea9b08] rounded-3xl rounded-tl-none hover:bg-orange-400"
              data-aos="fade-left"
            >
              {{ showPartnerForm ? 'Cancel' : 'Add Partner' }}
            </button>
          </div>

          <div v-if="showPartnerForm" :class="['p-4 mb-6 rounded-lg', theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50']">
            <div class="mb-4">
              <label :class="['block mb-1 text-sm font-medium', theme === 'dark' ? 'text-gray-300' : 'text-gray-700']">Partner Logo</label>
              <input 
                type="file" 
                @change="handlePartnerLogo" 
                :class="['w-full p-2 border rounded', theme === 'dark' ? 'bg-gray-600 text-white border-gray-500' : 'bg-white']"
              >
            </div>
            <div class="flex justify-end space-x-2">
              <button 
                @click="cancelPartnerForm" 
                :class="['px-4 py-2 border rounded-tl-none rounded-3xl', theme === 'dark' ? 'bg-gray-600 text-white border-gray-500' : '']"
              >
                Cancel
              </button>
              <button 
                @click="savePartner" 
                class="px-4 py-2 text-white bg-green-500 rounded-tl-none rounded-3xl hover:bg-green-600"
              >
                {{ isEditingPartner ? 'Update Partner' : 'Add Partner' }}
              </button>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <div 
              v-for="(partner, index) in partners" 
              :key="index" 
              :class="['relative flex items-center justify-center h-32 p-4 border rounded-lg', theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white']"
              data-aos="fade-up"
              :data-aos-delay="100 * index"
            >
              <img :src="'http://gainlove-api-v2.test/'+ partner.image" alt="Partner Logo" class="object-contain max-w-full max-h-20">
              <div class="absolute top-0 right-0 flex p-1 space-x-1">
                <button @click="editPartner(partner.id)" class="p-1 text-sm text-white bg-orange-500 rounded-full hover:bg-orange-600">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="confirmDelete('partner', partner.id)" class="p-1 text-sm text-white bg-red-500 rounded-full hover:bg-red-600">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'messages'" class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 :class="['text-xl font-bold', theme === 'dark' ? 'text-white' : 'text-gray-800']">Contact Messages</h2>
            <button 
              @click="refreshMessages" 
              class="px-4 py-2 text-white bg-[#ea9b08] rounded-3xl rounded-tl-none hover:bg-orange-400"
              data-aos="fade-left"
            >
              <i class="fas fa-sync-alt"></i> Refresh
            </button>
          </div>

          <div class="grid grid-cols-1 gap-6">
            <div 
              v-for="(message, index) in messages" 
              :key="index" 
              :class="['border rounded-lg overflow-hidden', theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white']"
              data-aos="fade-up"
              :data-aos-delay="100 * index"
            >
              <div 
                :class="['px-6 py-4 border-b', theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50']"
                @click="toggleMessage(index)"
                class="cursor-pointer"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <h3 :class="['font-bold', theme === 'dark' ? 'text-white' : 'text-gray-800']">{{ message.name }}</h3>
                    <p :class="['text-sm', theme === 'dark' ? 'text-gray-400' : 'text-gray-500']">{{ message.email }}</p>
                  </div>
                  <div class="text-sm" :class="theme === 'dark' ? 'text-gray-400' : 'text-gray-500'">
                    {{ formatDate(message.date) }}
                  </div>
                </div>
              </div>
              
              <transition name="slide">
                <div v-if="message.expanded" class="p-6">
                  <div class="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                    <div>
                      <label :class="['block mb-1 text-sm font-medium', theme === 'dark' ? 'text-gray-300' : 'text-gray-700']">Phone</label>
                      <p :class="theme === 'dark' ? 'text-white' : 'text-gray-800'">{{ message.phone || 'N/A' }}</p>
                    </div>
                    <div>
                      <label :class="['block mb-1 text-sm font-medium', theme === 'dark' ? 'text-gray-300' : 'text-gray-700']">Date</label>
                      <p :class="theme === 'dark' ? 'text-white' : 'text-gray-800'">{{ formatDate(message.date) }}</p>
                    </div>
                  </div>
                  
                  <div class="mb-4">
                    <label :class="['block mb-1 text-sm font-medium', theme === 'dark' ? 'text-gray-300' : 'text-gray-700']">Message</label>
                    <p :class="['p-4 rounded-lg', theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-800']">
                      {{ message.question }}
                    </p>
                  </div>
                  
                  <div class="flex justify-end">
                    <button 
                      @click.stop="deleteMessage(index)" 
                      class="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </transition>
            </div>
            
            <div 
              v-if="messages.length === 0" 
              :class="['p-8 text-center rounded-lg', theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500']"
            >
              No messages found
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div :class="['p-6 rounded-lg shadow-xl', theme === 'dark' ? 'bg-gray-800' : 'bg-white']" data-aos="zoom-in">
        <h3 :class="['mb-4 text-lg font-medium', theme === 'dark' ? 'text-white' : 'text-gray-900']">Confirm Delete</h3>
        <p :class="['mb-6', theme === 'dark' ? 'text-gray-300' : 'text-gray-600']">Are you sure you want to delete this {{ itemToDelete.type }}?</p>
        <div class="flex justify-end space-x-3">
          <button 
            @click="showDeleteModal = false" 
            :class="['px-4 py-2 rounded-lg', theme === 'dark' ? 'text-gray-300 bg-gray-700' : 'text-gray-700 bg-gray-200']"
          >
            Cancel
          </button>
          <button @click="deleteItem" class="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { dashboardAPI, programAPI, newsAPI, partnerAPI, messageAPI } from '@/services/api';

Chart.register(...registerables);

export default {
  name: 'Dashboard',
  data() {
    return {
      loading: false,
      theme: 'light',
      stats: [
        { title: 'Total Donations', value: '$0', trend: 0 },
        { title: 'Active Campaigns', value: '0', trend: 0 },
        { title: 'New Partners', value: '0', trend: 0 },
        { title: 'Programs', value: '0', trend: 0 }
      ],
      tabs: [
        { id: 'programs', name: 'Programs' },
        { id: 'news', name: 'News' },
        { id: 'partners', name: 'Partners' },
        { id: 'messages', name: 'Messages' }
      ],
      activeTab: 'programs',
      showFabMenu: false,

      programs: [],
      showProgramForm: false,
      currentProgram: {
        id: null,
        title: '',
        description: '',
        image: ''
      },
      isEditingProgram: false,

      newsList: [],
      showNewsForm: false,
      currentNews: {
        id: null,
        title: '',
        content: '',
        date: new Date().toISOString().split('T')[0],
        image: ''
      },
      isEditingNews: false,

      partners: [],
      showPartnerForm: false,
      currentPartner: {
        id: null,
        logo: ''
      },
      isEditingPartner: false,

      messages: [],

      showDeleteModal: false,
      itemToDelete: {
        type: '',
        id: null
      }
    }
  },
  async mounted() {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.theme = savedTheme;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.theme = 'dark';
    }

    await this.loadData();
    this.initCharts();
  },
  methods: {
    toggleFabMenu() {
      this.showFabMenu = !this.showFabMenu;
    },

    async clearLocalStorage() {
      if (confirm('Are you sure you want to clear ALL local storage data? This will delete your theme preference and logout!')) {
        localStorage.clear();
        this.$router.push('/login');
      }
    },

    async logout() {
      try {
        await dashboardAPI.logout();
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        localStorage.removeItem('auth');
        this.$router.push('/');
      }
    },

    async loadData() {
      this.loading = true;
      try {
        const statsResponse = await dashboardAPI.getStats();
        console.log('Stats response:', statsResponse);
        if (statsResponse?.status === 200) {
          const data = statsResponse.data;
          this.stats = [
            { title: 'Total Programs', value: data.total_programs, trend: -2 },
            { title: 'Total Messages', value: data.total_messages, trend: 0 },
            { title: 'Total Partners', value: data.total_partners, trend: 3 },
            { title: 'Latest News', value: data.latest_news.length, trend: 0 }
          ];
        }

        if (this.activeTab === 'programs') {
          await this.loadPrograms();
        } else if (this.activeTab === 'news') {
          await this.loadNews();
        } else if (this.activeTab === 'partners') {
          await this.loadPartners();
        } else if (this.activeTab === 'messages') {
          await this.loadMessages();
        }
      } catch (error) {
        console.error('Error loading data:', error);
        this.showError('Failed to load data');
      } finally {
        this.loading = false;
      }
    },

    async loadPrograms() {
      try {
        const response = await programAPI.getPrograms();
        if (response.status === 200) {
          this.programs = response.data;
        }
      } catch (error) {
        console.error('Error loading programs:', error);
        throw error;
      }
    },

    async loadNews() {
      try {
        const response = await newsAPI.getNews();
        console.log('news response:', response);
        if (response.status === 200) {
          this.newsList = response.data;
        }
      } catch (error) {
        console.error('Error loading news:', error);
        throw error;
      }
    },

    async loadPartners() {
      try {
        const response = await partnerAPI.getPartners();
        console.log('partners response:', response);
        if (response.status === 200) {
          this.partners = response.data;
        }
      } catch (error) {
        console.error('Error loading partners:', error);
        throw error;
      }
    },

    async loadMessages() {
      try {
        const response = await messageAPI.getMessages();
        if (response.status === 200) {
          this.messages = response.data.map(msg => ({
            ...msg,
            expanded: false
          }));
        }
      } catch (error) {
        console.error('Error loading messages:', error);
        throw error;
      }
    },

    toggleMessage(index) {
      this.messages[index].expanded = !this.messages[index].expanded;
    },

    async deleteMessage(index) {
      try {
        const messageId = this.messages[index].id;
        const response = await dashboardAPI.deleteMessage(messageId);

        if (response.status === 200) {
          this.messages.splice(index, 1);
          this.showSuccess('Message deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting message:', error);
        this.showError('Failed to delete message');
      }
    },

    refreshMessages() {
      this.loadMessages();
    },

    handleProgramImage(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.currentProgram.image = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    },

    addProgram() {
      this.isEditingProgram = false;
      this.currentProgram = {
        id: null,
        title: '',
        description: '',
        image: ''
      };
      this.showProgramForm = true;
    },

    async editProgram(programID) {
      try {
        const response = await programAPI.getProgramById(programID);
        if (response.status === 200) {
          this.currentProgram = response.data;
          this.isEditingProgram = true;
          this.showProgramForm = true;
        } else {
          this.showError('Failed to load program details');
        }
      } catch (error) {
        console.error('Error fetching program details:', error);
        this.showError('Failed to load program details');
      }
    },

    async saveProgram() {
      if (!this.currentProgram.title || !this.currentProgram.description) {
        this.showError('Please fill all required fields');
        return;
      }

      this.loading = true;

      try {
        let response;

        const base64ToFile = (base64String, filename = 'program.png') => {
          const arr = base64String.split(',');
          const mime = arr[0].match(/:(.*?);/)[1];
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new File([u8arr], filename, { type: mime });
        };

        const formData = new FormData();
        formData.append('title', this.currentProgram.title);
        formData.append('description', this.currentProgram.description);

        if (this.currentProgram.image) {
          let imageFile;
          if (this.currentProgram.image instanceof File) {
            imageFile = this.currentProgram.image;
          } else if (
            typeof this.currentProgram.image === 'string' &&
            this.currentProgram.image.startsWith('data:')
          ) {
            imageFile = base64ToFile(this.currentProgram.image, 'program.png');
          }
          if (imageFile) {
            formData.append('image', imageFile);
          }
        }

        if (this.isEditingProgram) {
          response = await programAPI.updateProgram(this.currentProgram.id, formData);
        } else {
          response = await programAPI.createProgram(formData);
        }

        if (response.status === 200 || response.status === 201) {
          this.showSuccess(`Program ${this.isEditingProgram ? 'updated' : 'created'} successfully`);
          this.cancelProgramForm();
          await this.loadPrograms();
        }
      } catch (error) {
        console.error('Error saving program:', error?.response?.data || error.message);
        this.showError(error?.response?.data?.message || 'Failed to save program');
      } finally {
        this.loading = false;
      }
    },

    cancelProgramForm() {
      this.showProgramForm = false;
      this.isEditingProgram = false;
    },

    handleNewsImage(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.currentNews.image = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    },

    addNews() {
      this.isEditingNews = false;
      this.currentNews = {
        id: null,
        title: '',
        content: '',
        date: new Date().toISOString().split('T')[0],
        image: ''
      };
      this.showNewsForm = true;
    },

    async editNews(newsID) {
      try {
        const response = await newsAPI.getNewsById(newsID);
        if (response.status === 200) {
          this.currentNews = response.data;
          this.isEditingNews = true;
          this.showNewsForm = true;
        } else {
          this.showError('Failed to load news details');
        }
      } catch (error) {
        console.error('Error fetching news details:', error);
        this.showError('Failed to load news details');
      }
    },

    async saveNews() {
      if (!this.currentNews.title || !this.currentNews.date) {
        this.showError('Please fill all required fields');
        return;
      }

      this.loading = true;

      try {
        let response;

        const base64ToFile = (base64String, filename = 'news.png') => {
          const arr = base64String.split(',');
          const mime = arr[0].match(/:(.*?);/)[1];
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new File([u8arr], filename, { type: mime });
        };

        const formData = new FormData();
        formData.append('title', this.currentNews.title);
        formData.append('date', this.currentNews.date);

        if (this.currentNews.image) {
          let imageFile;
          if (this.currentNews.image instanceof File) {
            imageFile = this.currentNews.image;
          } else if (
            typeof this.currentNews.image === 'string' &&
            this.currentNews.image.startsWith('data:')
          ) {
            imageFile = base64ToFile(this.currentNews.image, 'news.png');
          }
          if (imageFile) {
            formData.append('image', imageFile);
          }
        }

        if (this.isEditingNews) {
          response = await newsAPI.updateNews(this.currentNews.id, formData);
        } else {
          response = await newsAPI.createNews(formData);
        }

        if (response.status === 200 || response.status === 201 || response.data?.message) {
          this.showSuccess(`News ${this.isEditingNews ? 'updated' : 'created'} successfully`);
          this.cancelNewsForm();
          await this.loadNews();
        }
      } catch (error) {
        console.error('Error saving news:', error?.response?.data || error.message);
        const msg = error?.response?.data?.errors?.join(', ') || 'Failed to save news';
        this.showError(msg);
      } finally {
        this.loading = false;
      }
    },

    cancelNewsForm() {
      this.showNewsForm = false;
      this.isEditingNews = false;
    },

    handlePartnerLogo(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.currentPartner.logo = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    },

    addPartner() {
      this.isEditingPartner = false;
      this.currentPartner = {
        id: null,
        logo: ''
      };
      this.showPartnerForm = true;
    },

    async editPartner(partnerID) {
      try {
        const response = await partnerAPI.getPartnerById(partnerID);
        console.log('edit partner response:', response);
        if (response.status === 200) {
          this.currentPartner = response.data;
          this.isEditingPartner = true;
          this.showPartnerForm = true;
        } else {
          this.showError('Failed to load partner details');
        }
      } catch (error) {
        console.error('Error fetching partner details:', error);
        this.showError('Failed to load partner details');
      }
    },

    async savePartner() {
      if (!this.currentPartner.logo) {
        this.showError('Please upload a logo');
        return;
      }

      this.loading = true;
      try {
        let response;

        const base64ToFile = (base64String, filename = 'partner.png') => {
          const arr = base64String.split(',');
          const mime = arr[0].match(/:(.*?);/)[1];
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new File([u8arr], filename, { type: mime });
        };

        const formData = new FormData();
        if (this.currentPartner.logo) {
          let imageFile;
          if (this.currentPartner.logo instanceof File) {
            imageFile = this.currentPartner.logo;
          } else if (
            typeof this.currentPartner.logo === 'string' &&
            this.currentPartner.logo.startsWith('data:')
          ) {
            imageFile = base64ToFile(this.currentPartner.logo, 'partner.png');
          }

          if (imageFile) {
            formData.append('image', imageFile);
          }
        }

        if (this.isEditingPartner) {
          response = await partnerAPI.updatePartner(this.currentPartner.id, formData);
        } else {
          response = await partnerAPI.createPartner(formData);
        }

        if (response.status === 200 || response.status === 201) {
          this.showSuccess(`Partner ${this.isEditingPartner ? 'updated' : 'added'} successfully`);
          this.cancelPartnerForm();
          await this.loadPartners();
        }
      } catch (error) {
        console.error('Error saving partner:', error);
        this.showError('Failed to save partner');
      } finally {
        this.loading = false;
      }
    },

    cancelPartnerForm() {
      this.showPartnerForm = false;
      this.isEditingPartner = false;
    },

    confirmDelete(type, id) {
      this.itemToDelete = { type, id };
      this.showDeleteModal = true;
    },

    async deleteItem() {
      this.loading = true;
      try {
        let response;

        switch (this.itemToDelete.type) {
          case 'program':
            console.log('Deleting program with ID:', this.itemToDelete.id);
            response = await dashboardAPI.deleteProgram(this.itemToDelete.id);
            if (response.status === 200) {
              this.programs = this.programs.filter(p => p.id !== this.itemToDelete.id);
            }
            break;
          case 'news':
            response = await dashboardAPI.deleteNews(this.itemToDelete.id);
            if (response.status === 200) {
              this.newsList = this.newsList.filter(n => n.id !== this.itemToDelete.id);
            }
            break;
          case 'partner':
            response = await dashboardAPI.deletePartner(this.itemToDelete.id);
            if (response.status === 200) {
              this.partners = this.partners.filter(p => p.id !== this.itemToDelete.id);
            }
            break;
        }

        if (response?.status === 200) {
          this.showSuccess('Item deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting item:', error);
        this.showError('Failed to delete item');
      } finally {
        this.loading = false;
        this.showDeleteModal = false;
      }
    },

    initCharts() {
      const textColor = this.theme === 'dark' ? '#fff' : '#666';
      const gridColor = this.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

      if (this.$refs.donationsChart) {
        const donationsCtx = this.$refs.donationsChart.getContext('2d');
        new Chart(donationsCtx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              label: 'Donations ($)',
              data: [3200, 4100, 2800, 5200, 3900, 4800],
              borderColor: '#ea9b08',
              backgroundColor: 'rgba(234, 155, 8, 0.1)',
              tension: 0.3,
              fill: true
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  color: textColor
                }
              }
            },
            scales: {
              x: {
                grid: {
                  color: gridColor
                },
                ticks: {
                  color: textColor
                }
              },
              y: {
                grid: {
                  color: gridColor
                },
                ticks: {
                  color: textColor
                }
              }
            }
          }
        });
      }

      if (this.$refs.campaignsChart) {
        const campaignsCtx = this.$refs.campaignsChart.getContext('2d');
        new Chart(campaignsCtx, {
          type: 'bar',
          data: {
            labels: ['Education', 'Health', 'Environment', 'Food', 'Shelter'],
            datasets: [{
              label: 'Progress (%)',
              data: [75, 90, 60, 45, 80],
              backgroundColor: [
                'rgba(234, 155, 8, 0.7)',
                'rgba(16, 185, 129, 0.7)',
                'rgba(59, 130, 246, 0.7)',
                'rgba(244, 63, 94, 0.7)',
                'rgba(139, 92, 246, 0.7)'
              ],
              borderColor: [
                'rgba(234, 155, 8, 1)',
                'rgba(16, 185, 129, 1)',
                'rgba(59, 130, 246, 1)',
                'rgba(244, 63, 94, 1)',
                'rgba(139, 92, 246, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: textColor
                }
              }
            },
            scales: {
              x: {
                grid: {
                  color: gridColor
                },
                ticks: {
                  color: textColor
                }
              },
              y: {
                beginAtZero: true,
                max: 100,
                grid: {
                  color: gridColor
                },
                ticks: {
                  color: textColor
                }
              }
            }
          }
        });
      }
    },

    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },

    showError(message) {
      alert(`Error: ${message}`);
    },

    showSuccess(message) {
      alert(`Success: ${message}`);
    }
  },
  watch: {
    async activeTab() {
      await this.loadData();
    }
  }
}
</script>



<style scoped>
.stat-card {
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  text-align: center;
  transition: all 0.3s ease;
}

.stat-card h3 {
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.stat-card p {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
  transition: color 0.3s ease;
}

.dark-mode-transition {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
  overflow: hidden;
}

.slide-enter-from, .slide-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}

.fade-slide-up-enter-active,
.fade-slide-up-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-up-enter-from,
.fade-slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.rotate-45 {
  transform: rotate(45deg);
  transition: transform 0.3s ease;
}
</style>