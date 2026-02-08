import axios from 'axios'

export default function ({ $auth, redirect }) {
  const host = process.env.baseUrl // 'https://api.cybert.online'

  return axios.get(`${host}/auth/check_user/`, {
    params: {
      userID: $auth.user.id
    }
  }).then((response) => {
    const responseData = JSON.parse(response.data)
    // console.log('ST_ID check: ', responseData)
    // console.log($auth.user)
    if (!responseData.success) {
      if (responseData.err) { console.log(responseData.err) }
      return redirect('/cabinet/')
    }
  }).catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err)
    return redirect('/cabinet/')
  })
}
