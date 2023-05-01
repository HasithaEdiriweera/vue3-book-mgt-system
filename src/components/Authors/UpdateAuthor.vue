<template>
  <HeaderPage />
  <h1>Hello {{ name }} , Update Author : {{ author.name }}</h1>

  <el-form label-position="right" label-width="40%">
    <el-form-item label="Name : ">
      <el-input style="width: 25%" v-model="author.name"></el-input>
    </el-form-item>
    <el-form-item label="Email : ">
      <el-input style="width: 25%" v-model="author.email"></el-input>
    </el-form-item>
    <el-form-item label="Phone Number : ">
      <el-input style="width: 25%" v-model="author.phone_number"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button style="width: 15%" type="primary" v-on:click="updateAuthor"
        >Update</el-button
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
  name: "UpdateAuthor",
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
      name: "",
      token: null,
    };
  },
  methods: {
    async updateAuthor() {
      axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
      const result = await axios.put(
        "http://localhost:8000/api/author/" + this.$route.params.id,
        {
          name: this.author.name,
          email: this.author.email,
          phone_number: this.author.phone_number,
        },
        {
          headers: {
            Authorization: "Bearer " + this.token,
          },
        }
      );
      if (result.status == 200) {
        this.$router.push({ name: "Authors" });
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
      "http://localhost:8000/api/author/" + this.$route.params.id
    );
    this.author = result.data;
    console.log("upppp", result);
  },
};
</script>
