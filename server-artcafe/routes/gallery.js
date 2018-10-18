var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('get gallery alcanzada')
});

router.post('/',function(req,res,next){
   res.send('post gallery alcanzada');
   console.log(req.body);
})

module.exports=router;
