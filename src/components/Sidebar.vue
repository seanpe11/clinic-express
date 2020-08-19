<template>
    <div id="sidebar" class='col-2'>
        <div id="nav" class='position-fixed'>
            Sidebar
        </div>
        <footer class='fixed-bottom'>
            Clinic Express <br/>
            Made with ❤️ by JNRDS.
        </footer>
    </div>
</template>

<script>
export default {
  name: 'Sidebar',
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
</style>
