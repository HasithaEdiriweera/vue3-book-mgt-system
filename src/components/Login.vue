<template>
  <h1>Login Page</h1>
  <div class="login">
    <input type="text" v-model="email" placeholder="Enter Email" @input="resetSessionTimer" />
    <div v-if="emailError" class="error">*{{ emailError }}</div>
    <input type="password" v-model="password" placeholder="Enter Password" @input="resetSessionTimer" />
    <div v-if="passwordError" class="error">*{{ passwordError }}</div>
    <button v-on:click="login">Login</button>
    <p><router-link to="/">Home</router-link></p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      sessionTimeout: null,
    };
  },
  methods: {
    async login() {
      // Validate email
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      const minPasswordLength = 6;

      this.emailError = !this.email ? "Email is required" : "";
      this.passwordError = !this.password ? "Password is required" : "";

      if (!this.email.match(emailRegex)) {
        this.emailError = "Invalid email format";
        return;
      }
      // Validate password
      if (this.password.length < minPasswordLength) {
        this.passwordError = `Password must be at least ${minPasswordLength} characters long`;
        return;
      }
      try {
        // Make API request to login
        const result = await axios.post("http://localhost:8000/api/login", {
          email: this.email,
          password: this.password,
        });
        // Handle response from server
        if (result.status === 201) {
          const userInfo = result.data ? JSON.stringify(result.data) : "user";
          this.resetSessionTimer();
          localStorage.setItem("user-info", userInfo);
          this.$router.push({ name: "Home" });
        }
      } catch (error) {
        // Handle login error
        this.emailError = "Invalid email or password";
        this.passwordError = "Invalid email or password";
      }
    },
    logout() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
    startSessionTimer() {
      this.sessionTimeout = setTimeout(() => {
        this.logout();
      }, 7200 * 1000); // 2 hours
    },
    resetSessionTimer() {
      clearTimeout(this.sessionTimeout);
      this.startSessionTimer();
    },
  },
  mounted() {
    this.startSessionTimer();
    let user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>

<style>
.error {
  color: red;
}
</style>
