<template>
  <router-view />
</template>

<script>
// import SignUp from './components/SignUp.vue'
export default {
  name: "App",
  // components: {
  //   SignUp
  // }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  padding: 0;
  margin: 0;
}
.logo {
  width: 100px;
}
.register input,
.login input,
.add input {
  width: 300px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin-bottom: 30px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid skyblue;
}
.register button,
.login button,
.add button {
  width: 320px;
  height: 40px;
  border: 1px solid skyblue;
  background: skyblue;
  color: #fff;
  cursor: pointer;
}

button[type="btn"] {
  padding: 0.5rem;
  border-radius: 3px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}
button[type="submit"]:hover {
  background-color: #0069d9;
}
</style>
