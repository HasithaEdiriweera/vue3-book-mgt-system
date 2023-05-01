<template>
  <HeaderPage />
  <h1>Hello {{ name }} , Welocome to Add New Author Page</h1>
  <el-form label-position="right" label-width="40%">
    <el-form-item label="Name : ">
      <el-input
        style="width: 25%"
        v-model="author.name"
        placeholder="Enter Name"
      ></el-input>
    </el-form-item>
    <el-form-item label="Email : ">
      <el-input
        type="email"
        style="width: 25%"
        v-model="author.email"
        placeholder="Enter Email"
      ></el-input>
    </el-form-item>
    <el-form-item label="Phone Number : ">
      <el-input
        style="width: 25%"
        v-model="author.phone_number"
        placeholder="Enter Phone Number"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button style="width: 15%" type="primary" v-on:click="addAuthor"
        >Add New Author</el-button
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
  name: "AddAuthor",
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
    };
  },
  methods: {
    async addAuthor() {
      axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
      const result = await axios.post("http://localhost:8000/api/author", {
        name: this.author.name,
        email: this.author.email,
        phone_number: this.author.phone_number,
      });
      if (result.status == 200) {
        this.$router.push({ name: "Authors" });
      }
      console.log("res", result);
    },
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    this.name = JSON.parse(user).user.name;
    this.token = JSON.parse(user).token;
    // if (!user) {
    //   this.$router.push({ name: "SignUp" });
    // }
  },
};
</script>
