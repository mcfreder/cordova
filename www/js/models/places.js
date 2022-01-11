import m from 'mithril'

import L from 'leaflet'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import maper from './maper.js'


const places = {
  address: undefined,
  results: undefined,

  showMap: function () {
    const map = L.map('map').setView([maper.userlatitude, maper.userlongitude], 15)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

    places.renderMarker(map)
  },

  renderMarker: function (map) {
    const yourMarker = L.icon({
      iconUrl: 'img/blue-marker.png',
      iconSize: [24, 30],
      iconAnchor: [12, 12],
      popupAnchor: [0, 0]
    })

    const placeMarker = L.icon({
      iconUrl: 'img/red-marker.png',
      iconSize: [24, 30],
      iconAnchor: [12, 12],
      popupAnchor: [0, 0]
    })

    const geocoder = new OpenStreetMapProvider()

    geocoder
      .search({ query: places.address })
      .then(function (result) {
        if (result.length > 0) {
          L.marker(
            [maper.userlatitude, maper.userlongitude],
            { icon: placeMarker }
          ).addTo(map).bindPopup('Din position')
          L.marker(
            [result[0].y, result[0].x],
            { icon: yourMarker }
          ).addTo(map).bindPopup(places.address)
        } else {
          places.results = 'Failed to find destination.'
          m.route.set('/error')
        }
      })
  }
}

export default places
