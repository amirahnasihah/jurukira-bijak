"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "@/components/chat/message";
import type { ChatMessage } from "@/lib/storage";

interface MessageListProps {
  messages: ChatMessage[];
  isLoading?: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  return (
    <ScrollArea className="h-full pr-4">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-lg bg-muted px-4 py-2">
              <span className="animate-pulse">Thinking...</span>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}