<template>
    <nav class="nav">
        <div id="nav" class="nav">
            <a @click="handleClick" id="back-button" class="button nav-item is-primary">
              <span class="icon is-small"><i class="fa fa-home"></i></span>
              <span>Do something</span>
            </a>
        </div>
    </nav>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
      computed: {...mapGetters({
        selectedTickets: 'tickets/selectedTickets'
      })},
      methods: {
        handleClick: function (event) {
            alert(this.selectedTickets + " are the selected tickets")
       }
      }
}
</script>
<style>
nav.nav {
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: left;
  background: white;
  margin: 0;
  padding: .5em;
  min-height: 0 !important;
  height: 5px;
}

nav.nav a {
  margin-left: 5px;
}
</style>
