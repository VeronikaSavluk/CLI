const argv = require('yargs').argv;
const path = require('path');
const {
  listContacts,
  getContactById, 
  addContact,
  removeContact
} = require(path.join(__dirname, 'contacts.js'));

function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
      case "list":
        listContacts()
        .then(contacts => console.table(contacts))
        .catch(error => console.error(error.message));
        break;
  
      case "get":
        getContactById(id)
        .then(contact => {
          if(!contact){
          return `The contact with id=${id} not found`;
        };
          console.log(contact);
        })
        .catch(error => console.error(error.message));
        break;
  
      case "add":
        const newContact = addContact(name, email, phone);
        console.log(newContact);
        break;
  
      case "remove":
        const removedContact = removeContact(id)
        .then(contact => {
          if(!contact){
          return `The contact with id=${id} not found`;
        };
          console.log(contact);
        })
        .catch(error => console.error(error.message));
        break;
  
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  }
  
  invokeAction(argv);  