import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { name, email, password, lang, theme } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('book-cake');

    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists with this email' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      password: hashedPassword,
      ordersCount: 0,
      preferences: { lang: lang || 'en', theme: theme !== undefined ? theme : false },
      createdAt: new Date(),
    };

    const result = await db.collection('users').insertOne(newUser);

    return NextResponse.json(
      { message: 'User created successfully', user: { name: newUser.name, email: newUser.email, ordersCount: 0, preferences: newUser.preferences } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
