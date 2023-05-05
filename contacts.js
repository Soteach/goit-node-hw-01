const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');


const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
    let data = [];
    try {
        data = JSON.parse(await fs.readFile(contactsPath));
    } catch (error) {
        console.log("Can't read Contacts!");
    }
   return data;
}

async function getContactById(contactId) {
    const data = await listContacts();
    const contactById = data.find(contact => contact.id === contactId);
    if (!contactById) {
        console.log("No contacts with such ID");
        return null;
    }
    return contactById||null;
}

async function removeContact(contactId) {
    const data = await listContacts();
    const index = data.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
        console.log("No contact with such id");
        return null;
    }
    const deletedContact = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return deletedContact;
}



async function addContact(name, email, phone) {
    const data = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return newContact;
}

module.exports = {
    contactsPath,
    listContacts,
    getContactById,
    addContact,
    removeContact,
};