var express = require ("express");
var app = express();
var bodyparser = require ("body-parser");
app.use(bodyparser.json({limit: '5mb'}));

app.get ("/listproducts", function(req,res){

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    
    MongoClient.connect("mongodb://localhost:27017/",{ useNewUrlParser: true }, function(err, db) {
    // Now you can use the database in the db variable
        if (err) throw err;
        var dbo = db.db("test--dbpath");
        var query = {};
        dbo.collection("DBEnvyLoad_customers").find(query).limit(5).toArray(function(err, result) {
            if (err) throw err;
            
            res.send (result);  
            db.close();
          });
    });

});

app.post ("/addproduct", function(req,res){
    console.log(req.body);
    if(!req.body.name || req.body.name == "") {
        err = 'name not found'
        res.send (err); 
        
    }
    if(!req.body.cost || req.body.cost == "") {
        err = 'cost not found'
        res.send (err); 
    }
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    
    MongoClient.connect("mongodb://localhost:27017/",{ useNewUrlParser: true }, function(err, db) {
    // Now you can use the database in the db variable
        if (err) throw err;
        var dbo = db.db("test--dbpath");
        var query = {
            name : req.body.name,
            cose : req.body.cost
        };
        
        dbo.collection("DBEnvyLoad_customers").insertOne(query, function(err, result) {
            if (err) throw err;
            
            res.send (result);  
            db.close();
          });
    });

});

app.listen(8080, () => {
    console.log("Server running on port 3000");
});