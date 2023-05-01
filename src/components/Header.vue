<template>
  <div class="nav">
    <!-- <router-link to="/dashboard">Dashboard</router-link> -->
    <div>
      <router-link to="/">Home</router-link>
      <router-link to="/authors">Authors</router-link>
      <div v-if="admin">
        <!-- <router-link to="/add">Add Book</router-link> -->
        <a v-on:click="logout" href="#">Logout</a>
      </div>
      <router-link to="/login">Login</router-link>
      <div v-if="admin">
        <router-link to="/sign-up">Register</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HeaderPage",
  data() {
    return {
      admin: null,
      token: null,
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
    async loadData() {
      let user = localStorage.getItem("user-info");
      this.admin = user;
      if (!user) {
        // this.$router.push({ name: "Home" });
      } else {
        this.name = JSON.parse(user).user.name;
        this.token = JSON.parse(user).token;
      }
      let result = await axios.get("http://localhost:8000/api/books");
      this.books = result.data;
    },
  },
  async mounted() {
    this.loadData();
  },
};
</script>

<style>
.nav {
  background-color: #333;
  overflow: hidden;
}
.nav a {
  float: left;
  color: #f2f2f2f2;
  padding: 14px 16px;
  text-align: center;
  font-size: 17px;
  text-decoration: none;
  margin-left: 5px;
}
.nav a:hover {
  background: #ddd;
  color: #333;
}
</style>
