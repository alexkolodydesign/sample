const axios = require("axios");

exports.getTrailData = async (req, res) => {
  try {
    const trailHandle = req.params.trail;
    if (!trailHandle) {
      res.statusMessage = "Missing Trail Handle"
      res.status(422)
    }
    const { data: [trail] } = await axios.get(`http://washcotrails.flitchbeta.com/wp-json/wp/v2/trails?slug=${trailHandle}`);
    res.status(200).json({trail});
  } catch(e) {
    // console.log("Issue arose.", e);
    return res.status(e.response.status).send("Error")
  }
}

exports.getTrails = async (req, res) => {
  try {
    const { data: trails } = await axios.get('http://washcotrails.flitchbeta.com/wp-json/wp/v2/trails?per_page=500&order=asc&fields=title,slug,custom_data,regions');
    res.status(200).json(trails);
  } catch(e) {
    // console.log("Issue arose.", e);
    return res.status(e.response.status).send("Error")
  }
}

exports.getRegionData = async (req, res) => {
  try {
    const { data: regions } = await axios.get('http://washcotrails.flitchbeta.com/wp-json/wp/v2/regions');
    const regionsArray = regions.map((region) => {
      const lat = region.custom_data.markerCoordinates ? Number(region.custom_data.markerCoordinates.marker_latitude) : 0
      const lng = region.custom_data.markerCoordinates ? Number(region.custom_data.markerCoordinates.marker_longitude) : 0
      return {
        regionName: region.name,
        markerIcon: region.custom_data.markerIcon,
        markerCoordinates: { lat, lng },
        regionImage: region.custom_data.regionImage,
        overlayImage: region.custom_data.region_background_image
      }
    })
    return res.json(regionsArray);
  } catch(e) {
    // console.log("Issue arose.", e);
    return res.status(e.response.status).send("Error")
  }
}

exports.getCoordinates = async (req, res) => {
  const url = req.query.url
  if (!url) {
    res.statusMessage = 'Missing URL';
    return res.sendStatus(400)
  }
  try {
    const { data: trail } = await axios.get(url);
    return res.json({ trail });
  } catch(e) {
    // console.log("Issue arose.", e);
    console.log("BROKEN URL", url)
    return res.status(e.response.status).send("Error")
  }
}
