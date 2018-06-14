const regionData = {
  handle: '',
  title: '',
  regions: [
    {
      regionName: "Alpine",
      markerIcon: "/static/images/regions/alpine-region.svg",
      markerCoordinates: { lat: 37.4, lng: -113.63 },
      kmlUrl: "http://192.241.222.22/washington-trails/alpine.kml",
      regionImage: ""
    },
    {
      regionName: "Mesa",
      markerIcon: "/static/images/regions/mesa-region.svg",
      markerCoordinates: { lat: 37.03, lng: -113.2 },
      kmlUrl: "http://192.241.222.22/washington-trails/mesa.kml",
      regionImage: ""
    },
    {
      regionName: "Urban",
      markerIcon: "/static/images/regions/urban-region.svg",
      markerCoordinates: { lat: 37.07, lng: -113.6 },
      kmlUrl: "http://192.241.222.22/washington-trails/urban.kml",
      regionImage: ""
    },
    {
      regionName: "Canyon",
      markerIcon: "/static/images/regions/canyon-region.svg",
      markerCoordinates: { lat: 37.25, lng: -113.05 },
      kmlUrl: "http://192.241.222.22/washington-trails/canyon.kml",
      regionImage: ""
    },
    {
      regionName: "Desert",
      markerIcon: "/static/images/regions/desert-region.svg",
      markerCoordinates: { lat: 37.1, lng: -113.9 },
      kmlUrl: "http://192.241.222.22/washington-trails/desert.kml",
      regionImage: ""
    }
  ],
  trails: [
    {
      title: "Alpine Mountain Hike",
      length: "2.3",
      highlights: "wide open, wastelands",
      difficulty: {
        default: "easy",
        hiking: "moderate",
        biking: "moderate",
        horseback: "moderate",
        atv: ""
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
      trailTraffic: "heavy",
      routeType: "loop",
      image: "https://placehold.it/75x75?text=Zion",
      gpx: "/static/example.gpx"
    },
    {
      title: "Bear Mountain Wilderness",
      length: "2.1",
      highlights: "high altitude, forest",
      difficulty: {
        default: "easy",
        hiking: "moderate",
        biking: "moderate",
        horseback: "moderate",
        atv: "easy"
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
      trailTraffic: "medium",
      routeType: "connector",
      image: "https://placehold.it/75x75?text=Bear"
    },
    {
      title: "Cinderlake Flats",
      length: "1.3",
      highlights: "creeks, red rocks, sand",
      difficulty: {
        default: "challenging",
        hiking: "moderate",
        biking: "moderate",
        horseback: "moderate",
        atv: ""
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
      trailTraffic: "medium",
      routeType: "in and back",
      image: "https://placehold.it/75x75?text=Cinder"
    },
    {
      title: "Dance of Deers",
      length: "6.9",
      highlights: "creeks, red rocks, sand",
      difficulty: {
        default: "challenging",
        hiking: "moderate",
        biking: "moderate",
        horseback: "moderate",
        atv: ""
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
      trailTraffic: "light",
      routeType: "loop",
      image: "https://placehold.it/75x75?text=Deer"
    },
    {
      title: "Echo Base",
      length: "5.4",
      highlights: "creeks, red rocks, sand",
      difficulty: {
        default: "moderate",
        hiking: "moderate",
        biking: "moderate",
        horseback: "moderate",
        atv: "easy"
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
      trailTraffic: "light",
      routeType: "connector",
      image: "https://placehold.it/75x75?text=Echo"
    }
  ]
}

exports.regionData = regionData;
