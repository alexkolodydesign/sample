export const filterAction = (trailSystem, mapState) => {
  const recommendedUseFilter = Object.keys(mapState.trailType).filter((trailType) => mapState.trailType[trailType] ? true : false)
  const difficultyFilter = Object.keys(mapState.difficulty).filter((difficulty) => mapState.difficulty[difficulty] ? true : false)
  const trails = trailSystem.trails
    // Filter by Recommended Use
    .filter((trail) => {
      const trailTypes = Object.keys(trail.recommendedUse).filter((trailType) => trail.recommendedUse[trailType] ? true : false)
      let match = false
      for (var i = 0; i < recommendedUseFilter.length; i++) {
        if (trailTypes.includes(recommendedUseFilter[i]) ) match = true
      }
      if (mapState.exclude) {
        if (trailTypes.join("") != recommendedUseFilter.join("")) match = false
      }
      if (match) return true
      return false
    })
    // Filter by Seasons
    .filter((trail) => {
      if (!mapState.season) return true
      const trailSeasons = Object.keys(trail.seasons).filter((season) => trail.seasons[season] ? true : false)
      if (trailSeasons.includes(mapState.season)) return true
      return false
    })
    // Filter by Trail Length
    .filter((trail) => {
      if (!mapState.trailLength) return true
      if (Number(trail.length) >= Number(mapState.trailLength) ) return true
      return false
    })
    // Filter by Trail Traffic
    .filter((trail) => {
      if (!mapState.trailTraffic) return true
      if (trail.trailTraffic == mapState.trailTraffic) return true
      return false
    })
    // Filter by Route Type
    .filter((trail) => {
      if (!mapState.routeType) return true
      if (trail.routeType == mapState.routeType) return true
      return false
    })
    // Filter by Difficulty
    .filter((trail) => {
      if (!mapState.difficulty.default) return true
      if (trail.difficulty.default == mapState.difficulty.default) return true
      return false
    })


  const newTrailSystem = {...trailSystem, trails: trails}
  return newTrailSystem
}
