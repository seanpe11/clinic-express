/* eslint-disable no-underscore-dangle */
<template>
  <div class="home">
    <div class="row">
      <Sidebar name="null" :links="links" />
      <div id="content" class="col-12 col-md-10">
        <nav class="navbar navbar-expand-lg navbar-light mb-3 d-block d-md-none">
          <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
                  aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <a class="navbar-brand ml-4"><strong>System Accounts</strong></a>

          <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav mr-auto mt-2 mt-md-0">
              <li class="nav-item">
                <a class="nav-link" href="" v-on:click="logout()">Logout</a>
              </li>
            </ul>
          </div>
        </nav>
        <!-- search field -->
        <input type="text" class="search" v-model="search" placeholder="Search accounts" v-on:keyup.enter="searchQuery" />

        <!-- add new account button -->
        <button
          type="button"
          class="mb-25"
          data-toggle="modal"
          data-target="#accountModal"
          data-whatever="@mdo"
        >
          <div class="add-btn">+ Add Account</div>
        </button>

        <!-- add new account modal -->
        <div
          class="modal"
          id="accountModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="accountModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="accountModalLabel">Add New Account</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <!-- account information modal -->
                <form>
                  <div class="row">
                    <div class="col-md-5">
                      <label>First Name:</label>
                      <input class="form-control" type="text" name="firstname" v-model="new_user.first_name" required />
                    </div>

                    <div class="col-md-5">
                      <label>Last Name:</label>
                      <input class="form-control" type="text" name="lastname" v-model="new_user.last_name" required />
                    </div>
                  </div>
                  <br />

                  <div class="form-group">
                    <label for="username">Username:</label>
                    <input
                      class="form-control"
                      type="text"
                      name="username"
                      v-model="new_user.username"
                      required
                    />
                  </div>

                  <br />

                  <div class="form-group">
                    <div class="row">
                      <div class="col-12 col-md-6">
                        <label for="password">Password:</label>
                        <input
                          class="form-control"
                          type="password"
                          name="password"
                          v-model="new_user.password"
                          required
                        />
                      </div>
                      <div class="col-12 col-md-6">
                        <label for="accountType">Is Admin:</label>
                        <div class="form-group">
                        <input type="checkbox" class="form-checkbox" v-model="new_user.isAdmin">
                      </div>
                      </div>
                    </div>
                  </div>
                  <br>
                  <div class="form-group" v-if="errorMessage">
                    <div class="row text-center">
                      <h4 class="text-danger">{{ errorMessage }}</h4>
                    </div>
                  </div>
                  <div class="form-group" v-if="successMessage">
                    <div class="row text-center">
                      <h4 class="text-success">{{ successMessage }}</h4>
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="mb-25" data-dismiss="modal">Close</button>
                <button type="button" class="mb-25" @click="addUser">Add</button>
              </div>
            </div>
          </div>
        </div>

        <!-- FOR LOOP FOR PATIENT -->
          <div v-for="user in users" :key="user.username">
          <!-- TODO: FIX FONT-->
            <div class="rectangle user" @click="setModal(user)">
            <div data-toggle="modal"
            data-target="#infoModal"
            data-whatever="@mdo">
              <div class="name">{{user.first_name}} {{user.last_name}}</div>
              <div>Username: {{user.username}}</div>
            </div>
            </div>
        </div>
        <!-- END LOOP -->

        <!-- Modal -->
        <div
          class="modal"
          id="infoModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="infoModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <!-- account information modal -->
                <form>
                  <div class="row">
                  <!--TO DO: {{ user.first_name }}-->
                  <div id="userInfo" v-if="!editing">
                    <tr><td class='header'>First Name:</td><td>{{modaluser.first_name}}</td></tr>
                    <br>
                    <tr><td class='header'>Last Name:</td><td>{{modaluser.last_name}}</td></tr>
                    <br>
                    <tr><td class='header'>Username:</td><td>{{modaluser.username}}</td></tr>
                    <br>
                    <tr><td class='header'>Is Admin:</td><td><input type="checkbox" v-model="modaluser.isAdmin" disabled></td></tr>
                  </div>
                  <div id="userInfo" v-else>
                    <tr><td class='header'>First Name:</td><td><input type="text" v-model="edituser.first_name"></td></tr>
                    <br>
                    <tr><td class='header'>Last Name:</td><td><input type="text" v-model="edituser.last_name"></td></tr>
                    <br>
                    <tr><td class='header'>Username:</td><td><input type="text" v-model="edituser.username"></td></tr>
                    <br>
                    <tr><td class='header'>Password:</td><td><input type="text" v-model="edituser.password"></td></tr>
                    <br>
                    <tr><td class='header'>Is Admin:</td><td><input type="checkbox" v-model="edituser.isAdmin"></td></tr>
                  </div>
                  </div>
                  <br>
                  <div class="form-group" v-if="errorMessage">
                    <div class="row text-center">
                      <h4 class="text-danger">{{ errorMessage }}</h4>
                    </div>
                  </div>
                  <div class="form-group" v-if="successMessage">
                    <div class="row text-center">
                      <h4 class="text-success">{{ successMessage }}</h4>
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer" v-if="!editing">
                <button type="button" class="mb-25" @click="deleteUser">Delete</button>
                <button type="button" class="mb-25" @click="edittoggle">Edit</button>
              </div>
              <div class="modal-footer" v-else>
                <button type="button" class="mb-25" @click="saveedit">Save</button>
                <button type="button" class="mb-25" @click="edittoggle">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from '@/components/Sidebar.vue';
import AdminService from '../AdminService';

export default {
  name: 'Admin',
  components: {
    Sidebar,
  },
  data: () => ({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    isAdmin: '',
    search: '',
    errorMessage: '',
    successMessage: '',
    // replace this a.rray to the results of a mongodb query
    links: [
      // {
      //   name: 'Accounts',
      //   dest: '/admin',
      // },
    ],
    users: [],
    modaluser: {},
    new_user: {},
    edituser: {},
    editing: false,
  }),
  async created() {
    this.loadUsers();
  },
  methods: {
    async loadUsers() {
      try {
        this.users = await AdminService.getUsers();
      } catch (err) {
        this.errorMessage(err);
      }
    },
    async addUser() {
      AdminService.addUser(this.new_user)
        .then((res) => {
          this.editing = false;
          this.successMessage = res.data;
          document.location.reload();
        })
        .catch((err) => {
          this.errorMessage = err;
        });
    },
    searchQuery() {
      try {
        if (this.search) {
          return this.user.filter((item) => this.search.toLowerCase().split(' ').every((v) => item.name.toLowerCase().includes(v)));
        }
      } catch (err) {
        this.errorMessage = err;
      }
      return this.user;
    },
    logout() {
      localStorage.removeItem('jwt');
      localStorage.removeItem('type');
      localStorage.removeItem('fullname');
      document.location.replace('/login');
    },
    setModal(user) {
      this.modaluser = user;
      this.successMessage = '';
      this.errorMessage = '';
    },
    edittoggle() {
      const user = {}; // for cancel purposes. for some reason, this.edituser = this.modaluser creates a binding.
      user.first_name = this.modaluser.first_name;
      user.last_name = this.modaluser.last_name;
      user.username = this.modaluser.username;
      user.isAdmin = this.modaluser.isAdmin;
      user._id = this.modaluser._id;
      this.edituser = user;
      this.editing = !this.editing;
    },
    saveedit() {
      this.editing = false;
      AdminService.editUser(this.edituser)
        .then((res) => {
          this.successMessage = res.data;
        })
        .catch((err) => {
          this.errorMessage = err;
        });
      this.setModal(this.edituser);
      this.loadUsers();
    },
    deleteUser() {
      const user = {};
      user._id = this.modaluser._id;
      AdminService.deleteUser(user._id)
        .then((res) => {
          console.log(res.data);
          document.location.reload();
        })
        .catch((err) => {
          this.errorMessage = err;
        });
    },
  },
};
</script>

<style scoped>
.home {
  height: 100vh !important;
}

.router-link {
  text-decoration: none;
  color: black;
}
.user {
  text-align: left;
  margin-bottom: 0.25in;
}

.rectangle:hover {
  box-shadow: none;
}

.name {
  font-size: 18px;
  font-weight: bold;
}

.user > .lastVisit {
  font-size: 12px;
  text-align: right;
  color: #737373;
}

#content {
  padding: 0.25in 0.5in;
}

/* Modal style */

.modal-title {
  font-style: normal;
  font-weight: bold;
  line-height: 35px;
  display: flex;
  align-items: center;

  color: #000000;
}

.modal-content {
  background: #f1f1f1;
}

/* .modal-body {
  width: 500px;
  height: 225px;
} */

.radiospacing {
  margin-left: 0.5in;
}

.inputbox {
  width: 337px;
  height: 30px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 0px;
  border-radius: 10px;
}

.header {
  width: 2in;
  font-weight: bold;
}

.modal-footer > button {
  width: 100px;
  height: 25px;

  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}
</style>
