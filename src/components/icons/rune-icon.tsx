import { cn } from "@/lib/utils"

export function RuneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L2 12L12 22L22 12L12 2Z" />
      <path d="M12 5V19" />
      <path d="M17 7L7 17" />
    </svg>
  );
}
