import {
  createEpisodeObject,
  createFutureEpisodeObject,
} from './createDataObject.js'

export function filterEpisodesByAirtime(allEpisodes) {
  const filteredEpisodes = []
  allEpisodes.forEach((episode) => {
    const episodeDate = new Date(episode.airstamp)
    if (episodeDate.getTime() >= Date.now()) {
      filteredEpisodes.push(createEpisodeObject(episode))
    }
  })
  return filteredEpisodes
}

export function filterFutureEpisodes(data) {
  const episodesToCome = []
  const allEpisodes = data._embedded.episodes

  allEpisodes.forEach((episode) => {
    if (episode.airdate) {
      const episodeDate = new Date(episode.airstamp)
      if (episodeDate.getTime() >= Date.now()) {
        episodesToCome.push(
          createFutureEpisodeObject(episode, data.name, data.id)
        )
      }
    }
  })
  return episodesToCome
}

export function compareEpisodeDate(episodeA, episodeB) {
  const dateA = new Date(episodeA.airstamp)
  const dateB = new Date(episodeB.airstamp)
  return dateA.getTime() > dateB.getTime() ? 1 : -1
}
