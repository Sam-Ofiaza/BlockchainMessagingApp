export async function GET(request: Request) {
  // Call Users.getAllAddresses and get a list of addresses
  const addresses = [
    '0x809d045a6c45d6fb35a12cfc62a84452792e8bdd',
    '0x809d045a6c45d6fb35a12cfc62a84452792e8bdd',
    '0x809d045a6c45d6fb35a12cfc62a84452792e8bdd',
    '0x809d045a6c45d6fb35a12cfc62a84452792e8bdd',
  ];

  const dummyNames = ['John Doe', 'Jane Doe', 'Mark Smith', 'Sally Cooper'];

  const contacts = addresses.map((address, idx) => ({
    address,
    name: dummyNames[idx],
  }));

  return Response.json(contacts);
}
