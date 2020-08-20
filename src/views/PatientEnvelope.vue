<template>
  <div class="patient">
    <div class="row">
      <Sidebar :name='name' :links='links'/>
      <div id="content" class='col-10'>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/">Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">Patient Envelope</li>
        </ol>
        <div class="rectangle mb-25">
          Basic Information
        </div>
        <button class='mb-25'><div class='add-btn'>+ Add New Visit</div></button>
        <!-- FOR LOOP FOR VISITS -->
        <div v-for="visit in visits" :key='visit.date'>
          <!-- TODO: change :key to the visitID -->
          <router-link to='/patient/visit'>
            <div class="rectangle mb-25">{{visit.date}}</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'PatientEnvelope',
  components: {
    Sidebar,
  },
  data: () => ({
    // replace this with the mongodb query result
    name: {
      firstname: 'Juan',
      lastname: 'Dela Cruz',
    },
    links: [
      {
        name: 'Summary Statistics',
        dest: '/statistics',
      },
    ],
    visits: [
      { date: 'Friday - August 13, 2020' },
      { date: 'Friday - August 13, 2021' },
      { date: 'Friday - August 13, 2020' },
    ],
  }),
};

</script>

<style scoped>
button {
  border: none;
  background: transparent;
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
</style>
