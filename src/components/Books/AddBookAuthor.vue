<template>
  <HeaderPage />
  <h1>Add Authors to Book : {{ book.title }}</h1>
  <div>
    <el-form label-position="right" label-width="40%">
      <el-form-item label="Title : ">
        <el-input disabled="true" style="width: 25%" v-model="book.title"></el-input>
      </el-form-item>
      <el-form-item label="Description : ">
        <el-input disabled="true" style="width: 25%" v-model="book.description"></el-input>
      </el-form-item>
      <el-form-item label="Select Author : ">
          <select id="my-dropdown" v-model="selectedOption" placeholder="Select a Book">
            <option v-for="(option, index) in authors" :key="index" :value="option" >{{ option.name }}</option>
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
  name: "BookAuthor",
  components: {
    HeaderPage,
  },
  data() {
    return {
      book: {
        title: ""
      },
      token: null,
      name: "",
      bookId: this.$route.params.id,
      authors: [],
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
      const result = await axios.post("http://localhost:8000/api/books/" + this.$route.params.id + "/authors", {
        authorIds: [this.selectedOption.id],
      });
      if (result.status == 200) {
        this.$router.push({ path: "/bookDetails/" + this.$route.params.id });
      }
    }
  },
  async mounted() {
    const bookData = await axios.get(
      "http://localhost:8000/api/books/" + this.$route.params.id
    );
    const authorData = await axios.get(
      "http://localhost:8000/api/author"
    );
    this.authors = authorData.data;
    this.book = bookData.data;
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
