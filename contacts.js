const fs = require('fs').promises;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const contactsPath = path.join(__dirname, 'db/contacts.json');

function listContacts() {
  return fs.readFile(contactsPath)
    .then(data => {
      const contacts = JSON.parse(data);
      return contacts;
    })
    .catch(error => console.log(error.message));
};

function getContactById(contactId) {
  const contact = listContacts()
    .then(contacts => contacts.find(item => item.id === contactId.toString()))
    .catch(error => console.log(error.message));
  return contact || null;
};
  
function removeContact(contactId) {
  const removedContact = listContacts()
    .then(contacts => contacts.find(item => item.id === contactId.toString()))
    .catch(error => console.log(error));
  listContacts()
    .then(contacts => {
      const newContactList = contacts.filter(item => item.id !== contactId.toString());
      fs.writeFile(contactsPath, JSON.stringify(newContactList, null, 2));
    })
    .catch(error => console.log(error.message));
  return removedContact || null;
};
  
function addContact(name, email, phone) {
  const newContact = {
    id: uuidv4(),
    name: name,
    email: email,
    phone: phone,
  };
  const newContactList = listContacts()
    .then(contacts => {
      const newContacts = [...contacts, newContact];
      fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    })
    .catch(error => console.log(error.message));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById, 
  addContact,
  removeContact
};