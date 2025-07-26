
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Coin } from "./coin";
import { Button } from "../ui/button";

interface MatchFoundDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opponent: {
    name: string;
    avatar: string;
  };
}

export function MatchFoundDialog({ open, onOpenChange, opponent }: MatchFoundDialogProps) {
  const handleClose = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full text-center bg-card/80 border-primary/50 p-8">
        <DialogHeader>
          <DialogTitle className="text-3xl font-headline text-primary tracking-widest text-center">
            Match Found!
          </DialogTitle>
          <DialogDescription className="text-center">
            The wager is locked. Let the flip decide your fate.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center justify-between w-full my-8">
            <div className="flex flex-col items-center gap-2 w-24">
                <Avatar className="h-20 w-20 border-4 border-primary shadow-lg">
                    <AvatarImage src="https://placehold.co/100x100" alt="Your avatar" data-ai-hint="warrior avatar" />
                    <AvatarFallback>YOU</AvatarFallback>
                </Avatar>
                <p className="font-bold text-lg">You</p>
            </div>
            
            <div className="flex-1 flex justify-center">
              <Coin />
            </div>

            <div className="flex flex-col items-center gap-2 w-24">
                  <Avatar className="h-20 w-20 border-4 border-destructive shadow-lg">
                    <AvatarImage src={opponent.avatar} alt="Opponent's avatar" data-ai-hint="mage avatar"/>
                    <AvatarFallback>{opponent.name.substring(0,3)}</AvatarFallback>
                </Avatar>
                <p className="font-bold text-lg truncate max-w-24">{opponent.name}</p>
            </div>
        </div>
        
        <DialogFooter className="justify-center">
          <Button onClick={handleClose} variant="outline" size="sm">
              Back to Lobby
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
