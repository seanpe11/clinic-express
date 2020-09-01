<template>
  <div class="home">
    <div class="row">
      <Sidebar name="null" :links='links'/>
      <div id="content" class='col-10'>
        <!-- search field -->
        <input type="text" class='search' placeholder='search patient envelopes'>

        <!-- add new patient button -->
        <button type="button" class="mb-25" data-toggle="modal" data-target="#patientModal">
        <div class='add-btn'>+ Add New Patient </div></button>

        <!-- add new patient modal -->
        <div class="modal" id="patientModal" tabindex="-1" role="dialog" aria-labelledby="patientModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
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
                  <td><label for="patientName">Name: <input class="inputbox" type="text" name="patientName" required></label></td><br>

                  <td><label for="patientAge">Age: <input id="agebox" type="text" name="patientAge" required></label>
                  
                  <label class="radiospacing" for="patientSex">Sex: 
                  <label><input type="radio" name="patientSex" value="male" required>Male</label>
                  <label><input type="radio" name="patientSex" value="female">Female</label></label>
                  </td><br>

                  <td><label for="patientAddress">Address: <input class="inputbox" type="text" name="patientAddress" required></label></td><br>

                  <label for="patientOccupation">Occupation: <input class="inputbox" type="text" name="patientOccupation" required></label>
                  
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="mb-25" data-dismiss="modal">Close</button>
                <button type="button" class="mb-25">Save</button>
              </div>
            </div>
          </div>
        </div>

        <!-- FOR LOOP FOR PATIENT -->
        <div v-for="patient in patients" :key='patient.name'>
          <!-- TODO: change :key to the patientID -->
          <router-link to='/patient' class='router-link'>
            <div class="rectangle patient">
              <div class="name">{{patient.name}}</div>
              <div class="lastVisit">
                Last Visit <br/>
                {{patient.lastVisit}}
              </div>
            </div>
          </router-link>
        </div>
        <!-- END LOOP -->
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
    links: [
      {
        name: 'Summary Statistics',
        dest: '/statistics',
      },
    ],
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
  background: #F1F1F1;
}

.modal-body {
  width: 500px;
  height: 225px;
}

.radiospacing {
  margin-left: .5in;
}

.inputbox {
  width: 337px;
  height: 30px;
    
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 0px;
  border-radius: 10px;
}

#agebox {
  width: 50px;
  height: 30px;

  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 0px;
  border-radius: 10px;
}

.modal-footer > button {
  width: 100px;
  height: 25px;

  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}

</style>
