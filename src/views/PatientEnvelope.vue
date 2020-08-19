<template>
  <div class="patient">
    <div class="row">
      <Sidebar/>
      <div id="content" class='col-10'>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/">Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">Patient Envelope</li>
        </ol>
        <div class="rectangle mb-25">
          Basic Information
        </div>
        <button class='mb-25'><div class='add-btn'>+ Add New Visit</div></button>
        <div class="rectangle mg-25">Friday - August 13, 2020</div>
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

.mb-25 {
  margin-bottom: .25in;
}

.breadcrumb {
  background: transparent;
}
</style>
