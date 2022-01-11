import m from 'mithril'

import maper from './maper.js'

const auth = {
  email: '',
  password: '',
  token: '',
  observeError: '',
  needLogin: undefined,

  clear: function () {
    auth.email = ''
    auth.password = ''
  },

  login: async function () {
    var payload = {
      email: auth.email,
      password: auth.password,
      api_key: 'ADD_YOUR_KEY_HERE'
    }

    try {
      const result = await m.request({
        url: 'https://auth.emilfolino.se/login',
        method: 'POST',
        data: payload
      })

      auth.token = result.data.token;

      (!maper.userlatitude) ? m.route.set('/') : m.route.set('/print-map')
    } catch (error) {
      auth.observeError = error
    }
  }
}

export default auth
