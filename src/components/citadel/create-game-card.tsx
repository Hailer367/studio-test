"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSimulatedWallet } from "@/hooks/use-simulated-wallet";
import { PlusCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RuneIcon } from "../icons/rune-icon";
import { StaticCoin } from "./static-coin";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/lib/api";

const createGameSchema = z.object({
  wager: z.coerce.number().min(0.01, "Wager must be at least 0.01 SOL").max(10, "Wager cannot exceed 10 SOL"),
  side: z.enum(["light", "dark"]),
});

type CreateGameForm = z.infer<typeof createGameSchema>;

export function CreateGameCard() {
  const { connected, publicKey } = useSimulatedWallet();
  const [isCreating, setIsCreating] = React.useState(false);
  const [isCreated, setIsCreated] = React.useState(false);

  const form = useForm<CreateGameForm>({
    resolver: zodResolver(createGameSchema),
    defaultValues: {
      wager: 1,
      side: "light",
    },
  });

  const { control, handleSubmit, watch, reset } = form;
  const selectedSide = watch("side");
  const { toast } = useToast();

  const onSubmit = async (data: z.infer<typeof createGameSchema>) => {
    if (!connected || !publicKey) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to create a game.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsCreating(true);
      
      // Create game in database first
      const game = await api.createGame(publicKey, data.wager, data.side);
      
      toast({
        title: "Game Created!",
        description: `Waiting for an opponent to join your ${data.wager} SOL game.`,
      });
      reset();
      setIsCreating(false);
      setIsCreated(true);
      setTimeout(() => setIsCreated(false), 3000); // Reset after 3s
    } catch (error) {
      setIsCreating(false);
      toast({
        title: "Error",
        description: "Failed to create game. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!connected) {
    return (
      <Card className="h-full flex flex-col items-center justify-center text-center">
        <CardHeader>
          <CardTitle className="font-headline">Create a Match</CardTitle>
          <CardDescription>Set your own terms for battle.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Connect your wallet to create a game.</p>
        </CardContent>
      </Card>
    );
  }

  if (isCreated) {
    return (
        <Card className="h-full flex flex-col items-center justify-center text-center bg-green-900/20 border-green-500/50">
            <CardContent className="p-6">
                <PlusCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <h2 className="text-2xl font-headline text-white">Game Created!</h2>
                <p className="text-green-300/80">Your challenge has been added to the lobby.</p>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline">Create a Match</CardTitle>
        <CardDescription>Set your own terms for battle.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-grow">
        <CardContent className="flex-grow space-y-4">
          <div className="space-y-2">
            <Label htmlFor="wager-input">Wager Amount (SOL)</Label>
            <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-primary">◎</span>
                <Controller
                    name="wager"
                    control={control}
                    render={({ field }) => (
                         <Input
                            id="wager-input"
                            type="number"
                            step="0.01"
                            {...field}
                            className="text-lg font-mono w-full"
                          />
                    )}
                />
            </div>
            {form.formState.errors.wager && (
              <p className="text-sm text-destructive">{form.formState.errors.wager.message}</p>
            )}
          </div>

          <div className="flex items-center justify-center py-4">
            <StaticCoin side={selectedSide} />
          </div>

          <Controller
            name="side"
            control={control}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="space-y-2"
              >
                <Label>Choose Your Side</Label>
                <div className="grid grid-cols-2 gap-4">
                  <RadioGroupItem value="light" id="light" className="sr-only" />
                  <Label htmlFor="light" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-primary">
                    <RuneIcon className="h-8 w-8 mb-2 text-primary" />
                    Light
                  </Label>

                  <RadioGroupItem value="dark" id="dark" className="sr-only" />
                   <Label htmlFor="dark" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer [&:has([data-state=checked])]:border-accent">
                    <RuneIcon className="h-8 w-8 mb-2 text-accent -scale-x-100" />
                    Dark
                  </Label>
                </div>
              </RadioGroup>
            )}
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full font-headline tracking-wider" disabled={isCreating}>
            {isCreating ? 'Staking your claim...' : 'Create Game'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}