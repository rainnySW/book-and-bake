import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req) {
  try {
    const { email, lang, theme } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('book-cake');

    const updateFields = {};
    if (lang !== undefined) updateFields['preferences.lang'] = lang;
    if (theme !== undefined) updateFields['preferences.theme'] = theme;

    await db.collection('users').updateOne(
      { email },
      { $set: updateFields }
    );

    return NextResponse.json({ message: 'Preferences updated' }, { status: 200 });
  } catch (error) {
    console.error('Preferences Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
