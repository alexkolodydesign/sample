const regions = [
  {
    id: 3,
    name: 'alpine'
  },
  {
    id: 5,
    name: 'mesa'
  },
  {
    id: 6,
    name: 'urban'
  },
  {
    id: 2,
    name: 'canyon'
  },
  {
    id: 4,
    name: 'desert'
  }
];

const filterActions = (trails, filters, zoomLevel) => {
  if (!trails || trails.length < 1) return [];
  const recommendedUseFilter = Object.keys(filters.trailType).filter(
    trailType => !!filters.trailType[trailType]
  );
  const updatedTrails = trails
    // Filter by Trail Type
    .filter(trail => {
      if (
        trail.custom_data &&
        trail.custom_data.trailType &&
        trail.custom_data.trailType !== ''
      ) {
        const trailTypes = trail.custom_data.trailType.map(type => type.value);
        let match = false;
        for (let i = 0; i < recommendedUseFilter.length; i += 1) {
          if (trailTypes.includes(recommendedUseFilter[i])) match = true;
        }
        if (filters.exclude) {
          if (trailTypes.join('') !== recommendedUseFilter.join('')) match = false;
        }
        if (match) return true;
        return false;
      }
      return false;
    })
    // Filter by Trail Length
    .filter(trail => {
      if (!filters.trailLength) return true;
      if (Number(trail.custom_data.length) >= Number(filters.trailLength)) return true;
      return false;
    })
    // Filter by Trail Traffic
    .filter(trail => {
      if (!filters.trailTraffic) return true;
      if (trail.custom_data.trailTraffic.value === filters.trailTraffic) return true;
      return false;
    })
    // Filter by Route Type
    .filter(trail => {
      if (!filters.routeType) return true;
      if (trail.custom_data.routeType.value === filters.routeType) return true;
      return false;
    })
    // Filter by Difficulty
    .filter(trail => {
      if (!filters.difficulty.default) return true;
      if (
        trail.custom_data.difficulty.defaultDifficulty.value ===
        filters.difficulty.default
      )
        return true;
      return false;
    })
    // Filter by Zoom
    .filter(trail => {
      if (zoomLevel === true) return true;
      if (Number(zoomLevel) >= Number(trail.custom_data.zoomThreshold)) return true;
      return false;
    })
    // Filter by Regions
    .filter(trail => {
      if (trail.regions && trail.regions.length > 0) {
        const activeRegions = filters.regions;
        const match = trail.regions.some(regionId => {
          const { name } = regions.find(region => region.id === regionId);
          if (activeRegions[name] === true) return true;
          return false;
        });
        if (match) return true;
        return false;
      }
      return false;
    });
  return updatedTrails;
};

export default filterActions;
