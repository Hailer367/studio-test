
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const gameId = params.id;

    // Get the game
    const { data: game, error: fetchError } = await supabase
      .from('games')
      .select('*')
      .eq('id', gameId)
      .eq('status', 'active')
      .single();

    if (fetchError) throw fetchError;

    if (!game) {
      return NextResponse.json({ error: 'Game not found or not active' }, { status: 404 });
    }

    // Simulate coin flip
    const flipResult: 'light' | 'dark' = Math.random() < 0.5 ? 'light' : 'dark';
    const creatorWins = flipResult === game.side;
    const result: 'win' | 'lose' = creatorWins ? 'win' : 'lose';

    // Update game with result
    const { data: updatedGame, error: updateError } = await supabase
      .from('games')
      .update({
        flip_result: flipResult,
        result,
        status: 'completed',
        completed_at: new Date().toISOString(),
      })
      .eq('id', gameId)
      .select()
      .single();

    if (updateError) throw updateError;

    return NextResponse.json({
      gameId,
      flipResult,
      creatorWins,
      creatorSide: game.side,
      wager: game.wager,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to flip coin' }, { status: 500 });
  }
}
