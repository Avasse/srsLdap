let LDAP = require('../utils/LDAP');

let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  LDAP.get().then(users => res.status(200).json(users));
});

router.put('/', (req, res, next) => {
  LDAP.add();
  res.status(200).send({error: null});
});

router.post('/', (req, res, next) => {
  LDAP.update();
  res.send('POST OK');
});

router.delete('/', (req, res, next) => {
  LDAP.del(req.body.dn).then((err) => {
  	if(err) {
  		res.status(404).send({error: err});
  	} else {
  		res.status(200).send({error: null});
  	}
  });
});

module.exports = router;