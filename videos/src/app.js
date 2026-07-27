const express = require('express');
const cors = require('cors');
const Video = require('./models/video');

const app = express();

app.use(cors({
  origin: 'http://myweb.techno028.shop'
}));

app.use(express.json());


app.get('/', (req,res)=>{
  res.json({msg:'Videos Service'});
});


app.get('/api/v1/videos', async(req,res)=>{
  const videos = await Video.find({});
  res.json(videos);
});


app.post('/api/v1/videos', async(req,res)=>{
  const video = new Video({
    name:req.body.name
  });

  await video.save();

  res.json(video);
});


module.exports = app;
