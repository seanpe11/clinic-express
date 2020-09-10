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
          <li class="breadcrumb-item" aria-current="page"><a href="/patient/visit">Visit Record</a></li>
          <li class="breadcrumb-item active" aria-current="page">Supporting Files</li>
        </ol>
        <div class="rectangle mb-25">
          Friday - August 13, 2020
        </div>
        <div class="rectangle mg-25">
          <div class="row mb-25">
              <h2 class='col-6'>Supporting Files</h2>
              <button class='add-btn col-6'> + Upload File </button>
          </div>
          <ul class="list-group">
            <li class="list-group-item" v-for="file in files" :key='file.filename'><button>{{file.filename}}</button></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-env jquery */
import Sidebar from '@/components/Sidebar.vue';
import $ from 'jquery';

export default {
  name: 'SupportFile',
  components: {
    Sidebar,
  },
  data: () => ({
    links: [
      {
        name: 'SOAP',
        dest: '/patient/visit/',
      },
    ],
    // replace this with the mongodb query result
    files: [],
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

.list-group-item:hover {
    background-color: lightgrey;
}

.list-group-item > button {
  border: none;
  background: transparent;
  height: 100%;
  width: 100%;
  text-align: left;
}

.add-btn {
    border: none;
    background: transparent;
    text-align: right;
}
</style>
