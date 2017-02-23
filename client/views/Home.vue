<template>
<div class="columns">
<div class="column is-3">
    <section class="section">
    <div class="container">
<aside class="menu">
  <p class="menu-label">
    Categories
  </p>
  <ul class="menu-list">
    <li v-for="category in categories">
    <router-link active-class="is-active" :to="{name: 'queue', params: { name: category.categoryName}}">{{category.categoryName}}</router-link>
    </li>
  </ul>
</aside>
  </section>
</div>
<div class="column">
    <section class="section">
    <div class="container">
        <router-view></router-view>
    </div>
  </section>
</div>
</div>
</template>

<script>
        //<ticket-list :category="categories[0]" v-if="categories.length"></ticket-list>
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
