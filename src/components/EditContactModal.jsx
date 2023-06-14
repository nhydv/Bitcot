import { Modal,useToast, ModalOverlay, 
  ModalContent, ModalHeader, ModalCloseButton,
   ModalBody, FormControl, FormLabel, Input, Button,   ToastProvider } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import './style.css';

const EditContactModal = ({ isOpen, onClose, contact, onSave }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const[address,setAddress] =useState ('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setMobile(contact.mobile);
      setEmail(contact.email);
      setAddress(contact.address);
    }
  }, [contact]);

  useEffect(() => {
    const storedContact = localStorage.getItem('editedContact');
    if (storedContact) {
      const { name, mobile, email,address } = JSON.parse(storedContact);
      setName(name);
      setMobile(mobile);
      setEmail(email);
      setAddress(address);
    }
  }, []);

  const handleReset = () => {
    if (contact) {
      setName(contact.name);
      setMobile(contact.mobile);
      setEmail(contact.email);
      setAddress(contact.address);
    } else {
      setName('');
      setMobile('');
      setEmail('');
      setAddress('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedContact = { ...contact, name, mobile, email ,address};
    onSave(updatedContact);
    setShowSuccessAlert(true);
    toast({
      title: "Contact Updated",
      description: "The contact has been successfully updated.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  useEffect(() => {
    const storedContact = JSON.stringify({ name, mobile, email ,address});
    localStorage.setItem('editedContact', storedContact);
  }, [name, mobile, email,address]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="modal-content">
        <ModalHeader className="modal-header">Edit Contact</ModalHeader>
        <ModalCloseButton className="modal-close-button" />
        <ModalBody className="modal-body">
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Mobile</FormLabel>
              <Input
               type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter mobile"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
        
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter email"
              />
            </FormControl>
            {/* <Button variant="outline" onClick={handleReset} className="form-button">
              Reset
            </Button> */}
            <Button type="submit" colorScheme="blue" className="add-contact-button">
              Save Changes
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const EditContactModalWithToast = (props) => (
  <ToastProvider>
    <EditContactModal {...props} />
  </ToastProvider>
);


export default EditContactModal;



