var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "sqluser",
  password: "sqluserpw",
  database: "yelp"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var createTable = "CREATE TABLE IF NOT EXISTS memeDB (filename VARCHAR(256));";
  con.query(createTable, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});


function getRandomIndex(max){
  return Math.floor(Math.random() * max);
}

async function retMeme() {  
    return new Promise( resolve => {
  con.query("SELECT filename FROM yelp.memeDB;", 
  function (err, result, fields) {
      if (err) throw err;
 
      var i = getRandomIndex(result.length);
    //console.log(result[i].filename)
    resolve(result[i].filename);        
   })
   });  
 }

function insertFile(filename){
  con.query("INSERT INTO yelp.memeDB VALUES (?)", [[filename]],
  function (err, result) {
      if (err) throw err;
      console.log("Inserted Filename: " + filename);
    });
  }


 module.exports = {
   insertFile: insertFile,
   retMeme: retMeme
 };