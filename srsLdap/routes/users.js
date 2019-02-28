const express = require('express');
const router = express.Router();
const usersLDAP = require('../utils/ldapUsers');
const client = require('../utils/client');

/* GET users listing. */
router.get('/', (req, res, next) => {
  console.log("RUNNING GET USERS --------------------------------");
  try {
    usersLDAP.getAllUsers().then(users => res.status(200).json(users));
  } catch (e) {
    res.status(404).send({error: e});
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
  usersLDAP.deleteUser(req.body.dn).then((datas) => {
  	if(datas.error) {
      res.status(404).send({error: datas.error});
  	} else {
  		res.status(200).send({dn: req.body.dn});
  	}
  });
});

/** LOGIN user */
router.post('/login', (req, res, next) => {
  console.log("RUNNING POST LOGIN -------------------------------");
  const user = req.body.user;
  if (user.login === 'admin') {
    res.status(200).json({isAdmin: true})
  } else {
    usersLDAP.getOneUser("uid=" + user.login + ',ou=people,dc=bla,dc=com').then((userLdap) => {
      if (userLdap.userPassword === user.password) res.status(200).json({isAdmin: false, user: userLdap})
      else res.status(404).json({err: 'Invalid Credentials'})
    })
  }
});

module.exports = router;