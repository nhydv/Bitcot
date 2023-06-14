import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import React, {  useEffect, useState } from 'react';
import './style.css';

const AddContactModal = ({ isOpen, onClose,setContactsList }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const[address,setAddress] =useState ('');
  // const [elements, setElements] = useState([]);
  const [contacts, setContacts] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = { name, mobile, email,address };
    setContacts([...contacts, newContact]);
    setContactsList([...contacts, newContact])
    setName('');
    setMobile('');
    setEmail('');
    setAddress('');
    onClose();
console.log(newContact,"dgfyugfueyryug")
  };


  // useEffect(()=>{
  //   setContactsList(contacts)
  //   setContacts([...contacts]);
  // },[contacts])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="modal-content">
        <ModalHeader className="modal-header">Add Contact</ModalHeader>
        <ModalCloseButton className="modal-close-button" />
        <ModalBody className="modal-body">
          <form onSubmit={handleSubmit}>
            <FormControl mb={4} isRequired>
              <FormLabel>Name</FormLabel>
              <Input

                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel>Mobile</FormLabel>
              <Input
                required
                type="tel"                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter mobile"
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel>Email</FormLabel>
              <Input

                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel>Address</FormLabel>
              <Input

                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
              />
            </FormControl>
            <Button type="submit" className="add-contact-button">Add Contact</Button>
          </form>
          {/* {contacts.map((contact, index) => (
              <div key={index}>
              <div> {contact.name}</div>  
              <div>{contact.mobile}</div>  
              <div>{contact.email}</div>
              <div>{contact.address}</div>
              </div>
            ))} */}

        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddContactModal;

