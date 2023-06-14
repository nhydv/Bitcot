import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text } from '@chakra-ui/react';
import React from 'react';
import './style.css';

const ViewContactModal = ({ isOpen, onClose, contact }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="modal-content">
        <ModalHeader className="modal-header">Contact Details</ModalHeader>
        <ModalCloseButton className="modal-close-button" />
        <ModalBody className="modal-body">
          <Text className="contact-info">Name: {contact.name}</Text>
          <Text className="contact-info">Mobile: {contact.mobile}</Text>
          <Text className="contact-info">Email: {contact.email}</Text>
          <Text className="contact-info">Address: {contact.Address}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewContactModal;

