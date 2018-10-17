var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/* POST users listing with params. this is a test OK*/
router.post('/:id',((req,res,next)=>{
    console.log(req.params);
    res.send(req.body);
  })
)

module.exports = router;
