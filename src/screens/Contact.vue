<template>
  <div>
    <Navbar :isLogged="true" />
    <h1>About</h1>
    <p>This is a 'Contact' page.</p>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
export default {
  components: {
    Navbar
  }
};
</script>

<style>
</style>