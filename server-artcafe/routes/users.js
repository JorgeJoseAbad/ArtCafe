var express = require('express');
var router = express.Router();
const multer  = require('multer')
const User = require("../models/user");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.jpg')
  }
})


const upload = multer({
  storage:storage
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Diana');
});

/*GET single user*/
router.get('/:id',(req,res,next)=>{
  let id=req.params.id;
  User
    .findById(id)
    .exec((err, user) => {
      res.send(
        {
          username:user.username,
          email:user.email,
          isArtist:user.isArtist,
          description:user.description,
        }
      )
    });
  }
)

/*New route to upload a file image for avatar*/
router.post('/upload/:id',upload.single('avatar'),(req,res,next)=>{

  pic_path = "/uploads/" + req.file.filename;

  User.findByIdAndUpdate(req.params.id, {
    pic_path
  }, (err, image) => {
    if (err) {
      return next(err);
    }
    return res.send("Success in the avatar loading");
  });
})

/* POST users listing with params. this is a test OK*/
router.post('/:id',((req,res,next)=>{
    res.send(req.body);
  })
)

/*Route to edit user*/
router.put('/:id', (req, res) => {

//note: only edit description and email
  const editedUser={
    description: req.body.description,
    email: req.body.email,
  }

  User.findByIdAndUpdate(req.params.id, editedUser,(err,user) => {
    if (err) {
      return next(err);
    } else {
      return res.send(user);
    }
  });

});

module.exports = router;
