import m from 'mithril'

const vanilla = {
  toTop: function () {
    var returnButton = document.getElementById('return-to-top')
    var header = document.getElementsByClassName('header__search')[0]

    header.onscroll = function () {
      if (header.scrollTop >= 60) {
        returnButton.style.display = 'block'
      } else {
        returnButton.style.display = 'none'
      }
    }

    returnButton.addEventListener('click', function () {
      var scrollStep = -header.scrollTop / (200 / 15)
      var scrollInterval = setInterval(function () {
        if (header.scrollTop != 0) {
          header.scrollBy(0, scrollStep)
        } else {
          clearInterval(scrollInterval)
        }
      }, 15)
    })
  },

  date: function (date) {
    var eventDate = new Date(date)
    var month = new Array()

    month[0] = 'January'
    month[1] = 'February'
    month[2] = 'March'
    month[3] = 'April'
    month[4] = 'May'
    month[5] = 'June'
    month[6] = 'July'
    month[7] = 'August'
    month[8] = 'September'
    month[9] = 'October'
    month[10] = 'November'
    month[11] = 'December'

    var dd = eventDate.getDate()
    var mm = month[eventDate.getMonth()]
    var yyyy = eventDate.getFullYear()

    if (dd < 10) {
      dd = '0' + dd
    }

    eventDate = mm + ' ' + dd + ', ' + yyyy

    return m('a', eventDate)
  },

  today: function () {
    var today = new Date()
    var month = new Array()

    month[0] = 'January'
    month[1] = 'February'
    month[2] = 'March'
    month[3] = 'April'
    month[4] = 'May'
    month[5] = 'June'
    month[6] = 'July'
    month[7] = 'August'
    month[8] = 'September'
    month[9] = 'October'
    month[10] = 'November'
    month[11] = 'December'

    var dd = today.getDate()
    var mm = month[today.getMonth()]
    var yyyy = today.getFullYear()

    if (dd < 10) {
      dd = '0' + dd
    }

    today = mm + ' ' + dd + ', ' + yyyy

    return m('a', today)
  },
}

export default vanilla
