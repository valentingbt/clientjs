<template>
  <div class="navbar">
    <h1>Chat App</h1>
    <div v-if="isLogged" class="links">
      <div class="submit">About</div>
      <div class="submit">Contact</div>
      <div @click="logout" class="logout submit">Log out</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLogged: Boolean,
    logout: Function
  }
};
</script>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.links {
  display: flex;
}

.logout {
  background: red;
  border-radius: 5px;
}
.submit {
  padding: 7px;
  margin: 0 5px;
  filter: opacity(0.7);
  transition: 0.5s;
}

.submit:hover {
  filter: opacity(1);
}
</style>