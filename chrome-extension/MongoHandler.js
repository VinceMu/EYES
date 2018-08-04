var MongoClient = require('mongodb').MongoClient;
var f = require('util').format;

const USERNAME = encodeURIComponent("user");
const PASSWORD = encodeURIComponent("123");
const AUTH_METHOD = "DEFAULT"
const DATABASE_NAME = "UNIHACK";
const COLLECTION_NAME = "eye-data";
var url = f("mongodb+srv://%s:%s@unihack-dt2qp.mongodb.net/test?authMechanism=%s",USERNAME,PASSWORD,AUTH_METHOD);

//NEED TO CHECK IF THIS WORKS
function insert(data){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(DATABASE_NAME);
      dbo.collection(COLLECTION_NAME).insertOne(data, function(err, res) {
        if (err) throw err;
        console.log("insert complete");
        db.close();
      });
    });
}

// var obj = {"test":"data","more":2};
// insert(obj)

