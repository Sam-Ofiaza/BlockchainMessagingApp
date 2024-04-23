import { useContext } from 'react';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';

import { AuthContext } from '../layout';

const NavBar = () => {
  const {
    account,
    web3,
    usersContract,
    messagesContract,
    keysContract,
    setAccount,
  } = useContext(AuthContext);

  return (
    <>
      <AppBar
        position='fixed'
        className='bg-secondary text-quaternary z-[1400]'>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}>
            <Link
              href='/'
              className='no-underline text-inherit'>
              MessagingApp
            </Link>
          </Typography>
          {account.length !== 0 ? (
            <>
              <Link
                href='/dashboard'
                className='no-underline text-inherit'>
                <Button color='inherit'>Dashboard</Button>
              </Link>
              <Link
                href='/'
                className='no-underline text-inherit'>
                <Button
                  color='inherit'
                  onClick={() => {
                    setAccount('');
                  }}>
                  Log out
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link
                href='/sign-in'
                className='no-underline text-inherit'>
                <Button color='inherit'>Sign in</Button>
              </Link>
              <Link
                href='/sign-up'
                className='no-underline text-inherit'>
                <Button color='inherit'>Sign up</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default NavBar;
