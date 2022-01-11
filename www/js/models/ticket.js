import m from 'mithril'

const ticketmaster = {
  apikey: 'ADD_YOUR_KEY_HERE',
  baseUrl: 'https://app.ticketmaster.com/discovery/v2/events.json',
  results: [],
  alertResult: '',

  getSearch: function (searchstring) {
    m.request({
      method: 'GET',
      url: ticketmaster.baseUrl + '?keyword=' + searchstring + ticketmaster.apikey,
      dataType: 'json'
    }).then(function (json) {
      if (json._embedded) {
        ticketmaster.results = json._embedded.events
        ticketmaster.alertResult = ''
        m.route.set('/event-result')
      } else {
        ticketmaster.results = []
        ticketmaster.alertResult = 'No results found.'
      }
    })
  },
}



export default ticketmaster
