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
      if (match) return true
      return false
    })
    // Filter by Difficulty
    // .filter((trail) => {
    //   const trailTypes = Object.keys(trail.recommendedUse).filter((trailType) => trail.recommendedUse[trailType] ? true : false)
    //   let match = false
    //   for (var i = 0; i < recommendedUseFilter.length; i++) {
    //     if (trailTypes.includes(recommendedUseFilter[i]) ) match = true
    //   }
    //   if (match) return true
    //   return false
    // })

  const newTrailSystem = {...trailSystem, trails: trails}
  return newTrailSystem
}
