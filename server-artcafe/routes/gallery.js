var express = require('express');
var router = express.Router();
const Artwork = require("../models/artwork.js");

/* GET home page.
router.get('/', function(req, res, next) {
  res.send('get gallery alcanzada')
});*/

/*Ok made get of all artwork and send front an array with them*/
router.get('/', (req, res, next) => {
  Artwork
    .find({})
    .populate('_creator')
    .exec((err, gallery) => {
      res.send(gallery)
    });

});

/*OK made post of artwork on BBDD*/
router.post('/', (req, res, next) => {

    console.log(req.body);
  const newArtwork = new Artwork({
    title: req.body.title,
    startBid: req.body.startBid,
    description: req.body.description,
    category: req.body.category,
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

/*NEwww */
router.get('/:id', (req, res, next) => {
  let id=req.params.id;
  console.log("en router",req.params.id);
  Artwork
    .findById(id)

    .exec((err, artwork) => {
      res.send(artwork)
    });

});



module.exports=router;
