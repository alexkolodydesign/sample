const axios = require('axios');

exports.getGeneralData = async (req, res) => {
  try {
    const { data: general_data } = await axios.get(
      `${process.env.API_URL}/wp-json/acf/v3/options/app-general-data/`
    );
    res.status(200).json(general_data);
  } catch (e) {
    res.status(500).send('Error');
  }
};
