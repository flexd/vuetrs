import otrs from '../../api/otrs'
import Vue from 'vue'
import * as types from '../mutation-types'

// initial state
const state = {
    categories: {},
    current_ticket: {},
}

// getters
const getters = {
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

        for (let category of Array.from(state.categories)) {
            let checkedTickets = category.tickets.filter(t => t.checked).map(t => t.tn)

            tickets.push(checkedTickets)
        }
        console.log(tickets)
        return tickets
    },
}

// actions
const actions = {
    getAllTickets ({ commit}, queue) {
        otrs.getTickets(queue, tickets => {
            tickets.forEach(ticket => { ticket.checked = false })
            commit(types.RECEIVE_TICKETS, { queue, tickets })
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
    toggleQueue ({ commit }, queue) {
        commit(types.TOGGLE_QUEUE_CHECKED, queue)
    }
}

// mutations
const mutations = {
    [types.RECEIVE_TICKETS] (state, { queue, tickets }) {
        state.categories[queue] = {name: queue, tickets: tickets}
    },
    [types.RECEIVE_SINGLE_TICKET] (state, { ticket }) {
        state.current_ticket = ticket
    },
    [types.TOGGLE_TICKET_CHECKED] (state, ticket) {
        var ticketIdx = state.categories[ticket.queue].tickets.findIndex(x => x.tn == ticket.tn)

        let t = state.categories[ticket.queue].tickets[ticketIdx]
        t.checked = !t.checked
        state.categories[ticket.queue].tickets.splice(ticketIdx, 1, t)
        console.log(ticket.tn + " is " + t.checked)
    },
    [types.TOGGLE_QUEUE_CHECKED] (state, queue) {
        for (let ticket of state.categories[queue].tickets) {
            console.log(ticket)
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
