import { NextResponse } from 'next/server';
import { readJsonBodyWithLimit, RequestBodyTooLargeError } from '@/lib/apiRateLimit';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export async function POST(request: Request) {
  let body: { messages?: unknown };
  try {
    body = await readJsonBodyWithLimit<{ messages?: unknown }>(request, 128 * 1024);
  } catch (parseError) {
    const status = parseError instanceof RequestBodyTooLargeError ? 413 : 400;
    return NextResponse.json({ error: 'Corpo da solicita\u00e7\u00e3o inv\u00e1lido.' }, { status });
  }

  const openAiKey = process.env.TRUCKS_OPENAI_API_KEY;
  if (!openAiKey) {
    return NextResponse.json(
      { error: 'Servi\u00e7o de chat indispon\u00edvel.' },
      { status: 503 },
    );
  }

  if (!Array.isArray(body.messages) || body.messages.length > 20) {
    return NextResponse.json({ error: 'Mensagens inv\u00e1lidas.' }, { status: 400 });
  }

  const messages: ChatMessage[] = [];
  let totalContentLength = 0;
  for (const item of body.messages) {
    if (!item || typeof item !== 'object') {
      return NextResponse.json({ error: 'Mensagem inv\u00e1lida.' }, { status: 400 });
    }

    const message = item as Record<string, unknown>;
    if ((message.role !== 'user' && message.role !== 'assistant') || typeof message.content !== 'string') {
      return NextResponse.json({ error: 'Mensagem inv\u00e1lida.' }, { status: 400 });
    }
    if (message.content.length > 4000) {
      return NextResponse.json({ error: 'Mensagem muito longa.' }, { status: 400 });
    }

    totalContentLength += message.content.length;
    if (totalContentLength > 24_000) {
      return NextResponse.json({ error: 'Conversa muito longa.' }, { status: 400 });
    }
    messages.push({ role: message.role, content: message.content });
  }

  if (!messages.length || !messages.some((message) => message.role === 'user')) {
    return NextResponse.json({ error: 'Mensagens inv\u00e1lidas.' }, { status: 400 });
  }

  const systemMessage = {
    role: 'system',
    content: 'Voc\u00ea \u00e9 o assistente virtual da Gabardo Trucks. Responda em portugu\u00eas do Brasil, com cordialidade e objetividade.',
  };

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openAiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [systemMessage, ...messages],
        temperature: 0.7,
        max_tokens: 800,
      }),
      signal: AbortSignal.timeout(20_000),
    });

    if (!response.ok) {
      console.error('Chat provider returned an error:', response.status);
      return NextResponse.json({ error: 'Servi\u00e7o de chat temporariamente indispon\u00edvel.' }, { status: 502 });
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content;
    return NextResponse.json({ message: typeof message === 'string' ? message : '' });
  } catch (error) {
    console.error('Chat provider request failed:', error);
    return NextResponse.json({ error: 'Servi\u00e7o de chat temporariamente indispon\u00edvel.' }, { status: 502 });
  }
}
