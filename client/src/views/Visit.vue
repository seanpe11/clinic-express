<template>
  <div class="visit">
    <div class="row">
      <Sidebar name="null" :links='links'/>
      <div id="content" class='col-10'>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/">Home</a></li>
          <li class="breadcrumb-item" aria-current="page">
            <a href="/patient">Patient Envelope</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Visit Record</li>
        </ol>
        <div class="rectangle mb-25">
          Friday - August 13, 2020
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
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="subjective" role="tabpanel" aria-labelledby="home-tab">
              {{soap.subjective}}
            </div>
            <div class="tab-pane fade" id="objective" role="tabpanel" aria-labelledby="profile-tab">
              {{soap.objective}}
            </div>
            <div class="tab-pane fade" id="assessment" role="tabpanel" aria-labelledby="contact-tab">
              {{soap.assessment}}
            </div>
            <div class="tab-pane fade" id="plan" role="tabpanel" aria-labelledby="contact-tab">
              {{soap.plan}}
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

export default {
  name: 'Visit',
  components: {
    Sidebar,
  },
  data: () => ({
    // replace this with the mongodb query result
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
  }),
};

</script>

<style scoped>

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
