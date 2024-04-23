'use client';

import { useState } from 'react';

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const drawerWidth = 180;

export default function DMSidebar(props: {
  sidebarContacts: Map<string, string>;
  onContactChange: (contact: string) => void;
}) {
  const contactClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectedContact =
      e.currentTarget.children[0].children[0].textContent!;
    if (selectedContact === 'New Conversation') {
      props.onContactChange('New Conversation');
    } else {
      props.onContactChange(props.sidebarContacts.get(selectedContact)!);
    }
  };

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#EAD8C0',
        },
      }}>
      <Toolbar />
      <Box
        sx={{ overflow: 'auto' }}
        className='text-primary bg-tertiary'>
        <Divider />
        <List>
          <ListItem
            key={-1}
            disablePadding>
            <ListItemButton onClick={contactClickHandler}>
              <ListItemText primary='New Conversation' />
            </ListItemButton>
          </ListItem>
          {Array.from(props.sidebarContacts.keys()).map((name, index) => (
            <ListItem
              key={name}
              disablePadding>
              <ListItemButton onClick={contactClickHandler}>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
