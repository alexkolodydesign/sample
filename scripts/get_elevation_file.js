const fs = require('fs');
const axios = require('axios');

run();

// Time out to make sure Google's Elevation API doesn't receive too many requests (Max is 100 requests per second)
const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

async function run() {

  fs.readFile( './SuicidalVertices.json', async (err, data) => {
    const json = JSON.parse(data)
    const coordinates = json.features.map(feature => ({ lat: feature.attributes.POINT_Y, lng: feature.attributes.POINT_X }) )
    const name = json.features[0].attributes["TRAIL_NAME"]
    const filename = name.toLowerCase().replace(/ /g, "_")
    for (let i = 0; i < coordinates.length; i++) {
      const { data: { results: [ { elevation: elevation } ] } } = await axios.get(`https://maps.googleapis.com/maps/api/elevation/json?key=AIzaSyAqrxAbb0g9d1C9GgKjGZ5OU-TGowpZqWQ&locations=
        ${coordinates[i].lat},${coordinates[i].lng}
      `)
      coordinates[i].elevation = elevation
      await timeout(100);
      console.log(`Point finished ${i} out of ${coordinates.length}`);
    }

    // Create final trail variable to store
    const trail = { name, filename, coordinates }
    // Write trail file
    fs.writeFile(`./trails/${filename}.json`, trail, 'utf8', () => {
      console.log(`Wrote ${filename} into a new file!`)
    });

   });
}
