var express = require('express');
var router = express.Router();
const multer  = require('multer')
const User = require("../models/user");

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


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Diana');
});

/*GET single user*/
router.get('/:id',(req,res,next)=>{
  console.log("llegado a get",req.params.id);
  let id=req.params.id;
  User
    .findById(id)
    .exec((err, user) => {
      console.log(user)
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
router.post('/upload/:id',upload.single('avatar'),((req,res,next)=>{
  console.log(req.body);
  console.log(req.params.id);

  console.log(req.file)
  pic_path = "/uploads/" + req.file.filename;

  User.findByIdAndUpdate(req.params.id, {
    pic_path
  }, (err, image) => {
    if (err) {
      return next(err);
    }
    return res.send("exito en la carga de avatar");
  });
}))

/* POST users listing with params. this is a test OK*/
router.post('/:id',((req,res,next)=>{
    console.log(req.params);
    res.send(req.body);
  })
)

module.exports = router;
