<template>
  <div class="map">
    <div class="mapview" @click="getPos">
      <div
        :style="'left:' + user.x + 'px;' + 'top:' + user.y + 'px'"
        v-for="(user,i) in users"
        :key="i + 1"
        class="userblock"
      >{{user.username}}</div>
    </div>
    <p>There is {{users.length}} players online:</p>
    <ul>
      <li v-for="(user,i) in users" :key="i + 1">
        <div>
          <div>{{user.username}}</div>
          <div>x : {{user.x}}</div>
          <div>y : {{user.y}}</div>
        </div>
      </li>
    </ul>
    <form @submit.prevent="sendData(position)">
      <label>
        Changez votre position:
        <input
          name="position"
          v-model="position"
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
    users: Array,
    sendData: Function
  },
  data() {
    return {
      position: "0,0"
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
