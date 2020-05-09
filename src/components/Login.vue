<template>
  <div class="login">
    <div class="form">
      <h2>Connection</h2>

      <form action @submit.prevent="loginUser(user)">
        <div class="form-input">
          <label>Login</label>
          <input name="login" v-model="user.login" class="input" type="text" value />
        </div>

        <div class="form-input">
          <label>Password</label>
          <input name="password" v-model="user.password" class="input" type="password" value />
        </div>

        <div class="form-input">
          <input class="submit" type="submit" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  props: {
    loginUser: Function
  },
  data() {
    return {
      user: {
        login: "",
        password: ""
      }
    };
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  display: flex;
  justify-content: center;
}
.form {
  width: 500px;
}
</style>
