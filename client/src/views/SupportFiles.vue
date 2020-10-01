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
        <div class="rectangle mb-2">
          Friday - August 13, 2020
        </div>
        <div class="rectangle mg-2">
          <div class="row mb-2">
              <h2 class='col-6'>Supporting Files</h2>
          </div>
          <div class='w-100 px-3'>
            <div class="row mt-2" v-for='file in files' :key='file.filename'>
              <div class="col-9"><button class='btn border-primary'>{{file.filename}}</button></div>
              <div class="col-3"><button class='btn btn-danger float-right' @click="deleteFile(file._id)">Delete</button></div>
            </div>
          </div>
          <div v-if="files.length == 0">
            No Files Yet!
          </div>
          <div>
            <input type="file" id="uploadForm" accept="image/*">
            <button class='add-btn col-6 mt-3 ml-3' @click="uploadFile"> + Upload File </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-env jquery */
import Sidebar from '@/components/Sidebar.vue';
import FileService from '../FileService';

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
    visit_id: '',
  }),
  created() {
    this.visit_id = this.$route.params.visit_id;
    this.loadFiles();
  },
  methods: {
    async loadFiles() {
      FileService.getFiles(this.visit_id)
      .then((res) => {
        this.files = res.data;
      })
      .catch(() => {
        this.files = null;
      });
    },
    async uploadFile() {
      const file = $('#uploadForm').prop('files')[0];

      await FileService.addFile(this.visit_id, file);
      this.loadFiles();
    },
    async deleteFile(id) {
      await FileService.deleteFile(id);
      this.loadFiles();
    },
  },
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
    text-align: left;
}
</style>
