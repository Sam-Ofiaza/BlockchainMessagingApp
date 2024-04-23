export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Call Users.authenticate and get user's address
  const address = '0x809D045a6c45d6Fb35A12cFC62A84452792E8BDd';

  return Response.json({ address });
}
