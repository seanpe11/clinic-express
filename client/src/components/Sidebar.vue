<template>
    <div id="sidebar" class='col-2 d-none d-md-block'>
        <div id="nav" class='position-fixed' style='width: inherit;'>
            <div class="row">
              <div class="col-12 col-lg-3 my-auto mx-auto">
                <img src='@/assets/logo.png' height='60px'/>
              </div>
              <div class="col-12 col-lg-9">
                <h4>Jamalul Surgical and Medical Clinic</h4>
              </div>
            </div>

            <div v-if="name != 'null'" id="name">
                <span>Patient Name</span>
                <h3>{{ name }}</h3>
            </div>
            <div id="links">
                <div v-for="link in links" :key='link.name'>
                    <router-link :to="link.dest">{{link.name}}</router-link>
                </div>
            </div>
        </div>
        <footer class='fixed-bottom'>
          <div id="user" class='mb-4'>
            <h5><strong> Logged on as: </strong> <br/> {{ user }}</h5>
            <button class="btn btn-warning mb-3" @click="logout()">Logout</button>
          </div>
          <a href="https://github.com/jolocansana/clinic-express">Clinic Express</a> <br/>
          Made with ❤️ by JNRDS.
        </footer>
    </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    name: String,
    links: Array,
  },
  data: () => ({
    user: localStorage.getItem('fullname'),
  }),
  methods: {
    logout() {
      localStorage.removeItem('jwt');
      localStorage.removeItem('type');
      localStorage.removeItem('fullname');
      document.location.replace('/login');
    },
  },
};
</script>

<style scoped>

footer {
    font-size: 12px;
    margin: .25in;
}

#nav {
    margin: .25in;
}

#sidebar {
    height: 100vh;
}

#name {
    margin-top: .5in;
}

#user {
    margin-top: .5in;
}

#links {
    margin-top: .5in;
}
</style>
