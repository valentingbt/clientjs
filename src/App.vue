<template>
  <div id="app">
    <h1>Chat App</h1>
    <div class="logreg">
      <div class="selector">
        <div :class="{ active : loginSelect }" @click="loginSelect = true">Login</div>
        <div :class="{ active : !loginSelect }" @click="loginSelect = false">Register</div>
      </div>
      <Login v-if="loginSelect" :loginUser="login" />
      <Register v-if="!loginSelect" :registerUser="register" class="register" />
      {{errors[0]}}
      {{ticketResponse}}
    </div>
    <div v-if="isLogged">
      <Messages :sendMessage="send" :messages="messages" />
    </div>
  </div>
</template>

<script>
const ws = new WebSocket("wss://backend.cleverapps.io");
import Login from "./components/Login";
import Register from "./components/Register";
import Messages from "./components/Messages";

import axios from "axios";

export default {
  name: "App",
  components: {
    Login,
    Register,
    Messages
  },
  data() {
    return {
      errors: [],
      messages: ["Hello"],
      isLogged: false,
      ticketResponse: "",
      hello: "",
      loginSelect: true
    };
  },
  methods: {
    async login(user) {
      // let loginResponse = "";
      const axiosCredentials = axios.create({
        withCredentials: true
      });
      await axiosCredentials;
      const loginResponse = axiosCredentials
        .post(`https://backend.cleverapps.io/login`, {
          username: user.login,
          password: user.password
        })
        .then(response => {
          console.log("Response :");
          console.log(response.data);
          // loginResponse = response.data;
        })
        .catch(err => {
          this.errors.push(err);
        });
      await loginResponse;
      axiosCredentials
        .get("https://backend.cleverapps.io/wsTicket")
        .then(data => {
          console.log(data.data);
          this.ticketResponse = data.data;
          ws.send(this.ticketResponse);
          this.isLogged = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    register(user) {
      console.log("data received");
      axios
        .post(`https://backend.cleverapps.io/register`, {
          username: user.login,
          email: user.email,
          password: user.password
        })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          this.errors.push(err);
        });
    },
    send(message) {
      ws.send(message);
    }
  },
  mounted() {
    let messages = [];
    ws.onmessage = function(msg) {
      let response = msg.data;
      messages.push(response);
    };
    this.messages = messages;

    console.log(messages);
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans:400,700&display=swap");

::-webkit-scrollbar {
  width: 2px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

body {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  font-family: "Josefin Sans", sans-serif;
  text-align: center;
  margin: 0;
  background-color: #25076b;
  color: white;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  color: white;
}
.logreg {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.selector {
  width: 500px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.selector div {
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
}

.active {
  background-color: #864cbf;
}

.form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

form {
  width: 100%;
}

.form-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

input {
  background-color: #864cbf;
  border-radius: 4px;
  border: 0px;
  transition: 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 100%;
  height: 45px;
  text-align: center;
  font-family: "Josefin Sans", sans-serif;
  font-weight: 700;
}

input label {
  margin-bottom: 50px;
}

input:hover {
  background-color: #c2a5df;
  color: black;
  outline: none;
}

input:focus {
  background-color: white;
  color: black;
}

.submit {
  cursor: pointer;
  margin-top: 10px;
}
</style>
