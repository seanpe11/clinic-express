<template>
  <div class="home">
    <div class="row">
      <Sidebar name="null" :links="links" />
      <div id="content" class="col-10">
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
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="patientModalLabel">Add New Patient</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <!-- patient information modal -->
                <div class="container">
                  <form>
                    <div class="form-group">
                      <label for="patientName">Name:</label>
                      <input class="form-control" type="text" name="name" v-model="name" required />
                    </div>
                    <br />
                    <div class="">
                      <div class="row">
                        <div class="col-md-3 mr-5">
                          <label for="patientAge">Age:</label>
                          <input
                            id="agebox"
                            class="form-control"
                            type="text"
                            name="patientAge"
                            v-model="age"
                            required
                          />
                        </div>
                        <div class="col-md-5">
                          <label>Sex:</label>
                          <div class="form-group">
                            <select id="inputState" class="form-control" v-model="sex">
                              <option selected>Male</option>
                              <option>Female</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div class="form-group">
                      <label for="patientAddress">Address:</label>
                      <input
                        class="form-control"
                        type="text"
                        name="patientAddress"
                        v-model="address"
                        required
                      />
                    </div>
                    <br />
                    <div class="form-group">
                      <label for="patientOccupation">Occupation:</label>
                      <input
                        class="form-control"
                        type="text"
                        name="patientOccupation"
                        v-model="occupation"
                        required
                      />
                    </div>
                    <br>
                    <div class="form-group">
                      <div class="container">
                        <div class="row text-center">
                          <h4 style="color: red;">{{ errorMessage }}</h4>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
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
              <div class="name">{{patient.name}}</div>
              <div class="lastVisit">
                Last Visit
                <br />
                {{patient.lastVisit}}
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
    age: '',
    sex: '',
    address: '',
    occupation: '',
    search: '',
    errorMessage: '',
    // replace this array to the results of a mongodb query
    links: [
      {
        name: 'Summary Statistics',
        dest: '/statistics',
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
      const newPatient = {
        name: this.name,
        age: this.age,
        sex: this.sex,
        address: this.address,
        occupation: this.occupation,
      };
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
button {
  border: none;
  background: transparent;
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

.search {
  background: #EDEDED;
  border-radius: 10px;
  padding: 0.1in 0.5in;
  margin-bottom: 0.25in;
  border-width: 0;
  width: 100%;
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
