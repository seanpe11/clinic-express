<template>
  <div class="home">
    <div class="row">
      <Sidebar name="null" :links="links" />
      <div id="content" class="col-10">
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
                      <input class="form-control" type="text" name="firstname" v-model="first_name" required />
                    </div>

                    <div class="col-md-5">
                      <label>Last Name:</label>
                      <input class="form-control" type="text" name="lastname" v-model="last_name" required />
                    </div>
                  </div>
                  <br />

                  <div class="form-group">
                    <label for="username">Username:</label>
                    <input
                      class="form-control"
                      type="text"
                      name="username"
                      v-model="username"
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
                          v-model="password"
                          required
                        />
                      </div>
                      <div class="col-12 col-md-6">
                        <label for="accountType">Type of Account:</label>
                        <div class="form-group">
                        <select id="inputState" class="form-control" v-model="isAdmin">
                          <option selected>User</option>
                          <option>Admin</option>
                        </select>
                      </div>
                      </div>
                    </div>
                  </div>
                  <br>
                  <div class="form-group" v-if="errorMessage">
                    <div class="row text-center">
                      <h4 style="color: red;">{{ errorMessage }}</h4>
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="mb-25" data-dismiss="modal">Close</button>
                <button type="button" class="mb-25" @click='savePatient'>Save</button>
              </div>
            </div>
          </div>
        </div>

        <!-- FOR LOOP FOR PATIENT -->
          <div v-for="patient in searchQuery()" :key="patient.name">
          <!-- TODO: FIX FONT-->
            <div class="rectangle patient">
            <div data-toggle="modal"
            data-target="#infoModal"
            data-whatever="@mdo">
              <div class="name">{{patient.name}}</div>
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
                    <tr><td class='header'>First Name:</td><td>First</td></tr>
                    <br>
                    <tr><td class='header'>Last Name:</td><td>Last</td></tr>
                    <br>
                    <tr><td class='header'>Username:</td><td>username@gmail.com</td></tr>
                    <br>
                    <tr><td class='header'>Password:</td><td>pw</td></tr>
                  </div>
                  <br>
                  <div class="form-group" v-if="errorMessage">
                    <div class="row text-center">
                      <h4 style="color: red;">{{ errorMessage }}</h4>
                    </div> 
                  </div>
                </form>

              </div>
              <div class="modal-footer">
              <!-- TO DO: @CLICK -->
                <button type="button" class="mb-25">Delete</button>
                <button type="button" class="mb-25">Edit</button>
              </div>

                          <!--EDIT ACCOUNT TO HIDE/SHOW-->
<!--
              // Edit Account Info
              <div class="modal-content" id="editAccountInfo">
              <div class="modal-header">
               <h5 class="modal-title" id="infoModalLabel">Edit Account Information</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="row">
                    <tr><td class='header'>First Name:</td><td><input type="text" v-model="user.first_name"/></td></tr>
                    <br>
                    <tr><td class='header'>Last Name:</td><td><input type="text" v-model="user.last_name"/></td></tr>
                    <br>
                    <tr><td class='header'>Username:</td><td><input type="text" v-model="user.username"/></td></tr>
                    <br>
                    <tr><td class='header'>Password:</td><td><input type="text" v-model="user.password"/></td></tr>
                  </div>
                  <br>
                  <div class="form-group" v-if="errorMessage">
                    <div class="row text-center">
                      <h4 style="color: red;">{{ errorMessage }}</h4>
                    </div> 
                  </div>
                </form>

              </div>
              <div class="modal-footer">
              // TO DO: @CLICK
                <button type="button" class="mb-25">Cancel</button>
                <button type="button" class="mb-25">Save</button>
              </div>
            </div> -->

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
import PatientService from '../PatientService';

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
    // replace this array to the results of a mongodb query
    links: [
      {
        name: 'Accounts',
        dest: '/admin',
      },
      {
        name: 'Billing',
        dest: '/billing',
      },
    ],
    patients: [],
  }),
  async created() {
    try {
      this.patients = await PatientService.getPatients(this.search);
    } catch (err) {
      alert('error');
    }
  },
  methods: {
    async savePatient() {
      this.errorMessage = '';
      const newAccount = {
        first_name: this.first_name,
        last_name: this.last_name,
        username: this.username,
        password: this.password,
        isAdmin: this.isAdmin,
      };
      console.log(newPatient);
      PatientService.createPatient(newPatient).then(() => {
        document.location.reload();
      }).catch((err) => {
        if (err.response.status) {
          this.errorMessage = err.response.data;
        }
      });
    },
    searchQuery() {
      try {
        if (this.search) {
          return this.patients.filter((item) => this.search.toLowerCase().split(' ').every((v) => item.name.toLowerCase().includes(v)));
        }
      } catch (err) {
        alert('error');
      }
      return this.patients;
    },
  },
};
</script>

<style scoped>
.router-link {
  text-decoration: none;
  color: black;
}
.patient {
  text-align: left;
  margin-bottom: 0.25in;
}

.rectangle:hover {
  box-shadow: none;
}

.patient > .name {
  font-size: 24px;
  float: left;
  font-weight: bold;
}

.patient > .lastVisit {
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
