import Axios from 'axios'

export default async function useFetchData(queryType, queryInputs) {
  const api = Axios.create({ baseURL: 'https://api.tvmaze.com/' })

  let URL = ''
  switch (queryType) {
    case 'shows-query':
      URL = queryInputs.inputText && `search/shows?q=${queryInputs.inputText}`
      break
    case 'show-by-id':
      URL = `shows/${queryInputs.showId}?embed[]=seasons&embed[]=cast`
      break
    case 'upcoming-episodes-by-id':
      URL = `shows/${queryInputs.showId}?embed[]=episodes`
      break
    case 'shows-airing-today':
      URL =
        queryInputs.country &&
        queryInputs.date &&
        `schedule?country=${queryInputs.country}&date=${queryInputs.date}`
      break
  }

  if (URL) {
    try {
      const response = await api.get(URL)
      if (response.status === 200) {
        return { status: 'OK', data: response.data, err: null }
      } else {
        return {
          status: 'FAILED',
          data: null,
          err: { response: response, message: response.statusText },
        }
      }
    } catch (error) {
      return { status: 'ERROR', data: null, err: error }
    }
  }
}
