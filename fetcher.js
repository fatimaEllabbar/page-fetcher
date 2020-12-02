const arg = process.argv.slice(2);
const request = require('request');
const fs = require('fs');
const { FILE } = require('dns');
const url = arg[0];
const fileName = arg[1];
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(url, (error, response, body) => {
  if(error){
    console.log("the URL is invalid");
  }
  else if (response.statusCode !== 200){
    console.log(" the page is not found")
  } 
  else if(! fileName.startsWith("./")){
    console.log("local path invalid !");
  } 
  else if(fs.existsSync(fileName)){
    rl.question("the file already exists if you want to overwrite it type y: ", (response) => {
        if (response === "y") {
          fs.writeFile(fileName, body, function (err) {
            if (err) throw err;
            console.log('Downloaded and saved '+ Buffer.byteLength(body) + ' bytes to '+fileName);
          });
        }
        rl.close();
    });
  } 
  else {
      fs.writeFile(fileName, body, function (err) {
        if (err) throw err;
        console.log('Downloaded and saved '+ Buffer.byteLength(body) + ' bytes to '+fileName);
      });
    }
});
