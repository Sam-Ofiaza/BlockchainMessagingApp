import { useState, useEffect, useContext } from 'react';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { ContactItem } from '../dashboard/page';

import { AuthContext } from '../layout';

const NewConvo = (props: { onContactSelect: (contact: string) => void }) => {
  const [labels, setLabels] = useState<ContactItem[]>([]);
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
    //   const res = await fetch('/api/getAllAddresses');
    //   const allContacts = (await res.json()) as ContactItem[];
    //   setLabels(
    //     allContacts.map((contactItem) => ({
    //       ...contactItem,
    //       label: contactItem.name,
    //     }))
    //   );
    // };
    // getData();
    try {
      const getData = async () => {
        console.log('usersContract: ' + usersContract);
        console.log(usersContract);
        const allAddresses = await usersContract.methods
          .getAllAddresses()
          .call({ from: account });
        console.log('Users.getAllAddresses - allAddresses: ' + allAddresses);
        console.log(allAddresses);

        const newLabels = [];
        for (const address of allAddresses) {
          const userData = await usersContract.methods
            .users(address)
            .call({ from: account });
          newLabels.push({ address, label: userData[0] });
        }

        console.log('newLabels: ' + newLabels);
        console.log(newLabels);

        setLabels(newLabels);
      };
      getData();
    } catch (error) {
      console.error('Error getting all contacts');
    }
  }, [setLabels]);

  return (
    <>
      <Typography variant='h4'>Users</Typography>
      <Autocomplete
        className='w-96'
        options={labels}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Choose a user'
          />
        )}
        onChange={(
          e: React.SyntheticEvent<Element, Event>,
          v: { name: string; address: string; label: string }
        ) => {
          props.onContactSelect(v.address);
        }}
      />
    </>
  );
};

export default NewConvo;
