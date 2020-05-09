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
    <div v-if="users.length > 0">
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
    </div>

    <p v-if="users.length  == 0">There is no player online.</p>

    <form @submit.prevent="sendData(position)">
      <label>Change your position:</label>
      <div class="write">
        <input name="position" v-model="position" class="input" type="text" value />
        <input class="submit" type="submit" />
      </div>
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
      this.$emit("clicPos", response);
    }
  }
};
</script>

<style scoped>
.map {
  background: #47178f86;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.mapview {
  width: 100%;
  height: 500px;
  width: 500px;
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
.write {
  display: flex;
}

.write .input {
  flex: 3;
  border-radius: 4px 0px 0px 20px;
}

.write .submit {
  flex: 1;
  margin-top: 0;
  padding: 0;
  height: auto;
  border-radius: 0px 4px 20px 0px;
}
</style>
