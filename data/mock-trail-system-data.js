const trailSystem = {
  handle: 'zion-national-park',
  title: 'Zion National Park',
  region: 'Canyon',
  trails: [
    {
      title: "Alpine Mountain Hike",
      length: "2.3",
      highlights: "wide open, wastelands",
      difficulty: {
        default: "Easy",
        hiking: "Moderate",
        biking: "Moderate",
        horseback: "Moderate"
      },
      seasons: {
        spring: true,
        summer: true,
        fall: true,
        winter: true
      },
      region: "Canyon",
      recommendedUse: {
        hiking: true,
        biking: true,
        atv: true,
        horseback: true
      },
      routeType: "loop",
      image: "https://placehold.it/75x75?text=Zion"
    },
    {
      title: "Bear Mountain Wilderness",
      length: "2.1",
      highlights: "high altitude, forest",
      difficulty: {
        default: "Easiest",
        hiking: "Moderate",
        biking: "Moderate",
        horseback: "Moderate"
      },
      seasons: {
        spring: true,
        summer: true,
        fall: true,
        winter: false
      },
      region: "Alpine",
      recommendedUse: {
        hiking: true,
        biking: true,
        atv: false,
        horseback: true
      },
      routeType: "connector",
      image: "https://placehold.it/75x75?text=Bear"
    },
    {
      title: "Cinderlake Flats",
      length: "1.3",
      highlights: "creeks, red rocks, sand",
      difficulty: {
        default: "Challenging",
        hiking: "Moderate",
        biking: "Moderate",
        horseback: "Moderate"
      },
      region: "Canyon",
      recommendedUse: {
        hiking: true,
        biking: false,
        atv: false,
        horseback: false
      },
      seasons: {
        spring: true,
        summer: true,
        fall: false,
        winter: false
      },
      routeType: "in and back",
      image: "https://placehold.it/75x75?text=Cinder"
    },
    {
      title: "Dance of Deers",
      length: "6.9",
      highlights: "creeks, red rocks, sand",
      difficulty: {
        default: "Very Difficult",
        hiking: "Moderate",
        biking: "Moderate",
        horseback: "Moderate"
      },
      seasons: {
        spring: true,
        summer: false,
        fall: false,
        winter: false
      },
      region: "Mesa",
      recommendedUse: {
        hiking: true,
        biking: false,
        atv: true,
        horseback: true
      },
      routeType: "loop",
      image: "https://placehold.it/75x75?text=Deer"
    },
    {
      title: "Echo Base",
      length: "5.4",
      highlights: "creeks, red rocks, sand",
      difficulty: {
        default: "Moderate",
        hiking: "Moderate",
        biking: "Moderate",
        horseback: "Moderate"
      },
      seasons: {
        spring: false,
        summer: true,
        fall: true,
        winter: false
      },
      region: "Mesa",
      recommendedUse: {
        hiking: true,
        biking: false,
        atv: true,
        horseback: true
      },
      routeType: "connector",
      image: "https://placehold.it/75x75?text=Echo"
    }
  ]
}

exports.trailSystem = trailSystem;
