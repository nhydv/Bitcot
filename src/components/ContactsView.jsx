import React, { useState, useEffect } from "react";
import {
    Box,
    Center,
    IconButton,
    useToast
} from "@chakra-ui/react";
import { FaTrash, FaUser, FaEye } from 'react-icons/fa';
import AddContactModal from './AddContactModal';
import EditContactModal from './EditContactModal';
import ViewContactModal from './ViewContactModal';
import SearchContact from './SearchContact';
import './style.css';
import { AddIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';

const ContactsView = () => {
    const [contacts, setContacts] = useState([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isViewModalOpen, setViewModalOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const toast = useToast();
    const [contactList, setContactsList] = useState([]);



    useEffect(() => {

        const fetchContacts = async () => {

            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockData = [
                {
                    id: '1',
                    name: 'neha',
                    mobile: '123456789',
                    email: 'neha@gmail.com',
                },
                {
                    id: '2',
                    name: 'neha2',
                    mobile: '123456789',
                    email: 'neha@gmail.com',
                },

            ];

            setContacts(mockData);
            console.log("Mock API Data:", mockData);
        };

        fetchContacts();
    }, []);


    useEffect(() => {
        console.log(contactList, "gvghdsfvghfgdhgfygyeg")
    }, [contactList])

    const handleDelete = (contactId) => {
        // setContacts(contacts.filter((contact) => contact.id !== contactId));
        setContactsList(contactList.filter((contact) => contact.id !== contactId));
    };
    const handleAddModalOpen = () => {
        setAddModalOpen(true);
    };

    const handleAddModalClose = () => {
        setAddModalOpen(false);
    };

    const handleEditModalOpen = (contact) => {
        setSelectedContact(contact);
        setEditModalOpen(true);
    };

    const handleEditModalClose = () => {
        setSelectedContact(null);
        setEditModalOpen(false);
    };

    const handleViewModalOpen = (contact) => {
        setSelectedContact(contact);
        setViewModalOpen(true);
    };

    const handleViewModalClose = () => {
        setSelectedContact(null);
        setViewModalOpen(false);
    };

    const handleContactSave = (updatedContact) => {
        const updatedContacts = contactList.map((contact) =>
            contact.id === updatedContact.id ? updatedContact : contact
        );
        setContactsList(updatedContacts);
    
        toast({
            title: "Contact Updated",
            description: "The contact has been successfully updated.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };
    

    const handleContactAdd = (newContact) => {
        const updatedContacts = [...contacts, newContact];
        setContacts(updatedContacts);
    };

    return (
        <div className="contacts-view-container">
            <Box>
                <Box mb={4} className="header">
                    All Contacts
                    <IconButton
                        icon={<AddIcon />}
                        aria-label="Add Contact"
                        variant="outline"
                        onClick={handleAddModalOpen}
                        ml={2}
                        borderRadius="30px"
                    />
                </Box>
                <Center style={{ padding: '20px' }}>
                    <SearchContact contacts={contacts} onContactClick={handleViewModalOpen} />
                </Center>
                {contactList.length === 0 ? (
                    <Box textAlign="center" mt={4} style={{color:'white'}}>
                        No contacts available.
                    </Box>
                ) : (
                    contactList.map((contact) => (
                        <Box
                            key={contact.id}
                            p={4}
                            border="1px solid gray"
                            borderRadius="md"
                            mb={4}
                            className="contact-item"
                        >
                            <Box display="flex" alignItems="center">
                                <div mr={2} className="contact-id">
                                    {contact.id}
                                </div>
                                <FaUser className="contact-icon" />
                                <div className="contact-details">
                                    <div className="contact-name">{contact.name}</div>
                                    <div className="contact-info">{contact.mobile}</div>
                                </div>
                            </Box>

                            <Box>
                                <IconButton
                                    icon={<ViewIcon style={{ width: '20px', height: '20px' }} />}
                                    aria-label="View Contact"
                                    variant="outline"
                                    border={"none"}
                                    right={'70px'}
                                    onClick={() => handleViewModalOpen(contact)}
                                />
                                <IconButton
                                    icon={<FaTrash />}
                                    aria-label="Delete Contact"
                                    variant="outline"
                                    onClick={() => handleDelete(contact.id)}
                                    right={'50px'}
                                    border={"none"}
                                />

                                <IconButton
                                    icon={<EditIcon />}
                                    aria-label="Edit Contact"
                                    variant="outline"
                                    onClick={() => handleEditModalOpen(contact)}
                                    right={'30px'}
                                    border={"none"}
                                />
                            </Box>
                        </Box>
                    ))

                )}
            </Box>

            <AddContactModal
                isOpen={isAddModalOpen}
                onClose={handleAddModalClose}
                onContactAdd={handleContactAdd}
                setContactsList={setContactsList}
            />

            {selectedContact && (
                <EditContactModal
                    isOpen={isEditModalOpen}
                    onClose={handleEditModalClose}
                    contact={selectedContact}
                    onSave={handleContactSave}
                />
            )}
            {selectedContact && (
                <ViewContactModal
                    isOpen={isViewModalOpen}
                    onClose={handleViewModalClose}
                    contact={selectedContact}
                />
            )}
        </div>
    );
};

export default ContactsView;
