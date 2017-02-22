<template>
<div>
    <top-nav></top-nav>
    <section class="section">
    <div class="container">
        <ticket-list v-for="category in categories" :category="category" v-if="categories.length"></ticket-list>
    </div>
  </section>
</div>
</template>

<script>
import TicketList from 'components/TicketList'
import TopNav from 'components/TopNav'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
    config: 'config',
    }),
    ...mapState('tickets',
     ['categories']),
  },
  components: {
    TicketList,
    TopNav
  },
  created () {
    this.$store.dispatch('tickets/initCategories', this.config.queues)
  },
}
</script>
