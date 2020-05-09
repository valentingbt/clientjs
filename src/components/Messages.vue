<template>
  <div class="messages">
    <ul class="chating">
      <li v-for="(message,i) in messages" :key="i + 1">[{{ message[0] }}] {{ message[2] }}</li>
    </ul>
    <form @submit.prevent="sendMessage(message);message =''">
      <label>Message:</label>

      <div class="write">
        <input name="message" v-model="message" class="input" type="text" value />
        <input class="submit" type="submit" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Message",
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
.messages {
  background: #46178f;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
ul {
  overflow-y: scroll;
  list-style: none;
  margin-left: 0;
  padding-left: 0;
}


.chating::-webkit-scrollbar {
  display: none;
}

.write {
  display: flex;
}

.write .input {
  flex: 3;
  border-radius: 4px 0px 0px 4px;
}

.write .submit {
  flex: 1;
  margin-top: 0;
  padding: 0;
  height: auto;
  border-radius: 0px 4px 20px 0px;
}
</style>
