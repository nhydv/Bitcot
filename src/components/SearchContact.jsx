import { Input } from '@chakra-ui/react';
import React, { useState } from 'react';

const SearchContact = ({ contacts, onContactClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const results = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(term) ||
        contact.mobile.toLowerCase().includes(term)
    );
    setSearchResults(results);
  };

  return (
    <div>
      <Input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search Contacts"
        padding={'10px'}
        borderRadius={'5px'}
        width={'100%'}
      />
      {searchTerm !== '' && searchResults.length === 0 && (
        <div style={{color:'white',fontSize:'15px'}}>No matching contacts found.</div>
      )}
      {searchResults.map((contact) => (
        <div key={contact.id} onClick={() => onContactClick(contact)} style={{color:'white',fontSize:'15px'}} >
          <span>{contact.name}</span>
          <span>{contact.mobile}</span>
        </div>
      ))}
    </div>
  );
};

export default SearchContact;
