import fetch from 'node-fetch'

const API = 'https://owapi.net/api/v3/u'

export async function getCompRating(battleTag) {
  const URL = `${API}/${battleTag.replace('#', '-')}/stats`
  const rsp = await fetch(URL)
  const json = await rsp.json()

  if (json.error) {
    return 'N/A'
  }

  if (json.eu.stats.competitive.overall_stats.comprank) {
    return json.eu.stats.competitive.overall_stats.comprank
  }

  return 'N/A'
}
