<template>
  <HeaderPage />
  <div>
    <Navbar />
    <RouterView />
  </div>
  <h1>Books Management System</h1>
  <div class="max-w-sm mx-auto" v-if="isLoading">
    <span class="text-2xl font-bold text-indigo-700">Is Loading</span>
  </div>
  <div class="grid-container">
    <BookCard
      v-for="book in bookList"
      :key="book.id"
      :book="book"
      :id="book.id"
    />
  </div>
</template>
<script>
import { ref } from "vue";
import BookCard from "./Books/BookCard.vue";
import HeaderPage from "./Header.vue";
import axios from "axios";

// const bookList = ref([]);
// const isLoading = ref(true);

export default {
  name: "DashboardView",
  components: {
    HeaderPage,
    BookCard,
  },
  data() {
    return {
      books: [],
      bookList: ref([]),
      isLoading: ref(true),
    };
  },
  async mounted() {
    const result = await axios.get("http://localhost:8000/api/books/");
    this.bookList = result.data;
  },
};
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
}

.grid-item {
  /* background-color: #ccc; */
  padding: 20px;
  text-align: center;
}

button[type="book-btn"] {
  padding: 0.5rem;
  border-radius: 3px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
