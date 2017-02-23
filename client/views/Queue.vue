<template>
<ticket-list :category=$route.params.name></ticket-list>
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
