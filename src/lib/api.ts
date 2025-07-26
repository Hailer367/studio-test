
const API_BASE = '/api';

export interface Game {
  id: string;
  creator: string;
  wager: number;
  side: 'light' | 'dark';
  status: 'waiting' | 'active' | 'completed';
  opponent?: string;
  result?: 'win' | 'lose';
  flip_result?: 'light' | 'dark';
  created_at: string;
  completed_at?: string;
  transaction_hash?: string;
}

export interface FlipResult {
  gameId: string;
  flipResult: 'light' | 'dark';
  creatorWins: boolean;
  creatorSide: 'light' | 'dark';
  wager: number;
}

export const api = {
  // Get available games for matchmaking
  getAvailableGames: async (): Promise<Game[]> => {
    const response = await fetch(`${API_BASE}/games`);
    if (!response.ok) throw new Error('Failed to fetch games');
    return response.json();
  },

  // Create a new game
  createGame: async (creator: string, wager: number, side: 'light' | 'dark'): Promise<Game> => {
    const response = await fetch(`${API_BASE}/games`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creator, wager, side }),
    });
    if (!response.ok) throw new Error('Failed to create game');
    return response.json();
  },

  // Join an existing game
  joinGame: async (gameId: string, opponent: string, transactionHash?: string): Promise<Game> => {
    const response = await fetch(`${API_BASE}/games/${gameId}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ opponent, transactionHash }),
    });
    if (!response.ok) throw new Error('Failed to join game');
    return response.json();
  },

  // Flip the coin for a game
  flipCoin: async (gameId: string): Promise<FlipResult> => {
    const response = await fetch(`${API_BASE}/games/${gameId}/flip`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to flip coin');
    return response.json();
  },

  // Get game history for a player
  getHistory: async (player: string): Promise<Game[]> => {
    const response = await fetch(`${API_BASE}/history?player=${encodeURIComponent(player)}`);
    if (!response.ok) throw new Error('Failed to fetch history');
    return response.json();
  },
};
