const fs = require('fs');
const axios = require('axios');

run();

// Time out to make sure Google's Elevation API doesn't receive too many requests (Max is 100 requests per second)
const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

async function run() {
	// make sure these have been run through the get_elevation_file.js script first
  fs.readdir('./ReverseElevation/', function(err, files) {
    if (err) {
      console.error("could not list dir: ", err);
      process.exit(1);
    }
    files.forEach(function(file, index) {
      fs.readFile( "./ReverseElevation/"+file, async (err, data) => {
    		const json = JSON.parse(data)
    		const name = json.name;
    		const filename = json.filename;
    		const coords = json.coordinates;
    		const reversedCoords = coords.reverse();

    		// // Create final trail variable to store
    		const trail = JSON.stringify({ name, filename, coordinates: reversedCoords })
    		// Write trail file
    		fs.writeFile(`./trails/Reversed/${filename}.json`, trail, 'utf8', () => {
    		  console.log(`Wrote ${filename} into a new file!`)
    		});
    	});
    })
  })
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
