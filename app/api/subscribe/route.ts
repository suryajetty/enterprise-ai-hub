import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const API_KEY = process.env.CONVERTKIT_API_KEY;
    const FORM_ID = process.env.CONVERTKIT_FORM_ID;

    // Failsafe to ensure variables are loaded in production
    if (!API_KEY || !FORM_ID) {
      console.error('ConvertKit configuration missing. Check environment variables.');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // ConvertKit API v3 Subscription Endpoint
    const convertKitUrl = `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`;

    const response = await fetch(convertKitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        api_key: API_KEY,
        email: email,
      }),
    });

    if (!response.ok) {
      console.error('ConvertKit API rejected the request');
      return NextResponse.json({ error: 'Failed to subscribe to ConvertKit' }, { status: 400 });
    }

    console.log(`[API ROUTE]: Successfully sent ${email} to ConvertKit`);
    return NextResponse.json({ message: 'Subscription successful' }, { status: 201 });
    
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}