import { NextRequest, NextResponse } from 'next/server';

// Google Places API endpoint
const GOOGLE_PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const type = searchParams.get('type');
  const radius = searchParams.get('radius') || '2000';

  // Validate required parameters
  if (!lat || !lng || !type) {
    return NextResponse.json(
      { error: 'Missing required parameters: lat, lng, type' },
      { status: 400 }
    );
  }

  // Validate API key
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Google Maps API key not configured' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `${GOOGLE_PLACES_API_URL}?location=${lat},${lng}&radius=${radius}&type=${type}&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.status}`);
    }

    const data = await response.json();

    // Transform Google Places response to our format
    const places = data.results?.map((place: any) => ({
      place_id: place.place_id,
      name: place.name,
      vicinity: place.vicinity,
      rating: place.rating,
      user_ratings_total: place.user_ratings_total,
      geometry: {
        location: {
          lat: place.geometry?.location?.lat,
          lng: place.geometry?.location?.lng,
        },
      },
      icon: place.icon,
      types: place.types || [],
    })) || [];

    return NextResponse.json({
      places,
      status: data.status,
    });
  } catch (error) {
    console.error('Places API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch places data' },
      { status: 500 }
    );
  }
}
