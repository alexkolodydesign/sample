export const filterAction = (trails, filters, zoomLevel) => {
  if (!trails || trails.length < 1) return []
  const recommendedUseFilter = Object.keys(filters.trailType).filter((trailType) => filters.trailType[trailType] ? true : false)
  const difficultyFilter = Object.keys(filters.difficulty).filter((difficulty) => filters.difficulty[difficulty] ? true : false)
  const updatedTrails = trails
    // Filter by Recommended Use
    .filter((trail) => {
      if (trail.custom_data && trail.custom_data.recommendedUse && trail.custom_data.recommendedUse !== "") {
        const trailTypes = trail.custom_data.recommendedUse.map(type => type.value)
        let match = false
        for (var i = 0; i < recommendedUseFilter.length; i++) {
          if (trailTypes.includes(recommendedUseFilter[i]) ) match = true
        }
        if (filters.exclude) {
          if (trailTypes.join("") != recommendedUseFilter.join("")) match = false
        }
        if (match) return true
        return false
      }
      return false
    })
    // Filter by Trail Length
    .filter((trail) => {
      if (!filters.trailLength) return true
      if (Number(trail.custom_data.length) >= Number(filters.trailLength) ) return true
      return false
    })
    // Filter by Trail Traffic
    .filter((trail) => {
      if (!filters.trailTraffic) return true
      if (trail.custom_data.trailTraffic.value == filters.trailTraffic) return true
      return false
    })
    // Filter by Route Type
    .filter((trail) => {
      if (!filters.routeType) return true
      if (trail.custom_data.routeType.value == filters.routeType) return true
      return false
    })
    // Filter by Difficulty
    .filter((trail) => {
      if (!filters.difficulty.default) return true
      if (trail.custom_data.difficulty.defaultDifficulty.value == filters.difficulty.default) return true
      return false
    })
    // Filter by Zoom
    .filter(trail => {
      if (zoomLevel === true) return true
      if (Number(zoomLevel) >= Number(trail.custom_data.zoomThreshold)) return true
      return false
    })
  return updatedTrails
}
