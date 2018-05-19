const region = {
  handle: '',
  title: '',
  region: '',
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
      region: "Canyon",
      recommendedUse: {
        hiking: true,
        horseback: true,
        biking: true,
        atv: true
      },
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
      region: "Alpine",
      recommendedUse: {
        hiking: true,
        horseback: true,
        biking: true,
        atv: false
      },
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
        horseback: false,
        biking: false,
        atv: false
      },
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
      region: "Mesa",
      recommendedUse: {
        hiking: true,
        horseback: true,
        biking: false,
        atv: true
      },
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
      region: "Mesa",
      recommendedUse: {
        hiking: true,
        horseback: true,
        biking: false,
        atv: true
      },
      image: "https://placehold.it/75x75?text=Echo"
    }
  ]
}

exports.region = region;
