import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Home() {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight='100vh'>
      <Typography variant='h2'>Welcome to MessagingApp!</Typography>
    </Box>
  );
}
