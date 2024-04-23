'use client';

import { useRouter } from 'next/navigation';
import { useState, useContext } from 'react';
import bcrypt from 'bcryptjs';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { AuthContext } from '../layout';

const UserRegAndAuthForm = (props: { mode: string }) => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    account,
    web3,
    usersContract,
    messagesContract,
    keysContract,
    setAccount,
  } = useContext(AuthContext);

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const passwordHash = web3.utils
      .asciiToHex(bcrypt.hashSync(password, 8))
      .substring(0, 66);

    console.log(account, name, email, passwordHash);

    if (props.mode === 'Sign in') {
      // const res = await fetch('/api/authenticate', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // const { address } = await res.json();
      // setAddress(address);
      // try {
      const authResult = await usersContract.methods
        .authenticate(email, passwordHash)
        .call({ from: account });
      //   if (!authResult) {
      //     throw new Error('Incorrect credentials');
      //   }
      // } catch (error) {
      //   console.error('Error authenticating user');
      // }
    } else {
      // const res = await fetch('/api/registerUser', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password, name }),
      // });
      // const { address } = await res.json();
      // setAddress(address);
      const keyPair = await window.crypto.subtle.generateKey(
        {
          name: 'RSA-OAEP',
          modulusLength: 4096,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: 'SHA-256',
        },
        true,
        ['encrypt', 'decrypt']
      );
      const publicKey = keyPair.publicKey;
      const privateKey = keyPair.privateKey;

      console.log(publicKey, privateKey, account);

      // try {
      await usersContract.methods
        .registerUser(name, email, passwordHash)
        .send({ from: account });
      // await keysContract.methods
      //   .setPublicKey(publicKey)
      //   .send({ from: account });
      // await keysContract.methods
      //   .setPrivateKey(privateKey)
      //   .send({ from: account });
      // } catch (error) {
      //   console.error('Error registering user');
      // }
    }
    router.push('/dashboard');
  };

  return (
    <Stack
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight='100vh'
      className='text-primary bg-quaternary'
      spacing={10}>
      <Typography variant='h3'>{props.mode}</Typography>
      <form
        method='POST'
        onSubmit={formSubmitHandler}>
        <Stack spacing={3}>
          {props.mode === 'Sign up' && (
            <TextField
              id='outlined'
              label='Name'
              type='text'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          )}
          <TextField
            id='outlined'
            label='Email'
            type='email'
            helperText={
              props.mode === 'Sign up' ? 'Must be a valid email.' : ''
            }
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            id='outlined-password-input'
            label='Password'
            type='password'
            autoComplete='current-password'
            helperText={
              props.mode === 'Sign up'
                ? 'Must be at least 8 characters and include at least 1 of each: a lowercase letter, a capital letter, a number, and a special character.'
                : ''
            }
            className='w-96'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            variant='contained'
            type='submit'
            className='text-quaternary bg-secondary'>
            {props.mode}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default UserRegAndAuthForm;
