<template>
<div>
    <table class="table is-bordered">
        <thead>
            <th><input type="checkbox"/></th>
            <th>Pri</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Ticket #</th>
            <th>Art.</th>
            <th>State</th>
            <th>Queue</th>
            <th>Title</th>
            <th>Owner</th>
            <th>Responsible</th>
<th colspan=4></th>
        </thead>
        <tbody>
            <tr v-for="t in tickets">
              <td><input :checked="t.checked" @change="toggleTicketChecked(t)" :id="t.tn" :value="t.tn" type="checkbox"/></td>
              <td>{{ t.priority }}</td>
              <td>{{ t.created }}</td>
              <td>{{ t.updated }}</td>
              <td><router-link :to="{name: 'ticket', params: { tn: t.tn}}">{{ t.tn }}</router-link></td>
              <td>{{ t.article_count }}</td>
              <td>{{ t.state }}</td>
              <td>{{ t.queue }}</td>
              <td>{{ t.title }}</td>
              <td>{{ t.owner }}</td>
              <td>{{ t.responsible }}</td>
              <td class="button action-button is-danger">X</td>
              <td class="button action-button is-info">N</td>
            </tr>
        </tbody>
    </table>
    </div>
</template>
<style>
.action-button {
    border:0;
    display:none;
}
tr:hover .action-button {
    display:table-cell;
}
</style>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    props: ['tickets'],
    computed: mapGetters({
      selectedTickets: 'selectedTickets',
    }),
    methods: {
        ...mapActions({
            toggleTicketChecked: 'toggleTicketChecked',
            toggleQueueChecked: 'toggleQueueChecked'
        }),
        //selectAllTickets: function (event) {
            //var allTickets = this.tickets.map(function (val) {
                //return val.tn
            //})
            //if (!event.target.checked) {
                //var that = this
                //this.tickets.forEach(function (t) {
                    //that.$store.dispatch("remove_from_selected", t.tn)
                //})
            //} else {
                //var that = this
                //this.tickets.forEach(function (t) {
                    //that.$store.dispatch("add_to_selected", t.tn)
                //})
            //}
        //},
        //selectedEvent: function (event) {
            //if (!event.target.checked) {
                //this.$store.dispatch("remove_from_selected", event.target.id)
            //} else {
                //this.$store.dispatch("add_to_selected", event.target.id)
            //}
        //},
    }
}
</script>
