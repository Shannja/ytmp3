const express = require("express");
const app = express();
const fetch = require("node-fetch");
const ejs = require("ejs");
require("dotenv").config();
const port = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get("/mp3", (req, res) => {
    res.render("mp3")
})

app.get("/mp4", (req, res) => {
    res.send("mp4")
})

app.post("/convert-mp3", async (req, res) => {
    const videoId = req.body.videoID;
    if(
        videoId === undefined ||
        videoId === "" ||
        videoId === null
    ){
        return res.render("mp3", {success: false, message: "Please enter a video id."});
    }else{
        const fetchAPI = await fetch(`https://youtube-mp3-download1.p.rapidapi.com/dl?id=${videoId}`, {"method": "GET", "headers": {
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': 'youtube-mp3-download1.p.rapidapi.com'
        }});
        const fetchResponse = await fetchAPI.json()
        if (fetchResponse.status === "ok"){
            return res.render("mp3", {success: true, title: fetchResponse.title, link: fetchResponse.link})
        }else{
            return res.render("mp3", {success: false, message: "Problem with the server, check back later!"})
        }
    }
})

app.post("/convert-mp4", async (req, res) => {

})

app.listen(port, () => {
    console.log("started on port ", port);
});