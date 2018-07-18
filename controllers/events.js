const axios = require("axios");


exports.getEventData = async (req, res) => {
  try {
    const { data: [event] } = await axios.get('http://washcotrails.flitchbeta.com/wp-json/wp/v2/events');
    res.status(200).json(event);
  } catch(e) {
    console.log("Issue arose.", e);
    res.status(500).send("Error")
  }
}
