let LDAP = require('../utils/LDAP');

let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  LDAP.getAllUsers().then(users => res.status(200).json(users));
});

/** CREATE user */
router.put('/', (req, res, next) => {
    const user = req.body.user;

    LDAP.addUser(user).then((datas) => {
    if (datas.error) {
      res.status(404).send({error: datas.error});
    } else {
      LDAP.getOneUser(datas.dn).then((user) => res.status(200).json(user));
    }
  });
});

/** MODIFY user */
router.post('/', (req, res, next) => {
  const user = req.body.user;

  LDAP.updateUser(user).then((datas) => {
    if (datas.error) {
      res.status(404).send({error: datas.error});
    } else {
      LDAP.getOneUser(datas.dn).then((user) => res.status(200).json(user));
    }
  });
});

/** DELETE user */
router.delete('/', (req, res, next) => {
  LDAP.deleteUser(req.body.dn).then((err) => {
  	if(err) {
  		res.status(404).send({error: err});
  	} else {
  		res.status(200).send({error: null});
  	}
  });
});

module.exports = router;