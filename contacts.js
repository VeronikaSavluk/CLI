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
    .catch(error => console.log(error));
  };

  function getContactById(contactId) {
    const contact = listContacts()
    .then(contacts => contacts.find(item => (item.id).toString() === contactId.toString()))
    .catch(error => console.log(error));
    if(!contact){
      return null;
    }
    return contact;
  };
  
  function removeContact(contactId) {
    const removedContact = listContacts()
    .then(contacts => contacts.find(item => (item.id).toString() === contactId.toString()))
    .catch(error => console.log(error));
    listContacts()
    .then(contacts => {
      const newContactList = contacts.filter(item => (item.id).toString() !== contactId.toString());
      fs.writeFile(contactsPath, JSON.stringify(newContactList));
    })
    .catch(error => console.log(error));
    if(!removedContact){
      return null;
    }
    return removedContact;
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
      fs.writeFile(contactsPath, JSON.stringify(newContacts));
    })
    .catch(error => console.log(error));
    return newContact;
  };

  module.exports = {
    listContacts,
    getContactById, 
    addContact,
    removeContact
  };