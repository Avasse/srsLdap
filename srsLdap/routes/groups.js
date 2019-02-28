const express = require('express');
const router = express.Router();
const groupsLDAP = require('../utils/ldapGroups');

/* GET users listing. */
router.get('/', (req, res, next) => {
  console.log("RUNNING GET GROUPS --------------------------------");
  groupsLDAP.getAllGroups().then(groups => res.status(200).json(groups));
});

/** CREATE user */
router.put('/', (req, res, next) => {
  console.log("RUNNING PUT GROUP --------------------------------");
  groupsLDAP.addGroup(req.body.group).then((datas) => {
    if (datas.error) {
      res.status(404).send({error: datas.error});
    } else {
      groupsLDAP.getOneGroup(datas.dn).then((group) => res.status(200).json(group));
    }
  });
});

/** MODIFY user */
router.post('/', (req, res, next) => {
  console.log("RUNNING POST GROUP -------------------------------");
  groupsLDAP.updateGroup(req.body.group).then((datas) => {
    if (datas.error) {
      res.status(404).send({error: datas.error});
    } else {
      groupsLDAP.getOneGroup(datas.dn).then((group) => res.status(200).json(group));
    }
  });
});

/** DELETE user */
router.put('/delete', (req, res, next) => {
  console.log("RUNNING DELETE USER --------------------------------");
  groupsLDAP.deleteGroup(req.body.dn).then((datas) => {
  	if(datas.error) {
      res.status(404).send({error: datas.error});
  	} else {
  		res.status(200).send({dn: req.body.dn});
  	}
  });
});

module.exports = router;