const fs = require('fs');
const axios = require('axios');

run();

// Time out to make sure Google's Elevation API doesn't receive too many requests (Max is 100 requests per second)
const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

async function run() {

  fs.readFile( './GrassValleyATV.json', async (err, data) => {
    const json = JSON.parse(data)
    const coordinates = json.features.map(feature => ({ lat: feature.attributes.POINT_Y, lng: feature.attributes.POINT_X }) )
    const name = json.features[0].attributes["TRAIL_NAME"] || json.features[0].attributes["Trail_Name"]
    const filename = name.toLowerCase().replace(/ /g, "_")
    const fragments = chunkArray(coordinates, 150);
    let enhancedCoordinates = []

    for (let i = 0; i < fragments.length; i++) {
      // coordinates[i].elevation = elevation
      let url = `https://maps.googleapis.com/maps/api/elevation/json?key=AIzaSyAqrxAbb0g9d1C9GgKjGZ5OU-TGowpZqWQ&locations=`
      for (let k = 0; k < fragments[i].length; k++) {
        url += `${coordinates[i].lat},${coordinates[i].lng}`
        if (k === (fragments[i].length - 1)) {
          console.log("LAST POINT")
        } else {
          url += `|`
        }
      }
      const { data: { results } } = await axios.get(url)
      const newCoords = results.map(result => ({ lat: result.location.lat, lng: result.location.lng, elevation: result.elevation }))
      enhancedCoordinates.push(...newCoords)
      await timeout(100);
      console.log(`Fragment finished ${i + 1} out of ${fragments.length}`);
    }

    // // Create final trail variable to store
    const trail = JSON.stringify({ name, filename, coordinates: enhancedCoordinates })
    // Write trail file
    fs.writeFile(`./trails/${filename}.json`, trail, 'utf8', () => {
      console.log(`Wrote ${filename} into a new file!`)
    });

   });
}


function chunkArray(myArray, chunk_size){
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    for (index = 0; index < arrayLength; index += chunk_size) {
        myChunk = myArray.slice(index, index+chunk_size);
        tempArray.push(myChunk);
    }
    return tempArray;
}
