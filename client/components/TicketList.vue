<template>
    <div class="ticketview">
    <div class="heading">
    <router-link :to="{name: 'queue', params: { name: category.categoryName}}"><h1 class="title">{{category.categoryName}} ({{openTickets(category).length}})</h1></router-link>
    </div>
    {{selectedTickets}}
    <ticket-table :tickets=openTickets(category)></ticket-table>
    <template v-if="pendingTickets(category).length > 0">
    Pending
    <ticket-table :tickets=pendingTickets(category)></ticket-table>
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
    selectedTickets: 'tickets/selectedTickets'
  })},
  methods: mapActions([
  ]),
  created () {
    this.$store.dispatch('tickets/getAllTickets', this.category)
  },
  components: {
    TicketTable
  }
}
</script>
