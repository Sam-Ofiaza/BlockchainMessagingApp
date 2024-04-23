export async function POST(request: Request) {
  const { sender, recipient, message } = await request.json();
  console.log(sender, recipient, message);

  // Call Messages.sendMessage
  const success = true;

  return Response.json({ success });
}
