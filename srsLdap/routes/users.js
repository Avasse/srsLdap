let LDAP = require('../utils/LDAP');

let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  LDAP.get()
  res.send('GET OK');
});

router.post('/', (req, res, next) => {
  //TODO: CREATE USER
  LDAP.add();
  res.send('POST OK');
});

router.put('/', (req, res, next) => {
  //TODO: DELETE USER
  LDAP.del();
  res.send('PUT OK');
});

module.exports = router;