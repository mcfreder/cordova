import m from 'mithril'

const maper = {
  map: '',
  infowindow: '',
  userlatitude: undefined,
  userlongitude: undefined,
  eventlatitude: undefined,
  eventlongitude: undefined,
  result: undefined,
  eventName: undefined,
  status: undefined,

  getPlacesLocation: function () {
    navigator.geolocation.getCurrentPosition(
      maper.onPlacesSuccess,
      maper.onPlacesError,
      { enableHighAccuracy: true }
    )
  },

  onPlacesSuccess: function (position) {
    maper.userlatitude = position.coords.latitude
    maper.userlongitude = position.coords.longitude

    maper.getPlaces()
  },

  getPlaces: function () {
    var eventLatLong = new google.maps.LatLng(maper.eventlatitude, maper.eventlongitude)

    var mapOptions = {
      center: new google.maps.LatLng(maper.userlatitude, maper.userlongitude),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    maper.map = new google.maps.Map(document.getElementById("places"), mapOptions)
    maper.infowindow = new google.maps.InfoWindow()

    var service = new google.maps.places.PlacesService(maper.map)

    service.nearbySearch({
      location: eventLatLong,
      radius: 3000,
      type: ['bar']
    }, maper.foundStoresCallback)
  },

  onPlacesWatchSuccess: function (position) {
    var updatedLatitude = position.coords.latitude
    var updatedLongitude = position.coords.longitude

    if (updatedLatitude != maper.userlatitude && updatedLongitude != maper.userlongitude) {
      maper.userlatitude = updatedLatitude
      maper.userlongitude = updatedLongitude

      maper.getPlaces(updatedLatitude, updatedLongitude)
    }
  },

  foundStoresCallback: function (results) {
    maper.result = results
    console.log(maper.result)

    m.route.set("/map")
  },

  onPlacesError: function (error) {
    console.log('code: ' + error.code + '\n' +
      'message: ' + error.message + '\n')
  },

  watchPlacesPosition: function () {
    return navigator.geolocation.watchPosition(
      maper.onPlacesWatchSuccess,
      maper.onPlacesError,
      { enableHighAccuracy: true }
    )
  },
}

export default maper
