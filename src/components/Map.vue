<template>
  <div class="map">
    <div class="mapview" @click="getPos">
      <div
        :style="'left:' + message.x + 'px;' + 'top:' + message.y + 'px'"
        v-for="(message,i) in messages"
        :key="i + 1"
        class="userblock"
      >{{message.username}}</div>
    </div>
    <p>There is {{messages.length}} players online:</p>
    <ul>
      <li v-for="(message,i) in messages" :key="i + 1">
        <div>
          <div>{{message.username}}</div>
          <div>x : {{message.x}}</div>
          <div>y : {{message.y}}</div>
        </div>
      </li>
    </ul>
    <form @submit.prevent="sendMessage(message)">
      <label>
        Changez votre position:
        <input
          name="message"
          v-model="message"
          class="input"
          type="text"
          value
        />
      </label>
      <input class="submit" type="submit" />
    </form>
  </div>
</template>

<script>
export default {
  name: "Map",
  props: {
    messages: Array,
    sendMessage: Function
  },
  data() {
    return {
      message: ""
    };
  },
  methods: {
    getPos(event) {
      console.log(event.pageX - 400);
      console.log(event.pageY - 70);
      let response = "mov:" + event.pageX + "," + event.pageY;
      this.$emit('clicPos',response);
    }
  }
};
</script>

<style scoped>
.mapview {
  width: 100%;
  height: 500px;
  width: 500px;
  background: white;
}
.userblock {
  position: relative;
  width: 100px;
  top: 0px;
  left: 0px;
  transition: 1s;
  background: #864cbf;
  padding: 10px;
  border-radius: 10px;
}
ul {
  list-style: none;
  margin-left: 0;
  padding-left: 0;
  display: flex;
  justify-content: space-around;
}

li {
  background: #864cbf;
  width: 100px;
  border-radius: 10px;
  padding: 10px;
}
</style>
