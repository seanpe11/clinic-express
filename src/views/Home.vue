<template>
  <div class="home">
    <div class="row">
      <Sidebar/>
      <div id="content" class='col-10'>
        <!-- search field -->
        <input type="text" class='search' placeholder='search patient envelopes'>

        <!-- FOR LOOP FOR PATIENT -->
        <router-link to='/patient' class='router-link'>
          <div v-for="patient in patients" :key='patient.name'>
            <div class="rectangle patient">
              <div class="name">{{patient.name}}</div>
              <div class="lastVisit">
                Last Visit <br/>
                {{patient.lastVisit}}
              </div>
            </div>
          </div>
        </router-link>
        <!-- END LOOP -->

        <!-- add new visit button -->
        <button class='mb-25'><div class='add-btn'>+ Add New Patient</div></button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'Home',
  components: {
    Sidebar,
  },
  data: () => ({
    // replace this array to the results of a mongodb query
    patients: [
      {
        name: 'Juan Dela Cruz',
        lastVisit: 'August 13, 2020, Friday',
      },
      {
        name: 'Juanita Dela Cruz',
        lastVisit: 'August 13, 2020, Friday',
      },
      {
        name: 'John Doe',
        lastVisit: 'August 13, 2020, Friday',
      },
      {
        name: 'Jeremiah Johnson',
        lastVisit: 'August 13, 2020, Friday',
      },
      {
        name: 'Juan Dela Cruz',
        lastVisit: 'August 13, 2020, Friday',
      },
      {
        name: 'Juanita Dela Cruz',
        lastVisit: 'August 13, 2020, Friday',
      },
      {
        name: 'John Doe',
        lastVisit: 'August 13, 2020, Friday',
      },
      {
        name: 'Jeremiah Johnson',
        lastVisit: 'August 13, 2020, Friday',
      },
      {
        name: 'Juan Dela Cruz',
        lastVisit: 'August 13, 2020, Friday',
      },
      {
        name: 'Juanita Dela Cruz',
        lastVisit: 'August 13, 2020, Friday',
      },
      {
        name: 'John Doe',
        lastVisit: 'August 13, 2020, Friday',
      },
      {
        name: 'Jeremiah Johnson',
        lastVisit: 'August 13, 2020, Friday',
      },
    ],
  }),
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
  margin-bottom: .25in;
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
  padding: .1in .5in;
  margin-bottom: .25in;
  border: 0px;
  width: 100%;
}

#content {
    padding: .25in .5in;
}
</style>
