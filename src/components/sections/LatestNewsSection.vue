<template>
  <section class="py-16 text-center bg-[#f7f8f9]" data-aos="fade-up" data-aos-duration="1000">
    <p 
      class="text-sm font-semibold text-orange-400 uppercase" 
      data-aos="fade-up" 
      data-aos-delay="100" 
      data-aos-duration="1200"
    >
      From Our Blog.
    </p>
    <h2 
      class="mt-2 mb-4 text-3xl font-bold md:text-4xl" 
      data-aos="fade-up" 
      data-aos-delay="200" 
      data-aos-duration="1200"
    >
      Latest News
    </h2>
    <p 
      class="max-w-2xl mx-auto mb-12 text-gray-600" 
      data-aos="fade-up" 
      data-aos-delay="300" 
      data-aos-duration="1200"
    >
      Grab all latest news for charity, donations, crowdfunding, fund-raising or new campaigns Gainlove launch.
    </p>

    <div v-if="blogPosts.length > 0" class="grid max-w-6xl grid-cols-1 gap-6 px-4 mx-auto md:grid-cols-3">
      <BlogCard
        v-for="(post, index) in blogPosts"
        :key="index"
        :img="post.img"
        :date="post.date"
        :title="post.title"
        :comments="post.comments"
        :author="post.author"
        :data-aos="'zoom-in'"
        :data-aos-delay="index * 150 + 400"
        data-aos-duration="1000"
      />
    </div>
    
    <div v-else class="py-12 text-gray-500">
      No news articles available. Check back later for updates.
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import BlogCard from '../cards/BlogCard.vue';

const blogPosts = ref([]);

const defaultPosts = [
  {
    img: 'src/assets/images/blog08.jpg',
    date: 'August 16, 2019',
    title: 'Tuesday Tips: Being Realistic With Your Goals',
    author: 'admin',
    comments: 3,
  },
  {
    img: 'src/assets/images/blog07.jpg',
    date: 'August 16, 2019',
    title: '20th Anniversary of Growing Up Asian in America',
    author: 'admin',
    comments: 3,
  },
  {
    img: 'src/assets/images/blog06.jpg',
    date: 'August 16, 2019',
    title: 'Stroke care gains in Puerto Rico after Hurricane Maria',
    author: 'admin',
    comments: 3,
  },
];

const loadNews = () => {
  const savedData = JSON.parse(localStorage.getItem('dashboardContent'));
  
  if (savedData && savedData.news && savedData.news.length > 0) {
    blogPosts.value = savedData.news.slice(0, 3).map(newsItem => ({
      img: newsItem.image || 'src/assets/images/default-news.jpg',
      date: formatDateForDisplay(newsItem.date),
      title: newsItem.title,
      author: 'admin',
      comments: 0,
      content: newsItem.content 
    }));
  } else {
    blogPosts.value = defaultPosts;
  }
};

const formatDateForDisplay = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

onMounted(() => {
  loadNews();
  
  window.addEventListener('storage', () => {
    loadNews();
  });
});
</script>