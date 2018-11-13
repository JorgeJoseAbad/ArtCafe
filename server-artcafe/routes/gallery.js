const express = require('express');
const router = express.Router();
const multer  = require('multer')
const Artwork = require("../models/artwork.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/public/uploads')
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

  const editedArtwork={
    artworkID: req.body.artworkID,
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    startBid: req.body.startBid,
  }


  Artwork.findByIdAndUpdate(req.params.id, editedArtwork,(err,artwork) => {
    if (err) {
      return next(err);
    } else {
      return res.send(artwork);
    }
  });

});


/*Rpute  upload image*/
router.post('/upload/:id', upload.single('artworkImage'), (req, res) => {

  if (req.params.id=="undefined") return res.send("You are not logged")

  pic_path = "/uploads/" + req.file.filename;

  Artwork.findByIdAndUpdate(req.params.id, {pic_path}, (err, image) => {
    if (err) {
      return next(err);
    }
    return res.send("Success in loading image for artwork");
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

  newArtwork.save((err, artwork) => {
    if (err) {
    } else {
      res.send(artwork);
    }
  });
});

/*NEwww */
router.get('/:id', (req, res, next) => {
  let id=req.params.id;
  Artwork
    .findById(id)
    .exec((err, artwork) => {
      res.send(artwork)
    });

});

/*new to delete*/
router.delete('/:id',(req,res,next)=>{
  let id=req.params.id;
  Artwork
   .findOneAndDelete({ _id: id })
   .exec((err,result)=>{
     res.send(result)
   })
})



module.exports=router;
