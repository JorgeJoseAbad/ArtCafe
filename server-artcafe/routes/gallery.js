var express = require('express');
var router = express.Router();
const Artwork = require("../models/artwork.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('get gallery alcanzada')
});

router.post('/', (req, res, next) => {

    console.log(req.body);
  const newArtwork = new Artwork({
    title: req.body.title,
    startBid: req.body.startBid,
    description: req.body.description,
    category: 'General',
    //deadline: req.body.deadline,
    _creator: req.body._creator,
    pic_path: req.body.pic_path,
    // pic_name: req.body.pic_name
  });

debugger
  console.log(newArtwork)

  newArtwork.save((err, artwork) => {
    if (err) {
      console.log(err)
    } else {
      console.log("exito!!!!!");
      res.send(artwork);
    }
  });
});



module.exports=router;
