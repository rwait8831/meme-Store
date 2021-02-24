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

  var createTable = "CREATE TABLE IF NOT EXISTS memeDB (memeURL VARCHAR(256));";
  con.query(createTable, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});


function resultSetToHtml(memeURL){
  return "<img src = " + memeUrl + "><br>";
}

module.exports = {
  deleteRating: function (ratee, stars, comment) {
    con.query("DELETE FROM rating WHERE ratee=" + con.escape(ratee) + " AND star=" + con.escape(stars) + "AND comment=" + con.escape(), 
    function (err, result) {
        if (err) return reject(err);
        console.log("Deleted:" + result);
    }); 
  },
  
/*  async function getResultsAsHtml() {
    return new Promise(function(resolve, reject) {
      con.query("SELECT ratee, stars, comment FROM rating;", 
      function (err, result, fields) {
          if (err) reject(err);
          var html = "";
          for(var n=0; n < result.length; n++) {
            html += resultSetToHtml(result[n].ratee, result[n]).stars, result[n].comment, n);
          }

          //console.log("Result inside getResultsAsHtml: " + html);
          resolve(html);
      }); 
    });
  }*/
    

  insertMeme: function (url) {
    con.query("INSERT INTO memeDB VALUES ( ? )", [[url]], 
    function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });    
  }
};
