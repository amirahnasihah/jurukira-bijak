"use client";

import { useEffect, useState } from "react";
import type { ChatMessage } from "@/lib/storage";

interface MessageProps {
  message: ChatMessage;
}

export function Message({ message }: MessageProps) {
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    setTimeString(new Date(message.timestamp).toLocaleTimeString());
  }, [message.timestamp]);

  return (
    <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`rounded-lg px-4 py-2 max-w-[80%] ${
          message.role === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        }`}
      >
        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
        {timeString && (
          <div className="mt-1 text-xs opacity-50">{timeString}</div>
        )}
      </div>
    </div>
  );
}