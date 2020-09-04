<template>
  <div class="visit">
    <div class="row">
      <Sidebar name="null" :links='links'/>
      <div id="content" class='col-10'>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/">Home</a></li>
          <li class="breadcrumb-item" aria-current="page">
            <a :href="'/patients/envelope/' + id ">Patient Envelope</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Visit Record</li>
        </ol>
        <div class="rectangle mb-25">
          <h3>{{ visit_date }}</h3>
        </div>
        <div class="rectangle mg-25">
          <h2 class='mb-25'>SOAP File</h2>
          <ul class="nav nav-tabs mb-25" id="myTab" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" id="home-tab" data-toggle="tab"
              href="#subjective" role="tab" aria-controls="home" aria-selected="true">
                Subjective
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="profile-tab" data-toggle="tab"
              href="#objective" role="tab" aria-controls="profile" aria-selected="false">
                Objective
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="contact-tab" data-toggle="tab"
              href="#assessment" role="tab" aria-controls="contact" aria-selected="false">
                Assessment
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="contact-tab" data-toggle="tab"
              href="#plan" role="tab" aria-controls="contact" aria-selected="false">
                Plan
              </a>
            </li>
          </ul>
          <div class="tab-content" style="min-height: 70%" id="myTabContent">
            <div class="tab-pane fade show active" id="subjective" role="tabpanel" aria-labelledby="home-tab">
              <div class="form-group">
                <textarea class="form-control" id="formSub" rows="10" v-model="soap.subject" readonly></textarea>
              </div>
              <div class="my-3" id="editSub">
                <div class="btn btn-primary" id="editS" v-on:click="edit('Sub')">Edit Subjective</div>
              </div>
              <div class="my-3" id="editingSub">
                <div class="btn btn-warning" v-on:click="cancel('Sub')">Cancel</div>
                <div class="btn btn-success mx-2" v-on:click="save('Sub')">Save</div>
              </div>
            </div>
            <div class="tab-pane fade" id="objective" role="tabpanel" aria-labelledby="profile-tab">
              <div class="form-group">
                <textarea class="form-control" id="objectForm" rows="10" v-model="soap.object" readonly></textarea>
              </div>
            </div>
            <div class="tab-pane fade" id="assessment" role="tabpanel" aria-labelledby="contact-tab">
              <div class="form-group">
                <textarea class="form-control" id="assessForm" rows="10" v-model="soap.assess" readonly></textarea>
              </div>
              <div class="btn btn-primary" v-on:click="edit('assessForm')">Edit Assessment</div>
              <div class="btn btn-success">Save</div>
            </div>
            <div class="tab-pane fade" id="plan" role="tabpanel" aria-labelledby="contact-tab">
              <div class="form-group">
                <textarea class="form-control" id="planForm" rows="10" v-model="soap.plan" readonly></textarea>
              </div>
              <div class="btn btn-primary" v-on:click="edit('planForm')">Edit Plan</div>
              <div class="btn btn-success">Save</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-env jquery */
import Sidebar from '@/components/Sidebar.vue';
import moment from 'moment';
import VisitService from '../VisitService';

export default {
  name: 'Visit',
  components: {
    Sidebar,
  },
  data: () => ({
    // replace this with the mongodb query result
    id: '',
    visit_id: '',
    links: [
      {
        name: 'Supporting Files',
        dest: '/patient/visit/files',
      },
    ],
    soap: {
      subjective: 'Subjective',
      objective: 'Objective',
      assessment: 'Assessment',
      plan: 'Plan',
    },
    visit_date: '-',
    visit: {},
  }),
  async created() {
    this.loadData();
  },
  mounted() {
    $('#editingSub').hide();
    $('#editingObj').hide();
    $('#editingAss').hide();
    $('#editingPla').hide();
  },
  methods: {
    // Reloads data from API
    async loadData() {
      this.id = this.$route.params.id;
      this.visit_id = this.$route.params.visit_id;
      VisitService.getVisitDetails(this.visit_id).then((visit) => {
        this.visit_date = moment(visit.createdAt).format('LLL');
        this.soap = visit;
      });
    },
    // Front-end crud
    edit(section) {
      $(`#form${section}`).prop('readonly', false);
      $(`#edit${section}`).hide();
      $(`#editing${section}`).show();
    },
    cancel(section) {
      $(`#form${section}`).prop('readonly', true);
      $(`#edit${section}`).show();
      $(`#editing${section}`).hide();
      this.loadData();
      console.log(this.soap);
    },
    // Send to DB, also front-end change
    async save(section) {
      $(`#form${section}`).prop('readonly', true);
      $(`#edit${section}`).show();
      $(`#editing${section}`).hide();
      VisitService.updateVisit(this.visit_id, this.soap)
        .then(() => {
          this.loadData();
        });
    },

  },
};

</script>

<style scoped>
textarea {
  /* resize: none; */
  resize: vertical;
}

#content {
  padding: .25in .5in;
}

.breadcrumb {
  background: transparent;
}

.nav-link:hover {
  color: black;
}
</style>
