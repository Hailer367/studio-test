
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const player = searchParams.get('player');

    if (!player) {
      return NextResponse.json({ error: 'Player parameter required' }, { status: 400 });
    }

    const { data: games, error } = await supabase
      .from('games')
      .select('*')
      .or(`creator.eq.${player},opponent.eq.${player}`)
      .eq('status', 'completed')
      .order('completed_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(games || []);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
  }
}
