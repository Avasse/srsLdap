const { client } = require('./client');

function getAllGroups() {
  return new Promise((resolve, reject) => {
    client.search('ou=group,dc=bla,dc=com', { scope: 'sub' }, (err, res) => {
      let groups = [];
      res.on('searchEntry', (entry) => groups.push(entry.object));
      res.on('error', (err) => reject(err));
      res.on('end', (result) => resolve(groups));
    });
  })
}

function addGroup(group) {
  console.log("RUNNING ADD GROUP --------------------------------");
  const dn = 'cn=' + group.uid + ',ou=group,dc=bla,dc=com'
  
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
  const modification = new ldap.Change({
    operation: 'replace',
    modification: {
      description: group.description
    }
  })
  
  return new Promise((resolve, reject) => {
    client.modify(group.dn, modification, (err) => {
      if (err) reject(err)
      else resolve({ dn: group.dn })
    })
  })
}
  
module.exports.getAllGroups = getAllGroups;
module.exports.addGroup     = addGroup;
module.exports.deleteGroup  = deleteGroup;
module.exports.updateGroup  = updateGroup;