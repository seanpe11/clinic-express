<template>
    <div id="sidebar" class='col-2'>
        <div id="nav" class='position-fixed' style='width: inherit;'>
            <h4>Jamalul Clinic</h4>

            <div v-if="name != 'null'" id="name">
                <span>Patient Name</span>
                <h3>{{ name }}</h3>
            </div>

            <div id="links">
                <div v-for="link in links" :key='link.name'>
                    <router-link :to="link.dest">{{link.name}}</router-link>
                </div>
            </div>
        </div>
        <footer class='fixed-bottom'>
            <a href="https://github.com/jolocansana/clinic-express">Clinic Express</a> <br/>
            Made with ❤️ by JNRDS.
        </footer>
    </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    name: Object,
    links: Array,
  },
};
</script>

<style scoped>

footer {
    font-size: 12px;
    margin: .25in;
}

#nav {
    margin: .25in;
}

#sidebar {
    height: 100vh;
}

#name {
    margin-top: .5in;
}

#links {
    margin-top: .5in;
}
</style>
