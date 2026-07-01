import { NextResponse } from 'next/server';

type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export async function POST(request: Request) {
  const openAiKey = process.env.TRUCKS_OPENAI_API_KEY;

  if (!openAiKey) {
    return NextResponse.json(
      { error: 'TRUCKS_OPENAI_API_KEY is not configured.' },
      { status: 503 }
    );
  }

  const body = (await request.json()) as { messages?: ChatMessage[] };
  const messages = body.messages?.filter(
    (message) => message.role && typeof message.content === 'string'
  );

  if (!messages?.length) {
    return NextResponse.json({ error: 'Messages are required.' }, { status: 400 });
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${openAiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json(
      { error: `OpenAI API error: ${response.status} ${response.statusText}`, details: errorText },
      { status: response.status }
    );
  }

  const data = await response.json();
  const message = data.choices?.[0]?.message?.content;

  return NextResponse.json({ message: message ?? '' });
}
