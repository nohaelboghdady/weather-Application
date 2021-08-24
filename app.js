const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
  const query = req.body.cityName;
  const apiKey ="0b7a4ca02b85808d223a63eb67ec0f9f";
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey;
  https.get(url,function(response){
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const tempDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL ="http://openweathermap.org/img/wn/"+icon+"@2x.png";

      console.log(tempDescription);
      res.write("<p>The weather is currently "+tempDescription+"</P>");
      res.write("<h1>The temperature in "+query+ " is "+temp+" degree celcius.</h1>");
      res.write("<img src= "+imageURL+" >");
      res.send();
    })

  })

})



app.listen(3000,function(){
  console.log("Server is running on port 3000.");
})
