'use client';

import { createContext, useState, useEffect } from 'react';
import Web3 from 'web3';

import './globals.css';
import NavBar from './components/NavBar';
import UsersABI from '../../../build/contracts/Users.json';
import MessagesABI from '../../../build/contracts/Messages.json';
import KeysABI from '../../../build/contracts/Keys.json';

export const AuthContext = createContext({
  account: '',
  web3: null,
  usersContract: null,
  messagesContract: null,
  keysContract: null,
  setAccount: (_account: string) => undefined,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [account, setAccount] = useState('');
  const [web3, setWeb3] = useState(null);
  const [usersContract, setUsersContract] = useState(null);
  const [messagesContract, setMessagesContract] = useState(null);
  const [keysContract, setKeysContract] = useState(null);

  const usersContractAddress = '0x42E8924695a77b3586402a99BA44e7C43ebF20c1';
  const messagesContractAddress = '0x98c81A7A4aa6B1C1a5F05e6c8e8fD9d34d68ba3E';
  const keysContractAddress = '0xdAB59234FbF6AF4c8C7d65Bb032474F68efB0767';
  const usersABI = UsersABI.abi;
  const messagesABI = MessagesABI.abi;
  const keysABI = KeysABI.abi;

  useEffect(() => {
    async function initializeWeb3() {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);

        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Get the user's account
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        // Initialize all contracts
        const usersContract = new web3.eth.Contract(
          usersABI,
          usersContractAddress
        );
        setUsersContract(usersContract);
        const messagesContract = new web3.eth.Contract(
          messagesABI,
          messagesContractAddress
        );
        setMessagesContract(messagesContract);
        const keysContract = new web3.eth.Contract(
          keysABI,
          keysContractAddress
        );
        setKeysContract(keysContract);
      } else {
        alert(
          'MetaMask is not installed. Please install MetaMask and connect to an Ethereum network.'
        );
      }
    }

    initializeWeb3();
  }, [usersABI, messagesABI, keysABI]);

  return (
    <AuthContext.Provider
      value={{
        account,
        web3,
        usersContract,
        messagesContract,
        keysContract,
        setAccount,
      }}>
      <html
        lang='en'
        className='text-primary bg-quaternary'>
        <body className='m-0'>
          <NavBar />
          <main>{children}</main>
        </body>
      </html>
    </AuthContext.Provider>
  );
}
