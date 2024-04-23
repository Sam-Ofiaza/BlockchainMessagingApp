export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const sender = params.slug[0];
  const recipient = params.slug[1];

  // Call Messages.getMyMessages and get a list of messages
  const dummyConversation = [
    {
      sender: '0x809D045a6c45d6Fb35A12cFC62A84452792E8BDd',
      recipient: '0x809D045a6c45d6Fb35A12cFC62A84452792E8BD',
      content:
        'The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start.',
      timestamp: 0,
      isRead: true,
    },
    {
      sender: '0x809D045a6c45d6Fb35A12cFC62A84452792E8BD',
      recipient: '0x809D045a6c45d6Fb35A12cFC62A84452792E8BDd',
      content:
        "Writing's not easy. That's why Grammarly can help. This sentence is grammatically correct, but it's wordy, and hard to read. It undermines the writer's message and the word choice is bland. Grammarly's cutting edge technology helps you craft compelling, understandable writing that makes an impact on your reader. Much better. Are you ready to give it a try? Installation is simple and free. Visit Grammarly.com today!",
      timestamp: 1,
      isRead: true,
    },
    {
      sender: '0x809D045a6c45d6Fb35A12cFC62A84452792E8BD',
      recipient: '0x809D045a6c45d6Fb35A12cFC62A84452792E8BDd',
      content:
        'A copypasta is a block of text copied and pasted to the Internet and social media. Copypasta containing controversial ideas or lengthy rants are often posted for humorous purposes, to provoke reactions from those unaware that the posted text is a meme.',
      timestamp: 2,
      isRead: true,
    },
    {
      sender: '0x809D045a6c45d6Fb35A12cFC62A84452792E8BDd',
      recipient: '0x809D045a6c45d6Fb35A12cFC62A84452792E8BD',
      content: `I like to creep around my home and act like a goblin

      I don’t know why but I just enjoy doing this. Maybe it’s my way of dealing with stress or something but I just do it about once every week. Generally I’ll carry around a sack and creep around in a sort of crouch-walking position making goblin noises, then I’ll walk around my house and pick up various different “trinkets” and put them in my bag while saying stuff like “I’ll be having that” and laughing maniacally in my goblin voice (“trinkets” can include anything from shit I find on the ground to cutlery or other utensils). The other day I was talking with my neighbours and they mentioned hearing weird noises like what I wrote about and I was just internally screaming the entire conversation. I’m 99% sure they don’t know it’s me but god that 1% chance is seriously weighing on my mind.`,
      timestamp: 3,
      isRead: true,
    },
    {
      sender: '0x809D045a6c45d6Fb35A12cFC62A84452792E8BD',
      recipient: '0x809D045a6c45d6Fb35A12cFC62A84452792E8BDd',
      content:
        "Anyways, um... I bought a whole bunch of shungite rocks, do you know what shungite is? Anybody know what shungite is? No, not Suge Knight, I think he's locked up in prison. I'm talkin' shungite. Anyways, it's a two billion year-old like, rock stone that protects against frequencies and unwanted frequencies that may be traveling in the air. That's my story, I bought a whole bunch of stuff. Put 'em around the la casa. Little pyramids, stuff like that.",
      timestamp: 4,
      isRead: false,
    },
  ];

  return Response.json(dummyConversation);
}
