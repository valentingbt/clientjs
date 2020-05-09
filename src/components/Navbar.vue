<template>
  <div :class="{middle : !isLogged}" class="navbar">
    <h1>Chat App</h1>
    <div v-if="isLogged" class="links">
      <router-link to="/">
        <div class="submit">Home</div>
      </router-link>
      <router-link to="/about">
        <div class="submit">About</div>
      </router-link>
      <router-link to="/contact">
        <div class="submit">Contact</div>
      </router-link>
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
.middle {
  justify-content: center;
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