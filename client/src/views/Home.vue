<template>
  <div class="home">
    <div class="row">
      <Sidebar name="null" :links="links" />
      <div id="content" class="col-md-10 col-12">
        <nav class="navbar navbar-expand-lg navbar-light mb-3 d-block d-md-none">
          <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
                  aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <a class="navbar-brand ml-4"><strong>Patient Envelopes</strong></a>

          <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav mr-auto mt-2 mt-md-0">
              <li class="nav-item">
                <a class="nav-link" href="/billings">View Billing Table</a>
                <a class="nav-link" href="" v-on:click="logout()">Logout</a>
              </li>
            </ul>
          </div>
        </nav>
        <!-- search field -->
        <input type="text" class="search" v-model="search" placeholder="Search patient envelopes" v-on:keyup.enter="searchQuery" />

        <!-- add new patient button -->
        <button
          type="button"
          class="mb-25"
          data-toggle="modal"
          data-target="#patientModal"
          data-whatever="@mdo"
        >
          <div class="add-btn">+ Add New Patient</div>
        </button>

        <!-- add new patient modal -->
        <div
          class="modal"
          id="patientModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="patientModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-mobile" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="patientModalLabel">Add New Patient</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <!-- patient information modal -->
                <form>
                  <div class="form-group">
                    <label for="patientName">Name:</label>
                    <input class="form-control" type="text" name="name" v-model="name" required />
                  </div>
                  <br />
                  <div class="row">
                    <div class="col-md-5">
                      <label>Sex:</label>
                      <div class="form-group">
                        <select id="inputState" class="form-control" v-model="sex">
                          <option selected>Male</option>
                          <option>Female</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-5">
                      <label>Marital Status:</label>
                      <div class="form-group">
                        <select id="inputState" class="form-control" v-model="marital_status">
                          <option selected>Single</option>
                          <option>Married</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div class="form-group">
                    <strong>Address</strong> <br>
                    <div class="row">
                      <div class="col-12 col-md-6">
                        <label for="patientStreet">Street:</label>
                        <input
                          class="form-control"
                          type="text"
                          name="patientStreet"
                          v-model="street"
                          required
                        />
                      </div>
                      <div class="col-12 col-md-3">
                        <label for="patientCity">City:</label>
                        <input
                          class="form-control"
                          type="text"
                          name="patientCity"
                          v-model="city"
                          required
                        />
                      </div>
                      <div class="col-12 col-md-3">
                        <label for="patientProvince">Province:</label>
                        <input
                          class="form-control"
                          type="text"
                          name="patientProvince"
                          v-model="province"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <br />

                  <div class="form-group">
                    <label for="patientNumber">Contact Number:</label>
                    <input
                      class="form-control"
                      type="text"
                      name="patientNumber"
                      v-model="contact_number"
                      required
                    />
                  </div>

                  <br />

                  <div class="form-group">
                    <div class="row">
                      <div class="col-12 col-md-6">
                        <label for="patientBirthday">Date of Birth:</label>
                        <input
                          class="form-control"
                          type="date"
                          name="patientBirthday"
                          v-model="date_of_birth"
                          required
                        />
                      </div>
                      <div class="col-12 col-md-6">
                        <label for="patientHeight">Height:</label>
                        <input
                          class="form-control"
                          type="text"
                          name="patientHeight"
                          v-model="height"
                          required
                        />
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
                <button type="button" class="mb-25" @click="savePatient">Save</button>
              </div>
            </div>
          </div>
        </div>

        <!-- FOR LOOP FOR PATIENT -->
        <div v-for="patient in searchQuery()" :key="patient.name">
          <!-- TODO: change :key to the patientID -->
          <router-link :to="{path: patient.link}" class="router-link">
            <div class="rectangle patient">
              <div class="row">
                <div class="name col-12 col-md-6">{{patient.name}}</div>
                <div class="lastVisit d-none d-md-block col-md-6">
                  Last Visit
                  <br />
                  {{patient.lastVisit}}
                </div>
              </div>
            </div>
          </router-link>
        </div>

        <!-- END LOOP -->
        <!-- Modal -->
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from '@/components/Sidebar.vue';
import PatientService from '../PatientService';

export default {
  name: 'Home',
  components: {
    Sidebar,
  },
  data: () => ({
    name: '',
    sex: '',
    street: '',
    city: '',
    province: '',
    date_of_birth: '',
    contact_number: '',
    marital_status: '',
    height: '',
    search: '',
    errorMessage: '',
    // replace this array to the results of a mongodb query
    links: [],
    patients: [],
    user: localStorage.getItem('fullname'),
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
      const address = {
        street: this.street,
        city: this.city,
        province: this.province,
      };
      const secAddress = {
        street: 'Default',
        city: 'Default',
        province: 'Default',
      };
      const newPatient = {
        name: this.name,
        sex: this.sex,
        address: [address, secAddress],
        date_of_birth: this.date_of_birth,
        contact_number: this.contact_number,
        marital_status: this.marital_status,
        height: this.height,
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

.modal-dialog-mobile {
  margin: 0;
  max-width: auto;
}

@media (min-width: 768px) {
  .modal-dialog-mobile {
    margin: 1.75rem auto;
    max-width: 500px;
  }
}

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

.patient > .row > .name {
  font-size: 24px;
  font-weight: bold;
}

.patient > .row > .lastVisit {
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

/* #agebox {
  width: 50px;
} */

.modal-footer > button {
  width: 100px;
  height: 25px;

  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}
</style>
