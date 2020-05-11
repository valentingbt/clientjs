<template>
  <div class="index">
    <Navbar :logout="logout" :isLogged="isLogged" />

    <div v-if="!isLogged" class="logreg">
      <div class="selector">
        <div :class="{ active : loginSelect }" @click="loginSelect = true">Login</div>
        <div :class="{ active : !loginSelect }" @click="loginSelect = false">Register</div>
      </div>
      <Login v-if="loginSelect" :loginUser="login" />
      <Register
        v-if="!loginSelect"
        :registerUser="register"
        :response="registerResponse"
        class="register"
      />
      {{errors[0]}}
    </div>

    <div class="chat" v-if="isLogged">
      <Messages :sendMessage="sendMessage" :messages="messages" />

      <Map :sendData="sendPosition" :users="users"></Map>
    </div>
  </div>
</template>

<script>
const ws = new WebSocket("wss://backend.cleverapps.io");
import Login from "../components/Login";
import Register from "../components/Register";
import Messages from "../components/Messages";
import Map from "../components/Map";
import Navbar from "../components/Navbar";

import axios from "axios";

export default {
  name: "App",
  components: {
    Login,
    Register,
    Messages,
    Map,
    Navbar
  },
  data() {
    return {
      errors: [],
      messages: [],
      users: [],
      isLogged: false,
      ticketResponse: "",
      registerResponse: "",
      loginSelect: true
    };
  },
  methods: {
    async login(user) {
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
        .post(`https://backend.cleverapps.io/subscribe`, {
          username: user.login,
          email: user.email,
          password: user.password
        })
        .then(response => {
          console.log(response);
          this.registerResponse = response.data;
        })
        .catch(err => {
          this.errors.push(err);
        });
    },
    logout() {
      console.log("loging out");
      axios
        .post(`https://backend.cleverapps.io/logout`, { withCredentials: true })
        .then(response => {
          console.log(response);
          this.isLogged = false;
          this.ticketResponse = "";
        })
        .catch(err => {
          this.errors.push(err);
        });
      ws.close();
      this.getStatus();
    },
    getStatus() {
      let status = "hey";
      console.log("getting status");
      axios
        .get(`https://backend.cleverapps.io/status`, { withCredentials: true })
        .then(response => {
          console.log(response.data);
          status = response.data;
          status.includes("Bonjour")
            ? (this.isLogged = true)
            : (this.isLogged = false);
        })
        .catch(err => {
          this.errors.push(err);
        });
      console.log(this.isLogged);
      // console.log(status);

      // if (status.includes("Bonjour")) {
      //   this.isLogged = true;
      // } else {
      //   this.isLogged = false;
      // }
    },
    sendMessage(message) {
      ws.send("msg:" + message);
    },
    sendPosition(message) {
      ws.send("mov:" + message);
    }
  },
  mounted() {
    // this.getStatus();
    // We declare the variables we will be able to modify in WS function
    let messages = [];
    let users = [];
    // We listen if there is messages in the WS
    ws.onmessage = function(msg) {
      let response = msg.data; // We get the content of the response
      let responseArray = response.split(":"); // The response is changed to an array
      console.log(responseArray);

      // ResponseArray[0] -> Name of the user
      // ResponseArray[1] -> Type of the response
      // ResponseArray[2] -> Content of the response

      if (!responseArray[1] || responseArray[1].replace(/\s/g, "") == "msg") {
        // If the type of the response exists and is "msg", we push it to the 'messages' array

        messages.push(responseArray);
      }
      if (responseArray[1] && responseArray[1].replace(/\s/g, "") == "mov") {
        // If the type of the response exists and is "mov"

        // This variable returns 'true' if the user already exists in the 'users' array
        let userExists = users.some(function(el) {
          return el.username === responseArray[0];
        });
        let posxy = responseArray[2].split(","); // We split the content in a new array
        if (userExists) {
          // If the user already exists
          // We find the index of this user in the 'users' array
          let objIndex = users.findIndex(
            obj => obj.username == responseArray[0]
          );
          // And update his x and y position
          users[objIndex].x = posxy[0];
          users[objIndex].y = posxy[1];
        } else {
          // If the user doesn't exist, we create it
          let user = {
            username: responseArray[0],
            x: posxy[0],
            y: posxy[1]
          };
          // We push the new user in the 'users' array
          users.push(user);
        }
      }
    };
    // Update data variables
    this.messages = messages;
    this.users = users;
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans:400,700&display=swap");

body {
  width: 100%;
  height: 100vh;
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

.chat {
  display: flex;
  border-radius: 30px;
  overflow: hidden;
  height: 700px;
}

.messages,
.map {
  flex: 1;
}
</style>