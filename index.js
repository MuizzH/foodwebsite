const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


//Connect to MongoDB
const db = require('./config/keys').MongoURI;  
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true}) 
.then(() => console.log("MongoDB connected")).catch(err => console.log(err)); 


//add a product/

let advertSchema = new mongoose.Schema({
    restaurantName: String,
    minimumOrder: Number,
    deliveryFee: Number,
    location: String,
});

var promo = mongoose.model("Promo", advertSchema);



/*
Promo.create({
    restaurantName: "Excapafe",
    minimumOrder: "15",
    deliveryFee: "10",
    location: "Muara",

});

}, function(error, data){
    if(error){
        console.log("There was aproblem adding the product.");
        console.log(error);

    }else{
        console.log("Data Added!");
        console.log(data);
    }
});
*/

//add product end//

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

/*app.set("views", path.join(__dirname, "views"));*/
app.set("view engine", "ejs");

app.get("/homepage", function(req, res){
    res.render("homepage");
});

app.get("/contact", function(req, res){
    res.render("contact");
});

app.get("/advert", function(req, res){
    res.render("advert");
});

app.post("/advert", function(req, res){
    promo.create({

        restaurantName:'KFC',
        minimumOrder:'15',
        deliveryFee:'30',
        location:'Gadong',
    
    }); 

    res.redirect("/advert");
});

//add.post("/advert", function(req, res){
//    var data = req.body;
//})

app.get("/menu", function(req, res){
    res.render("menu");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.get("/signin", function(req, res){
    res.render("signin");
});

app.get("/game", function(req, res){
    res.render("game");
});

app.get("/game/:gameTitle/:gameCreator", function(req, res){
    const title = req.params.gameTitle;
    const creator = req.params.gameCreator;
    res.render("game.ejs", {
        title: title,
        creator: creator
    });
});

app.get("/list", function(req, res){ 
 
    //Our ghetto database
    const gamesData = [
        {
            title: "American Racing", 
            creator: "turboNuke",
            width: 640,
            height: 480,
            fileName: "americanracing.swf",
            thumbnailFile: "americanracingpicture.jpg"
        },
        {
            title: "Generic Defense Game", 
            creator: "PyschoGoldfish",
            width: 640,
            height: 480,
            fileName: "genericdefense.swf",
            thumbnailFile: "GenericDefenseGame.png"
        },
        {
            title: "Learn to Fly 2", 
            creator: "light_bringer777",
            width: 640,
            height: 480,
            fileName: "embeddable_115608.swf",
            thumbnailFile: "ltf2.jpg"
        },
        {
            title: "Wonderputt", 
            creator: "dampgnat",
            width: 750,
            height: 650,
            fileName: "wonderputt.swf",
            thumbnailFile: "pop-wonderputt.jpg"
        }
    ]
 
    res.render("list", {
        gamesData: gamesData
    });
});


app.get("/gamelist", function(req, res){ //Will list all of our games
 
    //An array of objects that holds all our games. Basically a database.
    const games = [
        {title: "Fortnite", creator: "Epic Games"},
        {title: "Dirty Bomb", creator: "Splash Damage"},
        {title: "Battlefield 1", creator: "EA"},
        {title: "Apex Legend", creator: "Origin/ EA"}
    ]
 
    res.render("gamelist.ejs", {
        gamesList: games //we send the array to the gamelist.ejs page
    });
});




app.listen("3000", function(){
    console.log(`This is your localhost server is now ONLINE!!`);
});

