const axios = require('axios');

exports.getEventData = async (req, res) => {
  try {
    const { data: events } = await axios.get(
      `${process.env.API_URL}/wp-json/wp/v2/washco_event?per_page=100`
    );
    // console.log(events)
    res.status(200).json(events);
  } catch (e) {
    console.log('Issue arose.', e);
    res.status(500).send('Error');
  }
};
