"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { MessageList } from "@/components/chat/message-list";
import { ChatControls } from "@/components/chat/chat-controls";
import { ChatInput } from "@/components/chat/chat-input";
import { getGeminiResponse } from "@/lib/gemini";
import { saveMessages, loadMessages, type ChatMessage } from "@/lib/storage";
import { toast } from "sonner";

const INITIAL_MESSAGE: ChatMessage = {
  role: "assistant",
  content: "Hello! I'm your AI accounting assistant. I can help you with bookkeeping, tax planning, financial analysis, and regulatory compliance. What would you like to know?",
  timestamp: Date.now(),
};

export function AccountingChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedMessages = loadMessages();
    if (savedMessages.length > 0) {
      setMessages(savedMessages);
    } else {
      setMessages([INITIAL_MESSAGE]);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input.trim(),
      timestamp: Date.now(),
    };

    setInput("");
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(userMessage.content);
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response,
        timestamp: Date.now(),
      };
      const updatedMessages = [...messages, userMessage, assistantMessage];
      setMessages(updatedMessages);
      saveMessages(updatedMessages);
    } catch (error) {
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: "I apologize, but I encountered an error. Please try again or rephrase your question.",
        timestamp: Date.now(),
      };
      const updatedMessages = [...messages, userMessage, errorMessage];
      setMessages(updatedMessages);
      saveMessages(updatedMessages);
      toast.error("Failed to get response from AI service");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([INITIAL_MESSAGE]);
    saveMessages([INITIAL_MESSAGE]);
  };

  const downloadHistory = () => {
    const historyText = messages
      .map((msg) => `${msg.role.toUpperCase()} (${new Date(msg.timestamp).toLocaleString()})\n${msg.content}`)
      .join('\n\n---\n\n');
    
    const blob = new Blob([historyText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `accounting-chat-history-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Chat history downloaded");
  };

  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col gap-4">
      <Card className="flex-1 p-4">
        <ChatControls onClear={handleClear} onDownload={downloadHistory} />
        <MessageList 
          messages={messages} 
          isLoading={isLoading} 
          onTopicSelect={setInput}
        />
      </Card>

      <ChatInput
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}