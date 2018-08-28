export const filterAction = (trailsState, mapState) => {
  const recommendedUseFilter = Object.keys(mapState.trailType).filter((trailType) => mapState.trailType[trailType] ? true : false)
  const difficultyFilter = Object.keys(mapState.difficulty).filter((difficulty) => mapState.difficulty[difficulty] ? true : false)
  const trails = trailsState
    // Filter by Recommended Use
    .filter((trail) => {
      if (trail.custom_data.recommendedUse && trail.custom_data.recommendedUse !== "") {
        const trailTypes = trail.custom_data.recommendedUse.map(type => type.value)
        let match = false
        for (var i = 0; i < recommendedUseFilter.length; i++) {
          if (trailTypes.includes(recommendedUseFilter[i]) ) match = true
        }
        if (mapState.exclude) {
          if (trailTypes.join("") != recommendedUseFilter.join("")) match = false
        }
        if (match) return true
        return false
      }
      return false
    })
    // Filter by Trail Length
    .filter((trail) => {
      if (!mapState.trailLength) return true
      if (Number(trail.custom_data.length) >= Number(mapState.trailLength) ) return true
      return false
    })
    // Filter by Trail Traffic
    .filter((trail) => {
      if (!mapState.trailTraffic) return true
      if (trail.custom_data.trailTraffic.value == mapState.trailTraffic) return true
      return false
    })
    // Filter by Route Type
    .filter((trail) => {
      if (!mapState.routeType) return true
      if (trail.custom_data.routeType.value == mapState.routeType) return true
      return false
    })
    // Filter by Difficulty
    .filter((trail) => {
      if (!mapState.difficulty.default) return true
      if (trail.custom_data.difficulty.defaultDifficulty.value == mapState.difficulty.default) return true
      return false
    })


  const newTrailSystem = {...trailsState, trails: trails}
  return newTrailSystem
}
