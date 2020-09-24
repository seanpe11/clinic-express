<template>
  <div class="login">
    <div class="row h-100">
      <div class="container mx-auto my-auto">
        <div class="row h-100">
          <div class="d-none d-md-block col-md-6 side">side</div>
          <div class="col-12 col-md-6 login-content my-auto">
            <div class="login-body mx-auto">
              <h1>LOGIN</h1>
              <input class="form-control mb-3" type="text" placeholder="Username" v-model='username'>
              <input class="form-control mb-3" type="password" placeholder="Password" v-model='password'>
              <div class="row mb-3">
                <span id='errorMsg' style='color: red; font-size: 12px;'></span>
              </div>
              <div class="row mb-3 text-center" v-if="errorMessage">
                <p>{{ errorMessage }}</p>
              </div>
              <button type="button" class="btn btn-success mb-3" @click="login()">Login</button> <!-- add @click here to do login process -->
              <div class="row">
                <span style='color: grey; font-size: 12px;'>Contact admin if you forgot your <br> username or password</span>
              </div>
              <div class="row mt-3">
                <span style='color: grey; font-size: 12px;'>Sample User: <br> username: <strong>johndoe</strong> or password: <strong>password</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginService from '../LoginService';

export default {
  name: 'PatientEnvelope',
  data: () => ({
    username: '',
    password: '',
    errorMessage: null,
    // data here
  }),
  methods: {
    login() {
      this.errorMessage = null;
      const body = {
        username: this.username,
        password: this.password,
      };

      LoginService.login(body)
        .then(() => {
          const user = localStorage.getItem('isAdmin');
          console.log('user is: ', user);
          if (user === true) document.location.replace('/admin');
          else document.location.replace('/');
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 400) this.errorMessage = err.response.data;
          }
        });
    },
  },
  // TODO: When there is an error, change text of #errorMsg
  // TODO: When account is admin route to admin pages, if account is not admin, route to landing page (search)
  // Check https://www.notion.so/Vue-Sessions-f4de4e64a9e84c22b2eedb32b8e88567 for Vue Session
};
</script>

<style>
.login {
  height: 100vh;
}

.container {
  height: 60%;
  width: 60%;
  background: white;
  border-radius: 20px;
}

.side {
  background: grey;
  border-radius: 20px 0 0 20px;
}

.login-body {
  width: 70%;
}

p {
  color: red;
  margin: 0px;
}
</style>
