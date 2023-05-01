<template>
  <HeaderPage />
  <h1>Add Books to Author : {{ author.name }}</h1>
  <div>
    <el-form label-position="right" label-width="40%">
      <el-form-item label="Name : ">
        <el-input disabled="true" style="width: 25%" v-model="author.name"></el-input>
      </el-form-item>
      <el-form-item label="Email : ">
        <el-input disabled="true" style="width: 25%" v-model="author.email"></el-input>
      </el-form-item>
      <el-form-item label="Select Book : ">
          <select id="my-dropdown" v-model="selectedOption" placeholder="Select a Book">
            <option v-for="(option, index) in books" :key="index" :value="option" >{{ option.title }}</option>
          </select>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 15%" type="primary" v-on:click="addBook">Add Book</el-button>
        <el-button style="width: 9%" type="primary" @click="$router.back()" plain>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import HeaderPage from "../Header.vue";
import axios from "axios";
export default {
  name: "AuthorBooks",
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
      token: null,
      name: "",
      authorId: this.$route.params.id,
      books: [],
      admin: false,
      selectedOption: null,
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
    async addBook() {
      axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
      const result = await axios.post("http://localhost:8000/api/author/" + this.$route.params.id + "/books", {
        bookIds: [this.selectedOption.id],
      });
      if (result.status == 200) {
        this.$router.push({ path: "/authorDetails/" + this.$route.params.id });
      }
    }
  },
  async mounted() {
    const authorData = await axios.get(
      "http://localhost:8000/api/author/" + this.$route.params.id
    );
    const bookData = await axios.get(
      "http://localhost:8000/api/books"
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
