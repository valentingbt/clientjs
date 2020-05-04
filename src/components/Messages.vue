<template>
  <div class="messages">
    <ul>
      <li v-for="(message,i) in messages" :key="i + 1">{{ message }}</li>
    </ul>
    <form @submit.prevent="sendMessage(message)">
      <label>
        Message:
        <input name="message" v-model="message" class="input" type="text" value />
      </label>
      <input class="submit" type="submit" />
    </form>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    messages: Array,
    sendMessage: Function
  },
  data() {
    return {
      message: ""
    };
  }
};
</script>

<style scoped>
</style>
