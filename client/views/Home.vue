<template>
<div>
    <top-nav></top-nav>
    <section class="section">
    <div class="container">
        <template v-for="q in queues">
        <ticket-list :queue=q></ticket-list>
        </template>
    </div>
  </section>
</div>
</template>

<script>
import TicketList from 'components/TicketList'
import TopNav from 'components/TopNav'
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters({
    queues: 'queues'
  }),
  components: {
    TicketList,
    TopNav
  }
}
</script>
