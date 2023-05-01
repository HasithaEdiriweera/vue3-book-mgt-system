<template>
  <img class="logo" src="../assets/book_logo.png" />
  <h1>Sign Up</h1>
  <div class="register">
    <input type="text" v-model="name" placeholder="Enter Name" />
    <input type="text" v-model="email" placeholder="Enter Email" />
    <input type="password" v-model="password" placeholder="Enter Password" />
    <input
      type="password"
      v-model="confirmPassword"
      placeholder="Confirm Password"
    />
    <button v-on:click="signUp">Sign Up</button>
    <p>
      <router-link to="/login">Login</router-link>
      <span> | </span>
      <router-link to="/">Home</router-link>
    </p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SignUp",
  data() {
    return {
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
    };
  },
  methods: {
    async signUp() {
      let result = await axios.post("http://localhost:8000/api/register", {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.confirmPassword,
      });
      console.warn(result);
      if (result.status == 201) {
        localStorage.setItem("user-info", JSON.stringify(result.data));
        this.$router.push({ name: "Login" });
      }
    },
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      // this.$router.push({ name: "Home" });
    }
  },
};
</script>

<style></style>
