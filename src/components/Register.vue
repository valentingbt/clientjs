<template>
  <div class="register">
    <div class="form">
      <h2>Inscription</h2>
      <form v-if="response != 'OK'" action @submit.prevent="registerUser(user)">
        <div class="form-input">
          <label>Login</label>
          <input name="login" v-model="user.login" class="input" type="text" value />
        </div>

        <div class="form-input">
          <label>E-mail</label>
          <input name="email" v-model="user.email" class="input" type="email" value />
        </div>

        <div class="form-input">
          <label>Password</label>
          <input name="password" v-model="user.pasword" class="input" type="password" value />
        </div>

        <div class="form-input">
          <input class="submit" type="submit" />
        </div>
      </form>
      <div v-if="response == 'OK'">Your account has been created, you can now log in!</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    registerUser: Function,
    response: String
  },
  data() {
    return {
      user: {
        login: "",
        email: "",
        password: ""
      }
    };
  }
};
</script>

<style scoped>
.register {
  width: 500px;
}
</style>
