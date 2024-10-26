export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export function saveMessages(messages: ChatMessage[]) {
  try {
    localStorage.setItem('chat-history', JSON.stringify(messages));
  } catch (error) {
    console.error('Failed to save messages:', error);
  }
}

export function loadMessages(): ChatMessage[] | null {
  try {
    const saved = localStorage.getItem('chat-history');
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load messages:', error);
    return null;
  }
}