<template>
    <div class="ticketview">
    <div class="heading">
    <router-link :to="{name: 'queue', params: { name: queue}}"><h1 class="title">{{queue}} ({{openTickets(queue).length}})</h1></router-link>
    </div>
    {{selectedTickets}}
    <ticket-table :tickets=openTickets(queue)></ticket-table>
    <template v-if="pendingTickets(queue).length > 0">
    Pending
    <ticket-table :tickets=pendingTickets(queue)></ticket-table>
    </template>
</div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TicketTable from 'components/TicketTable'
export default {
  props: ['queue'],
  computed: {...mapGetters({
    tickets: 'allTickets',
    pendingTickets: 'pendingTickets',
    openTickets: 'openTickets',
    selectedTickets: 'selectedTickets'
  })},
  methods: mapActions([
  ]),
  created () {
    this.$store.dispatch('getAllTickets', this.queue)
  },
  components: {
    TicketTable
  }
}
</script>
