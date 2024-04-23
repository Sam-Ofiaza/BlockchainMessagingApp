import { useState, useEffect, useContext } from 'react';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { AuthContext } from '../layout';

interface Message {
  sender: string;
  content: string;
  timestamp: number;
  isRead: boolean;
}

export default function ExistingConvo(props: { contact: string }) {
  const [myName, setMyName] = useState<string>('');
  const [contactName, setContactName] = useState<string>('');
  const [convo, setConvo] = useState<Message[]>([]);
  const {
    account,
    web3,
    usersContract,
    messagesContract,
    keysContract,
    setAccount,
  } = useContext(AuthContext);

  useEffect(() => {
    // const getData = async () => {
    //   const res = await fetch(`/api/getMyMessages/${address}/${props.contact}`);
    //   const newConvo = await res.json();
    //   setConvo(newConvo);
    // };
    // getData();
    try {
      const getData = async () => {
        const newConvo = await messagesContract.methods
          .getMyMessages(props.contact)
          .call({ from: account });
        console.log('Messages.getMyMessages - newConvo: ' + newConvo);
        console.log(newConvo);

        const addr1 = newConvo[0][0];
        const addr2 = newConvo[0][1];

        const contact = addr1 != account ? addr1 : addr2;

        const newConvo2 = newConvo.map((m) => ({
          sender: m[0],
          recipient: m[1],
          content: m[2],
          timestamp: m[3],
          isRead: m[4],
        }));

        const userData = await usersContract.methods
          .users(account)
          .call({ from: account });

        const contactData = await usersContract.methods
          .users(contact)
          .call({ from: account });

        setMyName(userData[0]);
        setContactName(contactData[0]);
        setConvo(newConvo2);
      };
      getData();
    } catch (error) {
      console.error('Error getting conversation history');
    }
  }, [account, props.contact, setConvo]);

  return (
    <Box className='pt-16 pb-32 flex-col justify-center items-center overflow-scroll'>
      {convo.map(({ sender, content, timestamp, isRead }) => (
        <Box
          key={timestamp}
          className={
            (sender === account ? 'ml-64' : 'mr-64') +
            ' flex justify-center items-center w-96 mb-5'
          }>
          <AccountCircleIcon />
          <Box className='mx-3'>
            <Typography className='font-semibold'>
              {sender === account ? myName : contactName}
            </Typography>
            <Typography className='font-medium'>{timestamp}</Typography>
            <Typography>{content}</Typography>
          </Box>
          {isRead && <CheckIcon className='' />}
        </Box>
      ))}
    </Box>
  );
}
