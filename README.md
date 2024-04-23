Credit to Lea Lobanov for the idea (https://medium.com/coinmonks/building-a-blockchain-based-messaging-application-on-ethereum-a-complete-guide-3ce5a7253260)

# Set up:
- Install Ganache: https://archive.trufflesuite.com/ganache/
- Install Truffle: https://archive.trufflesuite.com/docs/truffle/how-to/install/
- Install MetaMask browser extension: https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?pli=1
  -  Go through the basic introduction
  -  Be ready to copy private keys from Ganache test accounts to import them into this extension
- Clone this repo
- Launch Ganache and select Quickstart
  - Make sure the development host and port settings in Ganache match entries in the truffle-config.js file at the root level
  - Click the settings icon at the top right, then the add project button, and select the truffle-config.js file using the file picker
  - Click the save and restart button at the top right
- Go to MetaMask and change your network to Ganache Local
- Navigate to your cloned project and run the command “truffle migrate”
- Navigate to /frontend
  - Run npm install
  - Open the file at /frontend/src/app/layout.tsx
- Go to Ganache
  - Go to the Contracts tab and copy the deployed Users, Messages, and Keys contract addresses into usersContractAddress, messagesContractAddress, and keysContractAddress in layout.tsx
  - Go to the Accounts tab
- Go to MetaMask and add 2-3 Ganache accounts using their private keys (click on the key icon on the right)
- Go to your terminal in /frontend and run the command “npm run dev”
- Open up whatever localhost it makes
- If you aren’t prompted by MetaMask to connect an account, connect it manually
  - Manual account connection: click the 3 vertical dots at the top right -> Connected sites -> Manually connect to the current site
- Sign up with one account, then log in to another and sign up/sign in, and send a message to the first one

# Analysis
It takes way too long for messages to be sent to and loaded from the blockchain even in a local server, so constant refreshing and re-opening MetaMask is needed. Real-time messaging is a terrible use case for blockchain platforms because it’s so slow and costs so much gas/wei for the most barebones functionality. Multimedia content seems too convoluted to implement and group chats will increase the lag time and cost even more. Future projects should probably stick to more realistic, traditional blockchain ideas (virtual ledgers, secure record-keeping, intermittent data updates).

### Implemented features:
- 1-on-1 private messaging
- Message sent timestamps
- Message read notifications

### Potential features:
- Encryption using the Keys smart contract
- Frontend front page
- Change user information
- Recover password
- Delete user(s)
- Block user(s)
- Persistent logins
- Message filters
- Group chats
- Admin/group leader access control
- Multimedia content (profile pictures, sending videos/gifs/recordings (use third party hosting?))

### Advanced features mentioned in the article:
- Testing: Unit testing, Integration testing, UI testing
- Security auditing: vulnerability checks (reentrancy, arithmetic over/underflow, smart contract permission issues)
- Testnet deployment (not the local dev network, but not the main network either)
- Deployment to the Ethereum mainnet (requires using actual money)
- Webpage Hosting (probably using Vercel)
- Getting a domain name and SSL certificate
- SEO, gas optimization
- Smart contract security: using secure libraries, highly secure input validation, minimizing external calls and use of untrusted contracts, gas limits to prevent DOS attacks, access control
- Secure key management: encourage users to use hardware wallets, multi-signature approvals, backups for private keys
- User authentication: using OAuth or 2FA, salting passwords, ensuring secure session management
