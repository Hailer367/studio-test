import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-8 w-8 text-primary", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M19.1144 19.1144C18.3377 19.891 17.4332 20.5376 16.4355 21M4.88562 4.88562C5.66228 4.10901 6.5668 3.46238 7.56451 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 2V4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 19.5V22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3 7.56451C3.46238 6.5668 4.10901 5.66228 4.88562 4.88562L4.88562 4.88562M21 16.4355C20.5376 17.4332 19.891 18.3377 19.1144 19.1144L19.1144 19.1144"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4.5 12H2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M22 12H19.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
