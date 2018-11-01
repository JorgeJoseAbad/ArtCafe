const express = require('express');
const router = express.Router();
const multer  = require('multer')
const Artwork = require("../models/artwork.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.jpg')
  }
})


const upload = multer({
  storage:storage
});


/*Rpute provisional to edit artwork*/
router.put('/:id', (req, res) => {
  console.log(req.body);
  console.log(req.params.id);

  const editedArtwork={
    artworkID: req.body.artworkID,
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    startBid: req.body.startBid,
  }


  Artwork.findByIdAndUpdate(req.params.id, editedArtwork,(err,artwork) => {
    if (err) {
      console.log(err)
      return next(err);
    } else {
      console.log("exito!!!!!");
      return res.send(artwork);
    }
  });

});


/*Rpute  upload image*/
router.post('/upload/:id', upload.single('artworkImage'), (req, res) => {
  console.log(req.body);
  console.log(req.params.id);

  if (req.params.id=="undefined") return res.send("You are not logged")

  console.log(req.file)
  pic_path = "/uploads/" + req.file.filename;

  Artwork.findByIdAndUpdate(req.params.id, {pic_path}, (err, image) => {
    if (err) {
      return next(err);
    }
    return res.send("exito en la carga de imagen");
  });

});



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
