<template>
  <div class="patient">
    <div class="row">
      <Sidebar :name='patient.name' :links='links'/>
      <div id="content" class='col-12 col-md-10'>
        <nav class="navbar navbar-expand-lg navbar-light mb-3 d-block d-md-none">
          <div class="row">
            <button class="navbar-toggler navbar-toggler-right col-2" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
                    aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <a class="col-10 my-auto"><strong>{{patient.name}}</strong></a>
          </div>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav mr-auto mt-2 mt-md-0">
              <li class="nav-item">
                <a class="nav-link" href="" v-on:click="logout()">Logout</a>
              </li>
            </ul>
          </div>
        </nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/">Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">Patient Envelope</li>
        </ol>
        <!-- Basic Information -->
        <div class="rectangle mb-25" id="patientInfo">
          <h3>
            Basic Information
          </h3>
          <div class="mt-3">
            <div class='row mb-2'>
              <div class="col-12 col-md-3"><strong>Name</strong></div>
              <div class="col-12 col-md-9">{{patient.name}}</div>
            </div>
            <div class='row mb-2'>
              <div class="col-12 col-md-3"><strong>Sex</strong></div>
              <div class="col-12 col-md-9">{{patient.sex}}</div>
            </div>
            <div class='row mb-2'>
              <div class="col-12 col-md-3"><strong>Age</strong></div>
              <div class="col-12 col-md-9">{{computeAge(patient.date_of_birth)}}</div>
            </div>
            <div class='row mb-2' v-for='(address, index) in patient.address' :key='address._id'>
              <div class="col-12 col-md-3"><strong>Address {{index+1}}</strong></div>
              <div class="col-12 col-md-9">{{address.street}}, {{address.city}}, {{address.province}}</div>
            </div>
            <div class='row mb-2'>
              <div class="col-12 col-md-3"><strong>Date of Birth</strong></div>
              <div class="col-12 col-md-9">
                {{getStringMonth(new Date(patient.date_of_birth).getMonth())}} {{new Date(patient.date_of_birth).getDate()}}, {{new Date(patient.date_of_birth).getFullYear()}}
              </div>
            </div>
            <div class='row mb-2'>
              <div class="col-12 col-md-3"><strong>Contact Number</strong></div>
              <div class="col-12 col-md-9">{{patient.contact_number}}</div>
            </div>
            <div class='row mb-2'>
              <div class="col-12 col-md-3"><strong>Marital Status</strong></div>
              <div class="col-12 col-md-9">{{patient.marital_status}}</div>
            </div>
            <div class='row mb-2'>
              <div class="col-12 col-md-3"><strong>Height</strong></div>
              <div class="col-12 col-md-9">{{patient.height}}</div>
            </div>
            <div class='row mb-2' v-if='patient.previous_name'>
              <div class="col-12 col-md-3"><strong>Previous Names</strong></div>
              <div class="col-12 col-md-9">{{patient.previous_name}}</div>
            </div>
            <!-- <div class="row">
              <div class="col-lg-6">
                <h3>Name: {{ patient.name }} </h3>
              </div>
              <div class="col-lg-3">
                <h3>Sex: {{ patient.sex }}</h3>
              </div>
              <div class="col-lg-3">
                <h3>Age: {{ patient.age }}</h3>
              </div>
            </div>
            <div class="row mt-4 mb-5">
              <div class="col-lg-6">
                <h3>Address: {{ patient.address }} </h3>
              </div>
              <div class="col-lg-6">
                <h3>Occupation: {{ patient.occupation }} </h3>
              </div>
            </div> -->
          </div>
          <button class='mt-3'><div class='add-btn' v-on:click='edit'>Edit Patient Info</div></button>
        </div>
        <!-- Edit patient form -->
        <div class="rectangle mb-25" id="editPatientInfo">
          <h3>
            Editing Information
          </h3>
          <div class="mt-3">
            <div class='row mb-2'>
              <div class="col-12 col-md-3"><strong>Name</strong></div>
              <div class="col-12 col-md-9"><input type="text" v-model="patient.name"/></div>
            </div>
            <div class='row mb-2'>
              <div class="col-12 col-md-3"><strong>Sex</strong></div>
              <div class="col-12 col-md-9">
                <div class="form-group">
                  <select id="inputState" class="form-control" style='width: auto;' v-model="patient.sex">
                    <option selected>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>
            </div>
            <div class='row mb-2' v-for="(add, index) in patient.address" :key='add._id'>
              <div class="col-12 col-md-3"><strong>Address {{index+1}}</strong></div>
              <div class="col-12 col-md-9">
                <div class="col-12 col-md-6">
                  <label for="patientStreet">Street:</label>
                  <input
                    class="form-control"
                    type="text"
                    name="patientStreet"
                    v-model="add.street"
                    required
                  />
                </div>
                <div class="col-12 col-md-3">
                  <label for="patientCity">City:</label>
                  <input
                    class="form-control"
                    type="text"
                    name="patientCity"
                    v-model="add.city"
                    required
                  />
                </div>
                <div class="col-12 col-md-3">
                  <label for="patientProvince">Province:</label>
                  <input
                    class="form-control"
                    type="text"
                    name="patientProvince"
                    v-model="add.province"
                    required
                  />
                </div>
              </div>
            </div>
            <div class='row mb-2'>
              <div class="col-12 col-md-3"><strong>Date of Birth</strong></div>
              <div class="col-12 col-md-9"><input type="date" v-model="patient.date_of_birth"/></div>
            </div>
            <div class='row mb-2'>
              <div class="col-12 col-md-3"><strong>Contact Number</strong></div>
              <div class="col-12 col-md-9"><input type="text" v-model="patient.contact_number"/></div>
            </div>
            <div class='row mb-2'>
              <div class="col-12 col-md-3"><strong>Marital Status</strong></div>
              <div class="col-12 col-md-9"><input type="text" v-model="patient.marital_status"/></div>
            </div>
            <div class='row mb-2'>
              <div class="col-12 col-md-3"><strong>Height</strong></div>
              <div class="col-12 col-md-9"><input type="text" v-model="patient.height"/></div>
            </div>
          </div>
          <div class="mt-3">
            <button class='btn btn-warning' @click="cancel">Cancel</button>
            <button class='btn btn-success ml-3' @click="saveInfo">Save</button>
            <button class='btn btn-danger ml-md-3 mt-3 mt-md-0' @click="deletePatient">Delete Patient</button>
          </div>
        </div>
        <input type="text" class="search" v-model="search" placeholder="Search visit dates" v-on:keyup.enter="searchQuery" />
        <button class='mb-25 default'><div class='add-btn' @click="saveVisit" data-toggle="modal" data-target="#addVisitModal">+ Add New Visit</div></button>
        <!-- FOR LOOP FOR VISITS -->
        <div v-for="visit in searchQuery()" :key='visit._id'>
          <!-- TODO: change :key to the visitID -->
          <router-link :to="{ path: visit.link }">
            <div class="rectangle mb-25">{{visit.date}}</div>
          </router-link>
        </div>
      </div>
    </div>
    <!-- <div class="modal fade" id="addVisitModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="patientModalLabel">Add New Patient</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row flex">
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button type="button" id="selectSubject" class="btn" :class="{ visitActive: activeBtn === 'Subject'}" @click="activeBtn = 'Subject'">Subject</button>
                  <button type="button" id="selectObject" class="btn" :class="{ visitActive: activeBtn === 'Object'}" @click="activeBtn = 'Object'">Object</button>
                  <button type="button" id="selectAssessment" class="btn" :class="{ visitActive: activeBtn === 'Assessment'}" @click="activeBtn = 'Assessment'">Assessment</button>
                  <button type="button" id="selectPlan" class="btn" :class="{ visitActive: activeBtn === 'Plan'}" @click="activeBtn = 'Plan'">Plan</button>
                </div>
              </div>
              <hr>
              <form>
                <div class="form-group" id="subjectCard">
                  <div class="row">
                    <h4>Subject Details:</h4>
                    <textarea v-model="subject" id="subject" cols="30" rows="10" class="form-control"></textarea>
                  </div>
                </div>
                <div class="form-group" id="objectCard">
                  <div class="row">
                    <h4>Object Details:</h4>
                    <textarea v-model="object" id="object" cols="30" rows="10" class="form-control"></textarea>
                  </div>
                </div>
                <div class="form-group" id="assessmentCard">
                  <div class="row">
                    <h4>Assessment Details:</h4>
                    <textarea v-model="assessment" id="assessment" cols="30" rows="10" class="form-control"></textarea>
                  </div>
                </div>
                <div class="form-group" id="planCard">
                  <div class="row">
                    <h4>Plan Details:</h4>
                    <textarea v-model="plan" id="plan" cols="30" rows="10" class="form-control"></textarea>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="mb-25 default" data-dismiss="modal">Close</button>
            <button type="button" class="mb-25 default" @click="saveVisit">Save</button>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import $ from 'jquery';
import PatientService from '../PatientService';
import VisitService from '../VisitService';

export default {
  name: 'PatientEnvelope',
  components: {
    Sidebar,
  },
  data: () => ({
    id: '',
    // name: '',
    // sex: '',
    // street: '',
    // city: '',
    // province: '',
    // date_of_birth: '',
    // contact_number: '',
    // marital_status: '',
    // height: '',
    patient: {},
    links: [],
    visits: [],
    activeBtn: 'Subject',
    subject: '',
    object: '',
    assessment: '',
    plan: '',
    errorMessage: '',
    search: '',
  }),
  async created() {
    this.id = this.$route.params.id;
  },
  mounted() {
    this.loadData();
    $('#editPatientInfo').hide();
  },
  methods: {
    computeAge(dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age -= 1;
      }

      return age;
    },
    searchQuery() {
      try {
        if (this.search) {
          return this.visits.filter((item) => this.search.toLowerCase().split(' ').every((v) => item.date.toLowerCase().includes(v)));
        }
      } catch (err) {
        alert('error');
      }
      return this.visits;
    },
    async saveVisit() {
      this.errorMessage = '';
      const newVisit = {
        subject: '',
        object: '',
        assessment: '',
        plan: '',
        weight: '',
        blood_pressure: '',
        heart_rate: '',
        painVisual: '',
        patient: this.id,
      };
      VisitService.createVisit(newVisit).then(() => {
        this.loadData();
      });
    },
    edit() {
      $('#patientInfo').hide();
      $('#editPatientInfo').show();
    },
    cancel() {
      $('#patientInfo').show();
      $('#editPatientInfo').hide();
      this.loadData();
    },
    async saveInfo() {
      // to do
      try {
        $('#patientInfo').show();
        $('#editPatientInfo').hide();
        // const address = {
        //   street: this.street,
        //   city: this.city,
        //   province: this.province,
        // };
        // const toSend = {
        //   name: this.name,
        //   sex: this.sex,
        //   address,
        //   date_of_birth: this.date_of_birth,
        //   contact_number: this.contact_number,
        //   marital_status: this.marital_status,
        //   height: this.height,
        // };
        PatientService.updatePatient(this.id, this.patient)
          .then(() => {
            this.loadData();
          });
      } catch (err) {
        console.log('error');
        this.loadData();
      }
    },
    async deletePatient() {
      try {
        PatientService.deletePatient(this.id)
          .then(() => {
            this.$router.push('/');
          });
      } catch (err) {
        console.log('error');
        this.loadData();
      }
    },
    async loadData() {
      try {
        const data = await PatientService.fetchPatientProfile(this.id);
        this.patient = data;
        this.visits = data.visits.reverse();
        $('#objectCard').hide();
        $('#assessmentCard').hide();
        $('#planCard').hide();
      } catch (err) {
        console.log('error');
      }
    },
    getStringMonth(index) {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return months[index];
    },
    logout() {
      localStorage.removeItem('jwt');
      localStorage.removeItem('type');
      localStorage.removeItem('fullname');
      document.location.replace('/login');
    },
  },
  watch: {
    activeBtn() {
      if (this.activeBtn === 'Subject') {
        $('#subjectCard').show();
        $('#objectCard').hide();
        $('#assessmentCard').hide();
        $('#planCard').hide();
      } else if (this.activeBtn === 'Object') {
        $('#objectCard').show();
        $('#subjectCard').hide();
        $('#assessmentCard').hide();
        $('#planCard').hide();
      } else if (this.activeBtn === 'Assessment') {
        $('#assessmentCard').show();
        $('#objectCard').hide();
        $('#subjectCard').hide();
        $('#planCard').hide();
      } else if (this.activeBtn === 'Plan') {
        $('#planCard').show();
        $('#objectCard').hide();
        $('#subjectCard').hide();
        $('#assessmentCard').hide();
      }
    },
  },
};

</script>

<style scoped>
button.default {
  border: none;
  background: transparent;
  padding-left: 20px;
  padding-right: 20px;
}

.header {
  width: 2in;
  font-weight: bold;
  width: 100%;
}

#content {
  padding: .25in .5in;
}

.breadcrumb {
  background: transparent;
}

a > .rectangle:hover {
  box-shadow: none;
  color: black;
}

.visitActive {
  text-decoration: underline;
  text-decoration-color: #29a329;
  font-weight: bold;
  color: #29a329;
}
</style>
