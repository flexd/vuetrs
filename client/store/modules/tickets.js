import otrs from '../../api/otrs'
import Vue from 'vue'
import * as types from '../mutation-types'

// initial state
const state = {
    categories: [],
    current_ticket: {},
}

// getters
const getters = {
    categories: state => state.categories,
    allTickets: state => (queue) => state.categories[queue].tickets,
    currentTicket: state => state.current_ticket,
    categoryFromName: state => (categoryName) => {
        return state.categories.find(category => category.categoryName == categoryName)
    },
    pendingTickets: state => (queue) => {
         let i = state.categories.indexOf(queue)
        return state.categories[i].tickets.filter(function (ticket) {
            return ticket.state.includes('pending')
        })
    },
    openTickets: state => (queue) => {
         let i = state.categories.indexOf(queue)
        return state.categories[i].tickets.filter(function (ticket) {
            return ['open', 'new', 'followup', 'open (new)'].includes(ticket.state)
        })
    },
    selectedTickets: state => {
        let tickets = []

        for (let category of state.categories) {
            let checkedTickets = category.tickets.filter(t => t.checked).map(t => t.tn)

            tickets.push(...checkedTickets)
        }
        return tickets
    },
    ticketCountByCategory: (state,getters) => (categoryName) => {
        console.log("categoryName is: " + categoryName)
        let category = getters.categoryFromName(categoryName)
        console.log("Category is: " + category)
        return category.tickets.filter(ticket => ticket.queue == categoryName).length
     },
}

// actions
const actions = {
    getAllTickets ({ commit, state, getters}, categoryName) {
        console.log(categoryName)
        var category = getters.categoryFromName(categoryName)
        console.log(category)
        otrs.getTickets(categoryName, tickets => {
            tickets.forEach(ticket => { ticket.checked = false })
            commit(types.RECEIVE_TICKETS, { category: category, tickets: tickets })
        })
    },
    getTicketByTn ({ commit}, tn) {
        otrs.getTicketByTn(tn, ticket => {
            ticket.checked = false
            commit(types.RECEIVE_SINGLE_TICKET, { ticket })
        })
    },
    toggleTicketChecked ({ commit }, params) {
        commit(types.TOGGLE_TICKET_CHECKED, {category: params.category, ticket: params.ticket})
    },
    toggleCategoryChecked ({ commit }, category) {
        commit(types.TOGGLE_CATEGORY_CHECKED, category)
    },
    initCategories ( { commit }, categories) {
        commit(types.INIT_CATEGORIES, categories)
    }
}

// mutations
const mutations = {
    [types.RECEIVE_TICKETS] (state, params) {
         let i = state.categories.indexOf(params.category)
         state.categories[i].tickets = params.tickets
    },
    [types.RECEIVE_SINGLE_TICKET] (state, { ticket }) {
        state.current_ticket = ticket
    },
    [types.TOGGLE_TICKET_CHECKED] (state, params) {
        let i = state.categories.indexOf(params.category)
        let ticketIdx = state.categories[i].tickets.findIndex(x => x.tn == params.ticket.tn)

        let t = state.categories[i].tickets[ticketIdx]
        t.checked = !t.checked
        state.categories[i].tickets.splice(ticketIdx, 1, t)
    },
    [types.TOGGLE_CATEGORY_CHECKED] (state, category) {
        let i = state.categories.indexOf(category)
        for (let ticket of state.categories[i].tickets) {
            ticket.checked = !state.categories[i].selected
        }
        state.categories[i].selected = !state.categories[i].selected
    },
    [types.INIT_CATEGORIES] (state, categories) {
        categories.forEach(c => {
            state.categories.push({
                categoryName: c,
                tickets: [],
                selected: false
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
