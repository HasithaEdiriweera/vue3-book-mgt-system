<template>
  <HeaderPage />
  <h3>Author Details</h3>
  <section>
    <div class="book-details">
      <h1>{{ author.name }}</h1>
      <div>
        <img
          src="../../assets/author_logo.png"
          :alt="author.name"
          class="author-image"
        />
      </div>

      <div>
        <p>Books by : {{ author.name }}</p>
        <div v-for="item in books" :key="item.id">
          <h2 class="author">{{ item.title }}</h2>
        </div>
        <p class="description">Email: {{ author.email }}</p>
        <p class="description">Phone Number: {{ author.phone_number }}</p>

        <div>
          <el-button type="primary" @click="$router.back()">Back</el-button>
          <el-button type="primary" @click="$router.push({ name: 'Home'})" plain>Home</el-button>
          <el-button
            v-if="admin"
            type="primary"
            @click="$router.push({ name: 'UpdateAuthor' })"
            plain
            >Edit</el-button
          >
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
  data() {
    return {
      author: {
        name: "",
        email: "",
        phone_number: "",
      },
      authorId: this.$route.params.id,
      books: [],
      admin: false,
    };
  },
  methods: {
    async loadData() {
      let user = localStorage.getItem("user-info");
      if (user) {
        this.admin = true;
        this.name = JSON.parse(user).user.name;
        this.token = JSON.parse(user).token;
      }
    },
  },
  async mounted() {
    const authorData = await axios.get(
      "http://localhost:8000/api/author/" + this.$route.params.id
    );
    const bookData = await axios.get(
      "http://localhost:8000/api/author/" + this.$route.params.id + "/books"
    );
    this.author = authorData.data;
    this.books = bookData.data;

    this.loadData();
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

.author-image {
  width: 220px;
  height: 150px;
}
</style>
