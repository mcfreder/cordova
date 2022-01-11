import m from 'mithril'

const register = {
  email: '',
  password: '',
  message: '',

  postReg: async function () {
    const payload = {
      email: register.email,
      password: register.password,
      api_key: 'ADD_YOUR_KEY_HERE'
    };

    const result = await m.request({
      url: 'https://auth.emilfolino.se/register',
      method: 'POST',
      data: payload
    })

    register.message = result.data.message
  }
}

export default register
