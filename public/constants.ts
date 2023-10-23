import { Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";

export const MAX_FREE_COUNTS = 5;

export const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    border: "rounded-2xl",
    note: "This AI can be used to create engaging dialogues, answer questions, provide explanations, and more.",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    border: "rounded-2xl",
    note: "This AI can be used to compose original music.It’s perfect for creating background music for videos, games, or personal enjoyment.",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image",
    border: "rounded-2xl",
    note: "This AI can be used to create original images based on your descriptions.",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/video",
    border: "rounded-2xl",
    note: "This service uses AI to create short videos based on your input.",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code",
    border: "rounded-2xl",
    note: "This service uses AI to write code based on your specifications.",
    marginBottom: "mb-10",
  },
];
