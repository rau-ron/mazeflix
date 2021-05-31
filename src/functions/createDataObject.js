export function createShowObject(type, show) {
  if (type === 'show-card') {
    return {
      id: show.id || '',
      title: show.name || '',
      genres: show.genres || [],
      image: {
        medium:
          (show.image && show.image.medium) ||
          require('../assets/default-poster.png'),
        original:
          (show.image && show.image.original) ||
          require('../assets/default-poster.png'),
      },
    }
  } else if (type === 'show-page') {
    return {
      id: show.id || '',
      title: show.name || '',
      image: {
        medium:
          (show.image && show.image.medium) ||
          require('../assets/default-poster.png'),
        original:
          (show.image && show.image.original) ||
          require('../assets/default-poster.png'),
      },
      summary: show.summary || '',
      genres: show.genres || [],
      network: show.network || null,
      language: show.language || '',
      premiered: show.premiered || '',
      status: show.status || '',
      cast: show._embedded.cast || [],
      seasons: show._embedded.seasons || [],
    }
  }
}

export function createEpisodeObject(episode) {
  return {
    id: episode.id || '',
    title: episode.name || '',
    number: episode.number || '',
    season: episode.season || '',
    airtime: episode.airtime || '',
    airstamp: episode.airstamp || '',
    show: {
      id: episode.show.id || '',
      title: episode.show.name || '',
      image: {
        medium:
          (episode.show.image && episode.show.image.medium) ||
          require('../assets/default-poster.png'),
        original:
          (episode.show.image && episode.show.image.original) ||
          require('../assets/default-poster.png'),
      },
      network: (episode.show.network && episode.show.network.name) || null,
    },
  }
}

export function createFutureEpisodeObject(episode, showName, showId) {
  return {
    id: episode.id || '',
    showId: showId || '',
    showName: showName || '',
    title: episode.name || '',
    season: episode.season || '',
    number: episode.number || '',
    airdate: episode.airdate || '',
    airtime: episode.airtime || '',
    airstamp: episode.airstamp || '',
  }
}

export function createShowsArrayForResults(data) {
  const showsArray = []
  data.forEach((item) => {
    showsArray.push(createShowObject('show-card', item.show))
  })
  return showsArray
}
