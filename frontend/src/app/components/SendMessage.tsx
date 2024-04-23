import { useState } from 'react';

import TextField from '@mui/material/TextField';

const SendMessage = (props: {
  onMessageSend: (message: string) => void;
  disabled: boolean;
}) => {
  const [message, setMessage] = useState('');
  const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      props.onMessageSend(message);
    }
  };

  return (
    <TextField
      id='outlined-basic'
      label='Message'
      variant='filled'
      className='w-96 mx-10'
      value={message}
      onKeyDown={keyPressHandler}
      onChange={(e) => {
        setMessage(e.target.value);
      }}
      disabled={props.disabled}
    />
  );
};

export default SendMessage;
