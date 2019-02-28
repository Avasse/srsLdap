const ldap = require('ldapjs');
const { client } = require('./client');

function getAllGroups() {
  return new Promise((resolve, reject) => {
    client.search('ou=group,dc=bla,dc=com', { filter: '(cn=*)', scope: 'sub' }, (err, res) => {
      let groups = [];
      res.on('searchEntry', (entry) => groups.push(entry.object));
      res.on('error', (err) => reject(err));
      res.on('end', (result) => resolve(groups));
    });
  })
}

function getOneGroup(dn) {
  return new Promise((resolve, reject) => {
    client.search(dn, { scope: 'base' }, (err, res) => {
      let group = null;
      res.on('searchEntry', (entry) => group = entry.object);
      res.on('error', (err) => reject(err));
      res.on('end', (result) => resolve(group))
    })
  })
}

async function addGroup(group) {
  console.log("RUNNING ADD GROUP --------------------------------");
  const dn = 'cn=' + group.cn + ',ou=group,dc=bla,dc=com'
  const gId = await getNextGroupUid();
  group.gidNumber = gId;
  group.objectClass = ['top','posixGroup'];
  
  return new Promise((resolve, reject) => {
    client.add(dn, group, (err) => {
      if (err) reject(err)
      else resolve({ dn: dn })
    })
  })
}

function deleteGroup(dn) {
  return new Promise((resolve, reject) => {
    client.del(dn, (err) => {
      if (err) reject(err)
      else resolve({ dn: dn })
    })
  })
}

function updateGroup(group) {
  const labels = ['description','memberUid']
  const modifications = []
  
  labels.forEach(key => {
    modifications.push(new ldap.Change({
      operation: 'replace',
      modification: {
        [key]: group[key]
      }
    }))
  })
  
  return new Promise((resolve, reject) => {
    client.modify(group.dn, modifications, (err) => {
      if (err) reject(err)
      else resolve({ dn: group.dn })
    })
  })
}

async function getNextGroupUid() {
  const groups = await getAllGroups();
  return Math.max.apply(Math, groups.map(group => { return group.gidNumber ? group.gidNumber : 0 })) + 1  
}
  
module.exports.getAllGroups = getAllGroups;
module.exports.getOneGroup  = getOneGroup;
module.exports.addGroup     = addGroup;
module.exports.deleteGroup  = deleteGroup;
module.exports.updateGroup  = updateGroup;