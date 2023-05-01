<template>
  <HeaderPage />
  <h1>Hello {{ name }} , Welocome to Add Book Page</h1>
  <el-form label-position="right" label-width="40%">
    <el-form-item label="Title : ">
      <el-input
        style="width: 25%"
        v-model="book.title"
        placeholder="Enter Title"
      ></el-input>
    </el-form-item>
    <el-form-item label="ISBN : ">
      <el-input
        style="width: 25%"
        v-model="book.isbn"
        placeholder="Enter ISBN"
      ></el-input>
    </el-form-item>
    <el-form-item label="Description : ">
      <el-input
        style="width: 25%"
        v-model="book.description"
        placeholder="Enter Description"
      ></el-input>
    </el-form-item>
    <el-form-item label="Publish Date : ">
      <el-input
        type="date"
        style="width: 25%"
        v-model="book.publish_date"
      ></el-input>
    </el-form-item>
    <el-form-item label="Publisher : ">
      <el-input
        style="width: 25%"
        v-model="book.publisher"
        placeholder="Enter Publisher"
      ></el-input>
    </el-form-item>
    <el-form-item label="Price : ">
      <el-input
        style="width: 25%"
        v-model="book.price"
        placeholder="Enter Price"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button style="width: 15%" type="primary" v-on:click="addBook"
        >Add Book</el-button
      >
      <el-button style="width: 9%" type="primary" @click="$router.back()" plain
        >Cancel</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import HeaderPage from "../Header.vue";
import axios from "axios";
export default {
  name: "AddBook",
  components: {
    HeaderPage,
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
      token: null,
      name: "",
    };
  },
  methods: {
    async addBook() {
      axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
      const result = await axios.post("http://localhost:8000/api/books", {
        title: this.book.title,
        isbn: this.book.isbn,
        description: this.book.description,
        publish_date: this.book.publish_date,
        publisher: this.book.publisher,
        price: this.book.price,
      });
      if (result.status == 201) {
        this.$router.push({ name: "Home" });
      }
    },
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    this.name = JSON.parse(user).user.name;
    this.token = JSON.parse(user).token;
    if (!user) {
      this.$router.push({ name: "SignUp" });
    }
  },
};
</script>
