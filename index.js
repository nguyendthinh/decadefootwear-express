var express = require("express");
var hbs = require("express-handlebars");
var db = require("./db/connection");

var app = express();

app.set("port", process.env.PORT || 4000);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname: ".hbs",
  partialsDir: "views/",
  layoutsDir: "views/",
  defaultLayout: "layout-main"
}));

app.use("/assets", express.static("public"));

app.get("/", function(req, res){
  res.render("homepage");
});

app.get("/shoes", function(req, res){
  res.render("shoes-index", {
    shoes: db.shoes
  });
});

app.get("/shoes/:brand", function(req, res){
  var desiredBrand = req.params.brand;
  var brandOutput;
  db.shoes.forEach(function(shoe){
    if(desiredBrand === shoe.brand){
      brandOutput = shoe;
    }
  });
  res.render("shoes-show", {
    shoe: brandOutput
  });
});

app.listen(app.get("port"), function(){
  console.log("IT WORKS");
});
