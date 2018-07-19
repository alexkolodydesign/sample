const axios = require("axios");
const { regions } = require('../data/regions');

exports.getTrailData = async (req, res) => {
  try {
    const trailHandle = req.params.trail;
    if (!trailHandle) {
      res.statusMessage = "Missing Trail Handle"
      res.status(422)
    }
    const { data: [trail] } = await axios.get(`http://washcotrails.flitchbeta.com/wp-json/wp/v2/trails?slug=${trailHandle}`);
    res.status(200).json(trail);
  } catch(e) {
    console.log("Issue arose.", e);
    res.status(500).send("Error")
  }
}

exports.getRegionData = async (req, res) => {
  try {
    const { data: trails } = await axios.get('http://washcotrails.flitchbeta.com/wp-json/wp/v2/trails?per_page=500&order=asc&region=2');
    return res.json({
      regions,
      trails
    });
  } catch(e) {
    console.log("Issue arose.");
    return res.status(500).send("Error: ", e)
  }
}

exports.getCoordinates = async (req, res) => {
  const url = req.query.url
  if (!url) return res.status(500)
  try {
    const { data: trail } = await axios.get(url);
    return res.json({ trail });
  } catch(e) {
    console.log("Issue arose.");
    return res.status(500).send("Error: ", e)
  }
}
