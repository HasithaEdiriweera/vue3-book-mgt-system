<template>
  <div v-if="showTimeoutModal">
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <h2>Your session has timed out</h2>
      <p>Please log in again to continue.</p>
      <button @click="handleConfirm">Log in</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showTimeoutModal: false,
    };
  },
  methods: {
    handleTimeout() {
      this.showTimeoutModal = true;
    },
    handleConfirm() {
      // redirect to login screen
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.modal-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  z-index: 1000;
  text-align: center;
}
</style>
