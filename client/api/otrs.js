/**
 * Mocking client-server processing
 */
const _tickets = [
  {"priority": 1, 
      "created": "2017-02-15 11:27:13",
      "updated": "2017-02-15 11:27:13",
      "tn": "123456789",
      "tid": "48484",
      "article_count": 10,
      "state": "open",
      "queue": "Incident Handling",
      "title": "Ticket title",
      "owner": "Some owner",
      "responsible": "Some responsible guy"},
  {"priority": 1, 
      "created": "2017-02-15 11:27:13",
      "updated": "2017-02-15 11:27:13",
      "tn": "987654321",
      "tid": "48484",
      "article_count": 10,
      "state": "pending",
      "queue": "Incident Handling",
      "title": "Ticket title",
      "owner": "Some owner",
      "responsible": "Some responsible guy"},
  {"priority": 2, 
      "created": "2017-02-15 11:27:13",
      "updated": "2017-02-15 11:27:13",
      "tn": "5555555",
      "tid": "48484",
      "article_count": 5,
      "state": "followup",
      "queue": "Incident Handling",
      "title": "Ticket title",
      "owner": "Some owner",
      "responsible": "Some responsible guy"},
  {"priority": 2, 
      "created": "2017-02-15 11:27:13",
      "updated": "2017-02-15 11:27:13",
      "tn": "3333333",
      "tid": "48484",
      "article_count": 5,
      "state": "followup",
      "queue": "Post",
      "title": "Ticket title",
      "owner": "Some owner",
      "responsible": "Some responsible guy"},
  {"priority": 2, 
      "created": "2017-02-15 11:27:13",
      "updated": "2017-02-15 11:27:13",
      "tn": "333322333",
      "tid": "48422284",
      "article_count": 5,
      "state": "pending",
      "queue": "Post",
      "title": "Ticket title",
      "owner": "Some owner",
      "responsible": "Some responsible guy"},
  {"priority": 2, 
      "created": "2017-02-15 11:27:13",
      "updated": "2017-02-15 11:27:13",
      "tn": "3348484848",
      "tid": "448484",
      "article_count": 5,
      "state": "followup",
      "queue": "OPS",
      "title": "Ticket title",
      "owner": "Some owner",
      "responsible": "Some responsible guy"},
]

export default {
  getTickets (queue, cb) {
        var tickets = _tickets.filter(function (ticket) {
            return ticket.queue == queue
        })
        cb(tickets)
  },
  getTicketByTn (tn, cb) {
        var tickets = _tickets.filter(function (ticket) {
            return ticket.tn == tn
        })
        cb(tickets[0])
  },
}
