<template>
  <div class="home">
    <div class="row">
      <Sidebar name="null" :links="links" />
      <div id="content" class="col-10">
        <h7> Hi </h7>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from '@/components/Sidebar.vue';
import PatientService from '../PatientService';

export default {
  name: 'Billing',
  components: {
    Sidebar,
  },
  data: () => ({
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
  }),
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
