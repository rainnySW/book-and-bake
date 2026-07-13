import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('book-cake');
    
    // Test the connection by pinging the database
    await db.command({ ping: 1 });

    return NextResponse.json(
      { message: 'Successfully connected to MongoDB!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to MongoDB', details: error.message },
      { status: 500 }
    );
  }
}
