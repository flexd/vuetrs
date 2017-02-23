<template>
    <div class="ticketview">
    <div class="heading">
    <h1 class="title">{{category}} ({{openTickets(categoryFromName(category)).length}})</h1>
    </div>
    {{selectedTickets}}
    <ticket-table :category=category :tickets=openTickets(categoryFromName(category))></ticket-table>
    <template v-if="pendingTickets(categoryFromName(category)).length > 0">
    Pending
    <ticket-table :category=category :tickets=pendingTickets(categoryFromName(category))></ticket-table>
    </template>
</div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TicketTable from 'components/TicketTable'
export default {
  props: ['category'],
  computed: {...mapGetters({
    tickets: 'tickets/allTickets',
    pendingTickets: 'tickets/pendingTickets',
    openTickets: 'tickets/openTickets',
    categoryFromName: 'tickets/categoryFromName',
    selectedTickets: 'tickets/selectedTickets'
  })},
  methods: mapActions([
  ]),
  created () {
    this.$store.dispatch('tickets/getAllTickets', this.category)
  },
  watch: {
    '$route' (to, from) {
        this.$store.dispatch('tickets/getAllTickets', this.category)
    // react to route changes...
    }
  },
  components: {
    TicketTable
  }
}
</script>
