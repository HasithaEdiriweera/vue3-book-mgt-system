<template>
  <HeaderPage />
  <h1>Hello {{ name }} , Welocome to Update Book Page</h1>
  <el-form label-position="right" label-width="40%">
    <el-form-item label="Title : ">
      <el-input style="width: 25%" v-model="book.title"></el-input>
    </el-form-item>
    <el-form-item label="ISBN : ">
      <el-input style="width: 25%" v-model="book.isbn"></el-input>
    </el-form-item>
    <el-form-item label="Description : ">
      <el-input style="width: 25%" v-model="book.description"></el-input>
    </el-form-item>
    <el-form-item label="Publish Date : ">
      <el-input type="date" style="width: 25%" v-model="book.publish_date"></el-input>
    </el-form-item>
    <el-form-item label="Publisher : ">
      <el-input style="width: 25%" v-model="book.publisher"></el-input>
    </el-form-item>
    <el-form-item label="Price : ">
      <el-input style="width: 25%" v-model="book.price"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button style="width: 15%" type="primary" v-on:click="updateBook">Update Book</el-button>
      <el-button style="width: 9%" type="primary" @click="$router.back()" plain>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import HeaderPage from "../Header.vue";
import axios from "axios";
export default {
  name: "UpdateBook",
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
      name: "",
      token: null,
    };
  },
  methods: {
    async updateBook() {
      axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
      const result = await axios.put(
        "http://localhost:8000/api/books/" + this.$route.params.id,
        {
          title: this.book.title,
          isbn: this.book.isbn,
          description: this.book.description,
          publish_date: this.book.publish_date,
          publisher: this.book.publisher,
          price: this.book.price,
        }
      );
      if (result.status == 200) {
        this.$router.push({ name: "Home" });
      }
      console.log("res", result);
    },
  },
  async mounted() {
    let user = localStorage.getItem("user-info");
    this.name = JSON.parse(user).user.name;
    this.token = JSON.parse(user).token;
    if (!user) {
      this.$router.push({ name: "SignUp" });
    }
    const result = await axios.get(
      "http://localhost:8000/api/books/" + this.$route.params.id
    );
    this.book = result.data;
    console.log("upppp", result);
  },
};
</script>
