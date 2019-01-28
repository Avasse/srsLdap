let LDAP = require('../utils/LDAP');

let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  LDAP.get()
  res.send('GET OK');
});

router.put('/', (req, res, next) => {
  LDAP.add();
  res.send('PUT OK');
});

router.delete('/', (req, res, next) => {
  LDAP.del();
  res.send('DELETE OK');
});

module.exports = router;