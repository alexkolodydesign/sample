const fs = require('fs');
const axios = require('axios');

run();

// Time out to make sure Google's Elevation API doesn't receive too many requests (Max is 100 requests per second)
const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

async function run() {
  //fs.readdir('./Rest_of_Split_Missing_Broken/', function(err, files) {
/*
    if (err) {
      console.error("could not list dir: ", err);
      process.exit(1);
    }
*/
    //files.forEach(function(file, index) {
      fs.readFile( "Rest_of_Split_Missing_Broken/BarrelRollTrailUpdated.json", async (err, data) => {
        const json = JSON.parse(data)
        const coordinates = json.features.map(feature => ({ lat: feature.attributes.POINT_Y, lng: feature.attributes.POINT_X }) )
        const name = json.features[0].attributes["TRAIL_NAME"] || json.features[0].attributes["Trail_Name"] || json.features[0].attributes["ROUTE_NAME"] || json.features[0].attributes["Route_Name"]
        const filename = name.toLowerCase().replace(/ /g, "_")
        const chunkSize = 150;
        const fragments = chunkArray(coordinates, chunkSize);
        let enhancedCoordinates = []

console.log('coordinates: ', coordinates);

        for (let i = 0; i < fragments.length; i++) {
          // coordinates[i].elevation = elevation
          let url = `https://maps.googleapis.com/maps/api/elevation/json?key=AIzaSyAqrxAbb0g9d1C9GgKjGZ5OU-TGowpZqWQ&locations=`
          var baseCoordCount = chunkSize * i; // need this so loop through each fragment doesnt start coordinate check back at 0
          for (let k = 0; k < fragments[i].length; k++) {
            url += `${coordinates[baseCoordCount+k].lat},${coordinates[baseCoordCount+ k].lng}`
            if (k === (fragments[i].length - 1)) {
              console.log("LAST POINT")
            } else {
              url += `|`
            }
          }
console.log("here 1");
console.log("URL:  ", url);
          const { data: { results } } = await axios.get(url)
console.log("here 2");
          const newCoords = results.map(result => ({ lat: result.location.lat, lng: result.location.lng, elevation: result.elevation }))
console.log("here 3");
          enhancedCoordinates.push(...newCoords)
console.log("here 4");
          await timeout(100);
          console.log(`Fragment finished ${i + 1} out of ${fragments.length}`);
        }
console.log("here 5");

        // // Create final trail variable to store
        const trail = JSON.stringify({ name, filename, coordinates: enhancedCoordinates })
        // Write trail file
        fs.writeFile(`./trails/${filename}.json`, trail, 'utf8', () => {
          console.log(`Wrote ${filename} into a new file!`)
        });

       });
    //})
  //})
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
