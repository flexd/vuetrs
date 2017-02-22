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
    pendingTickets: state => (queue) => {
        return state.categories[queue].tickets.filter(function (ticket) {
            return ticket.state.includes('pending')
        })
    },
    openTickets: state => (queue) => {
        return state.categories[queue].tickets.filter(function (ticket) {
            return ['open', 'new', 'followup', 'open (new)'].includes(ticket.state)
        })
    },
    selectedTickets: state => {
        let tickets = []

        for (let category of state.categories) {
            let checkedTickets = category.tickets.filter(t => t.checked).map(t => t.tn)

            tickets.push(checkedTickets)
        }
        console.log(tickets)
        return tickets
    },
}

// actions
const actions = {
    getAllTickets ({ commit}, category) {
        otrs.getTickets(category.categoryName, tickets => {
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
    toggleTicketChecked ({ commit }, t) {
        commit(types.TOGGLE_TICKET_CHECKED, t)
    },
    toggleQueue ({ commit }, category) {
        commit(types.TOGGLE_CATEGORY_CHECKED, category)
    },
    initCategories ( { commit }, categories) {
        commit(types.INIT_CATEGORIES, categories)
    }
}

// mutations
const mutations = {
    [types.RECEIVE_TICKETS] (state, params) {
        console.log(params.category)
        console.log(params.tickets)
        console.log(state.categories[params.category])
        state.categories[params.category].tickets = params.tickets
    },
    [types.RECEIVE_SINGLE_TICKET] (state, { ticket }) {
        state.current_ticket = ticket
    },
    [types.TOGGLE_TICKET_CHECKED] (state, category, ticket) {
        var ticketIdx = state.categories[category].tickets.findIndex(x => x.tn == ticket.tn)

        let t = state.categories[category].tickets[ticketIdx]
        t.checked = !t.checked
        state.categories[category].tickets.splice(ticketIdx, 1, t)
        console.log(ticket.tn + " is " + t.checked)
    },
    [types.TOGGLE_CATEGORY_CHECKED] (state, category) {
        for (let ticket of state.categories[category].tickets) {
            console.log(ticket)
        }
    },
    [types.INIT_CATEGORIES] (state, categories) {
        categories.forEach(c => {
            state.categories.push({
                categoryName: c,
                tickets: []
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
