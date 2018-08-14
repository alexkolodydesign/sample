import axios from 'axios'

export const getCoordinates = async (jsonCoordinates, slug) => {
  if (!jsonCoordinates) return null
  try {
    const {data: { trail }} = await axios.get('/api/coordinates', {params: {url: encodeURI(jsonCoordinates.url)} } )
    // Store this data so we don't make extra calls when zooming
    const trailStorage = localStorage.getItem('trails')
    if (!trailStorage) {
      localStorage.setItem('trails', JSON.stringify([{
        slug: slug,
        coordinates: trail.coordinates
      }]))
    } else {
      const trailStorageJSON = JSON.parse(trailStorage)
      trailStorageJSON.push({
        slug: slug,
        coordinates: trail.coordinates
      })
      localStorage.removeItem('trails')
      localStorage.setItem('trails', JSON.stringify(trailStorageJSON))
    }
    return trail.coordinates
  } catch(e) {
    console.log("ERROR ", e)
    return null
  }
}
