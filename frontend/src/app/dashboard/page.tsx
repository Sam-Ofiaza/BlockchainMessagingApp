'use client';

import { useState, useEffect, useContext } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import DMSidebar from '../components/DMSidebar';
import SendMessage from '../components/SendMessage';
import NewConvo from '../components/NewConvo';
import ExistingConvo from '../components/ExistingConvo';

import { AuthContext } from '../layout';

export interface ContactItem {
  address: string;
  name: string;
}

const Dashboard = () => {
  const [contact, setContact] = useState('New Conversation');
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const {
    account,
    web3,
    usersContract,
    messagesContract,
    keysContract,
    setAccount,
  } = useContext(AuthContext);

  const contactChangeHandler = (contact: string) => {
    setContact(contact);
  };

  const newContactSelectHandler = (contact: string) => {
    setContact(contact);
  };

  const messageSendHandler = async (message: string) => {
    // const res = await fetch('/api/sendMessage', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ sender: address, recipient: contact, message }),
    // });
    // const data = await res.json();
    // Function to send a message to another user
    try {
      console.log('sender: ' + account);
      console.log(account);
      console.log('recipient: ' + contact);
      console.log(contact);

      await messagesContract.methods
        .sendMessage(contact, message)
        .send({ from: account });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    // const getData = async () => {
    //   const res = await fetch(`/api/getMyContactList/${address}`);
    //   const newContacts = await res.json();
    //   setContacts(newContacts);
    // };
    // getData();
    try {
      const getData = async () => {
        const newContacts = await messagesContract.methods
          .getMyContacts(contact)
          .call({ from: account });
        console.log('Messages.getMyContacts - newContacts: ' + newContacts);

        const newContacts2 = [];
        for (const address of newContacts) {
          const userData = await usersContract.methods
            .users(address)
            .call({ from: account });
          newContacts2.push({ address, name: userData[0] });
        }

        setContacts(newContacts2);
      };
      getData();
    } catch (error) {
      console.error("Error getting user's contacts");
    }
  }, [account, setContacts]);

  const sidebarContacts = new Map<string, string>();
  for (const contactItem of contacts) {
    sidebarContacts.set(contactItem.name, contactItem.address);
  }

  console.log('sidebarContacts: ' + sidebarContacts);
  console.log(sidebarContacts);

  return (
    <Box className='flex justify-center items-center'>
      <DMSidebar
        sidebarContacts={sidebarContacts}
        onContactChange={contactChangeHandler}
      />
      <Stack
        className='justify-center items-center h-screen w-full'
        spacing={5}>
        {contact === 'New Conversation' ? (
          <NewConvo onContactSelect={newContactSelectHandler} />
        ) : (
          <ExistingConvo contact={contact} />
        )}
        <Box className='fixed bottom-0 py-3 w-full flex justify-center items-center text-primary bg-tertiary'>
          <SendMessage
            onMessageSend={messageSendHandler}
            disabled={contact === 'New Conversation'}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default Dashboard;
