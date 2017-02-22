<template>
<div>
    <top-nav></top-nav>
    <section class="section">
    <div class="container">
        <ticket-list :queue=$route.params.name></ticket-list>
    </div>
  </section>
</div>
</template>

<script>
import TicketList from 'components/TicketList'
import TopNav from 'components/TopNav'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    TicketList,
    TopNav
  },
}
</script>
