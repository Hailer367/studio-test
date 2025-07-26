import { Coin } from "@/components/citadel/coin";
import { CreateGameCard } from "@/components/citadel/create-game-card";
import { MatchmakingCard } from "@/components/citadel/matchmaking-card";
import { ProfileCard } from "@/components/citadel/profile-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function HomePage() {
  return (
    <div className="container mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="text-4xl font-headline text-white">Welcome, Challenger</h1>
        <p className="text-muted-foreground">Fate awaits your coin flip. Will you emerge victorious?</p>
      </div>

      <Carousel className="w-full">
        <CarouselContent className="-ml-4">
          <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/2">
            <div className="h-full">
              <MatchmakingCard />
            </div>
          </CarouselItem>
          <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/2">
            <div className="h-full">
              <CreateGameCard />
            </div>
          </CarouselItem>
          <CarouselItem className="pl-4 w-full">
             <div className="h-full">
              <ProfileCard />
             </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex" />
        <CarouselNext className="hidden lg:flex" />
      </Carousel>
    </div>
  );
}
