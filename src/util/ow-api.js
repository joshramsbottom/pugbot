import fetch from 'node-fetch'

const API = 'https://owapi.net/api/v3/u'

export async function getCompRating(battleTag) {
  if (!battleTag) {
    return 'N/A'
  }

  const URL = `${API}/${battleTag.replace('#', '-')}/stats`
  const rsp = await fetch(encodeURI(URL))
  const json = await rsp.json()

  if (json.error) {
    return 'N/A'
  }

  if (json.eu.stats.competitive.overall_stats.comprank) {
    return json.eu.stats.competitive.overall_stats.comprank
  }

  return 'N/A'
}
