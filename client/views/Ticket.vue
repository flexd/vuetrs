<template>
<div>
    <top-nav></top-nav>
    <div class="columns">
        <div class="column is-offset-2 is-two-quarters">
            <section class="section">
            <div class="container">

                <div class="heading">
                    <h1 class="title">{{ticket.title}}</h1>
                </div>
                Articles here
            </div>
          </section>
        </div>
        <div class="column is-3 right-sidebar">
            <section class="section">
                <div class="container">
                    <h2 :class="['subtitle', `pri-${ticket.priority}`]">Pri: {{ticket.priority}}</h2>
                    <table class="table ticket-info-table">
                        <tr>
                            <td><strong>Ticket ID</strong></td><td>{{ticket.tid}}</td>
                        </tr>
                        <tr>
                            <td><strong>Ticket #</strong></td><td>{{ticket.tn}}</td>
                        </tr>
                        <tr>
                            <td><strong>Opprettet</strong></td><td>{{ticket.created}}</td>
                        </tr>
                        <tr>
                            <td><strong>Oppdatert</strong></td><td>{{ticket.updated}}</td>
                        </tr>
                        <tr>
                            <td><strong>Eier</strong></td><td>{{ticket.owner}}</td>
                        </tr>
                        <tr>
                            <td><strong>Ansvarlig</strong></td><td>{{ticket.responsible}}</td>
                        </tr>
                    </table>
                </div>
            </section>
        </div>
    </div>
</div>
</template>

<script>
import TopNav from 'components/TopNav'
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {...mapGetters({
    ticket: 'currentTicket',
  })},
  methods: mapActions([
  ]),
  created () {
    this.$store.dispatch('getTicketByTn', this.$route.params.tn)
  },
  components: {
    TopNav
  }
}
</script>
