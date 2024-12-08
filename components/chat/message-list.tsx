"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "@/components/chat/message";
import type { ChatMessage } from "@/lib/storage";

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onTopicSelect?: (topic: string) => void;
}

export function MessageList({ messages, isLoading, onTopicSelect }: MessageListProps) {
  return (
    <ScrollArea className="h-[calc(100vh-200px)] pr-4">
      <div className="flex flex-col space-y-4 py-4">
        {messages.map((message, index) => (
          <Message key={index} message={message} onTopicSelect={onTopicSelect} />
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
