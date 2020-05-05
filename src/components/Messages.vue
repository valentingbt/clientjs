<template>
  <div class="messages">
    <ul class="chating">
      <li v-for="(message,i) in messages" :key="i + 1">[{{ message[0] }}] {{ message[2] }}</li>
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
ul {
  height: 500px;
  overflow-y: scroll;
  list-style: none;
  margin-left: 0;
  padding-left: 0;
}

.chating::-webkit-scrollbar {
  display: none;
}
</style>
