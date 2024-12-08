"use client";

import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  isLoading,
}: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="flex gap-2 pb-4">
      <Textarea
        placeholder="Ask about bookkeeping, tax planning, or financial analysis..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[60px]"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit(e);
          }
        }}
      />
      <Button type="submit" size="icon" disabled={isLoading}>
        <SendHorizontal className="h-4 w-4" />
      </Button>
    </form>
  );
}
