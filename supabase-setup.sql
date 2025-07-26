
-- Create games table
CREATE TABLE IF NOT EXISTS games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  creator TEXT NOT NULL,
  wager DECIMAL(10,9) NOT NULL,
  side TEXT CHECK (side IN ('light', 'dark')) NOT NULL,
  status TEXT CHECK (status IN ('waiting', 'active', 'completed')) DEFAULT 'waiting',
  opponent TEXT,
  result TEXT CHECK (result IN ('win', 'lose')),
  flip_result TEXT CHECK (flip_result IN ('light', 'dark')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  transaction_hash TEXT
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_games_status ON games(status);
CREATE INDEX IF NOT EXISTS idx_games_creator ON games(creator);
CREATE INDEX IF NOT EXISTS idx_games_opponent ON games(opponent);
CREATE INDEX IF NOT EXISTS idx_games_created_at ON games(created_at);

-- Enable Row Level Security
ALTER TABLE games ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (you can modify these as needed)
CREATE POLICY "Enable read access for all users" ON games FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON games FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON games FOR UPDATE USING (true);
