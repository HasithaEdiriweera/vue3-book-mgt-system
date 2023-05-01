<template>
  <HeaderPage />
  <h3>Book Details</h3>
  <section>
    <div class="book-details">
      <h1>{{ book.title }} : {{ book.description }}</h1>
      <div>
        <img src="../../assets/book_logo.png" :alt="book.title" />
      </div>

      <div>
        <p>By</p>
        <div v-for="item in authors" :key="item.id">
          <h2 class="author">{{ item.name }}</h2>
        </div>
        <p class="description">ISBN No. {{ book.isbn }}</p>
        <p class="description">Publish Date: {{ book.publish_date }}</p>
        <p class="description">Publisher: {{ book.publisher }}</p>
        <p class="description">Price: {{ book.price }} ¥</p>

        <div>
          <el-button type="primary" @click="$router.back()">Go Back</el-button>
          <el-button type="primary" @click="$router.push({ name: 'Home'})" plain>Home</el-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import HeaderPage from "../Header.vue";
import axios from "axios";
export default {
  name: "BookDetails",
  components: {
    HeaderPage,
  },
  computed: {
    imageSrc() {
      return `../assets/HP${this.bookId}.jpg`;
    },
  },
  data() {
    return {
      book: {
        title: "",
        isbn: "",
        description: "",
        publish_date: "",
        publisher: "",
        price: "",
      },
      bookId: this.$route.params.id,
      authors: [],
    };
  },
  methods: {},
  async mounted() {
    const bookData = await axios.get(
      "http://localhost:8000/api/books/" + this.$route.params.id
    );
    const authorData = await axios.get(
      "http://localhost:8000/api/books/" + this.$route.params.id + "/author"
    );
    this.book = bookData.data;
    this.authors = authorData.data;
    console.log("upppp", authorData);
  },
};
</script>

<style>
.book-details {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.book-details h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.book-details p {
  font-size: 1.2rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.book-details .author {
  font-style: italic;
}

.book-details .description {
  margin-top: 2rem;
}
</style>
