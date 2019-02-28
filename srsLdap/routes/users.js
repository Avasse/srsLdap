const express = require('express');
const router = express.Router();
const usersLDAP = require('../utils/ldapUsers');

/* GET users listing. */
router.get('/', (req, res, next) => {
  console.log("RUNNING GET USERS --------------------------------");
  try {
    usersLDAP.getAllUsers().then(users => res.status(200).json(users));
  } catch (e) {
    console.log(e);
  }
});

/** CREATE user */
router.put('/', (req, res, next) => {
  console.log("RUNNING PUT USER --------------------------------");
  const user = req.body.user;
  usersLDAP.addUser(user).then((datas) => {
    if (datas.error) {
      res.status(404).send({error: datas.error});
    } else {
      usersLDAP.getOneUser(datas.dn).then((user) => res.status(200).json(user));
    }
  });
});

/** MODIFY user */
router.post('/', (req, res, next) => {
  console.log("RUNNING POST USER -------------------------------");
  usersLDAP.updateUser(req.body.user).then((datas) => {
    if (datas.error) {
      res.status(404).send({error: datas.error});
    } else {
      usersLDAP.getOneUser(datas.dn).then((user) => res.status(200).json(user));
    }
  });
});

/** DELETE user */
router.put('/delete', (req, res, next) => {
  console.log("RUNNING DELETE USER --------------------------------");
  usersLDAP.deleteUser(req.body.dn).then((err) => {
  	if(err) {
  		res.status(404).send({error: err});
  	} else {
  		res.status(200).send({error: null});
  	}
  });
});

module.exports = router;