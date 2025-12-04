import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are Aryon, a helpful AI assistant created in Afghanistan by AFG Patriotic. You speak clearly, kindly, and support global users. Respond in the same language as the user.' },
        ...messages,
      ],
      model: 'llama3-8b-8192',
      temperature: 0.7,
      max_tokens: 512,
    });

    return Response.json({ reply: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error('Groq API Error:', error);
    return Response.json({ reply: 'خطایی در پردازش درخواست رخ داد.' }, { status: 500 });
  }
}
