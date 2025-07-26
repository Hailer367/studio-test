import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { opponent, transactionHash } = await request.json();
    const gameId = params.id;

    const { data: game, error } = await supabase
      .from('games')
      .update({
        opponent,
        status: 'active',
        transaction_hash: transactionHash,
      })
      .eq('id', gameId)
      .eq('status', 'waiting')
      .select()
      .single();

    if (error) throw error;

    if (!game) {
      return NextResponse.json({ error: 'Game not found or not available' }, { status: 404 });
    }

    return NextResponse.json(game);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to join game' }, { status: 500 });
  }
}