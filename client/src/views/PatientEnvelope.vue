<template>
  <div class="patient">
    <div class="row">
      <Sidebar :name='patient.name' :links='links'/>
      <div id="content" class='col-10'>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/">Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">Patient Envelope</li>
        </ol>
        <!-- Basic Information -->
        <div class="rectangle mb-25" id="patientInfo">
          Basic Information
          <div class="container mt-5">
            <div class="row">
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
            </div>
          </div>
          <button class='mb-25 default'><div class='add-btn' v-on:click='edit' type="button">Edit Patient Info</div></button>
        </div>
        <!-- Edit patient form -->
        <div class="rectangle mb-25" id="editPatientInfo">
          Editing Information
          <div class="container mt-5">
            <div class="row">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="name">Name: </label>
                  <input type="text" v-model="patient.name"/>
                </div>
              </div>
              <div class="col-lg-3">
                <div class="form-group">
                  <label for="name">Sex: </label>
                  <input type="text" v-model="patient.sex"/>
                </div>
              </div>
              <div class="col-lg-3">
                <div class="form-group">
                  <label for="name">Age: </label>
                  <input type="text" v-model="patient.age"/>
                </div>
              </div>
            </div>
            <div class="row mt-4 mb-5">
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="name">Address: </label>
                  <input type="text" v-model="patient.address"/>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group">
                  <label for="name">Occupation: </label>
                  <input type="text" v-model="patient.occupation"/>
                </div>
              </div>
            </div>
          </div>
          <button class='mb-25 default'><div class='add-btn' type="button" @click="cancel">Cancel</div></button>
          <button class='mb-25 default'><div class='add-btn' type="button" @click="saveInfo">Save</div></button>
        </div>
        <button class='mb-25 default'><div class='add-btn' type="button" @click="saveVisit" data-toggle="modal" data-target="#addVisitModal">+ Add New Visit</div></button>
        <!-- FOR LOOP FOR VISITS -->
        <div v-for="visit in visits" :key='visit._id'>
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
    name: {
      name: '',
    },
    id: '',
    age: '',
    sex: '',
    address: '',
    occupation: '',
    patient: {},
    links: [
      {
        name: 'Summary Statistics',
        dest: '/statistics',
      },
    ],
    visits: [],
    activeBtn: 'Subject',
    subject: '',
    object: '',
    assessment: '',
    plan: '',
    errorMessage: '',
  }),
  async created() {
    this.id = this.$route.params.id;
  },
  mounted() {
    this.loadData();
    $('#editPatientInfo').hide();
  },
  methods: {
    async saveVisit() {
      this.errorMessage = '';
      const newVisit = {
        subject: '',
        object: '',
        assessment: '',
        plan: '',
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
        const toSend = {
          name: this.patient.name,
          address: this.patient.address,
          sex: this.patient.sex,
          age: this.patient.age,
          occupation: this.patient.occupation,
        };
        PatientService.updatePatient(this.id, toSend)
          .then(() => {
            this.loadData();
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
