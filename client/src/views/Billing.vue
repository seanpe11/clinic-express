<template>
  <div class="home">
    <div class="row">
      <Sidebar name="null" :links="links" />
      <div id="content" class="col-12 col-md-10 p-0 p-md-5">
        <nav class="navbar navbar-expand-lg navbar-light m-3 pl-3 d-block d-md-none">
          <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
                  aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <a class="navbar-brand ml-4"><strong>Edit Billings</strong></a>

          <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav mr-auto mt-2 mt-md-0">
              <li class="nav-item">
                <a class="nav-link" href="/admin">System Accounts</a>
                <a class="nav-link" href="" v-on:click="logout()">Logout</a>
              </li>
            </ul>
          </div>
        </nav>

        <!-- List start-->
        <div class="card">
          <h3 class="card-header text-center font-weight-bold text-uppercase py-4">List of Services</h3>
          <div class="card-body">
              <div id="table" class="table-editable">
              <button type="button" class="btn btn-link table-add float-right mb-3 mr-2">+ Add Row</button>
              <table class="table table-bordered table-responsive-md table-striped text-center">
                  <thead>
                  <tr>
                      <th class="text-center">Service</th>
                      <th class="text-center">Price</th>
                      <th class="text-center">Note</th>
                      <th class="text-center">Custom</th>
                  </tr>
                  </thead>

                  <!--START LOOP FOR ROWS-->
                  <tbody>
                  <tr>
                      <td class="pt-3-half">Check up with Dra. Jamalul</td>
                      <td class="pt-3-half">300</td>
                      <td class="pt-3-half"></td>
                      <td>
                      <button type="button" class="btn btn-success btn-rounded btn-sm" @click="editRow">Edit</button>
                      <div class="divider"/>
                      <button type="button" class="btn btn-danger btn-rounded btn-sm" @click="deleteRow">Delete</button>
                      </td>
                  <tr class="hide">
                      <td class="pt-3-half">Check up with Dr. Jamalul</td>
                      <td class="pt-3-half">500</td>
                      <td class="pt-3-half"></td>
                      <td>
                      <button type="button" class="btn btn-success btn-rounded btn-sm">Edit</button>
                      <div class="divider"/>
                      <button type="button" class="btn btn-danger btn-rounded btn-sm">Delete</button>
                      </td>
                  </tr>
                  <tr class="hide">
                      <td class="pt-3-half">Check up Dra Jamalul w/ ECG</td>
                      <td class="pt-3-half">500</td>
                      <td class="pt-3-half"></td>
                      <td>
                      <button type="button" class="btn btn-success btn-rounded btn-sm">Edit</button>
                      <div class="divider"/>
                      <button type="button" class="btn btn-danger btn-rounded btn-sm">Delete</button>
                      </td>
                  </tr>
                  <tr class="hide">
                      <td class="pt-3-half">Wound Cleaning Dr. Jamalul</td>
                      <td class="pt-3-half">500</td>
                      <td class="pt-3-half"></td>
                      <td>
                      <button type="button" class="btn btn-success btn-rounded btn-sm">Edit</button>
                      <div class="divider"/>
                      <button type="button" class="btn btn-danger btn-rounded btn-sm">Delete</button>
                      </td>
                  </tr>
                  <tr class="hide">
                      <td class="pt-3-half">Circumcision</td>
                      <td class="pt-3-half">1500</td>
                      <td class="pt-3-half"></td>
                      <td>
                      <button type="button" class="btn btn-success btn-rounded btn-sm">Edit</button>
                      <div class="divider"/>
                      <button type="button" class="btn btn-danger btn-rounded btn-sm">Delete</button>
                      </td>
                  </tr>
                  </tbody>
                  <!--END LOOP-->
              </table>
              </div>
          </div>
          </div>
        <!-- List End-->
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from '@/components/Sidebar.vue';
// import BillingService from '../BillingService';

export default {
  name: 'Billing',
  components: {
    Sidebar,
  },
  data: () => ({

    service: '',
    price: '',
    note: '',

    service_arr: [],

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
  methods: {
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

.divider{
    width:5px;
    height:auto;
    display:inline-block;
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

.pt-3-half {
padding-top: 1.4rem;
}

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
