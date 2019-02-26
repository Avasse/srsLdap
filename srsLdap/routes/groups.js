const express = require('express');
const router = express.Router();
const groupsLDAP = require('../utils/ldapGroups');

/* GET users listing. */
router.get('/', (req, res, next) => {
  console.log("RUNNING GET GROUPS --------------------------------");
  groupsLDAP.getAllGroups().then(groups => res.status(200).json(groups));
});

module.exports = router;