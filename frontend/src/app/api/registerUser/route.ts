import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import Web3 from 'web3';

export async function POST(request: Request) {
  const { email, password, name } = await request.json();

  const passwordHash = bcrypt.hashSync(password, 8);
  let publicKey = '';
  let privateKey = '';

  crypto.generateKeyPair(
    'rsa',
    {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: 'top secret',
      },
    },
    (err, _publicKey, _privateKey) => {
      publicKey = _publicKey;
      privateKey = _privateKey;
    }
  );

  // Call Users.registerUser and get new user's address
  const address = '0x809D045a6c45d6Fb35A12cFC62A84452792E8BDd';

  return Response.json({ address });
}
