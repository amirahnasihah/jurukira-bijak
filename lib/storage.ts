export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  sources?: {
    title: string;
    url: string;
    snippet?: string;
  }[];
  calculation?: {
    type: "general" | "accounting" | "uitm-accounting";
    title: string;
    courseCode?: string;
    chapter?: string;
    context?: string;
    steps: {
      explanation: string;
      formula?: string;
      result?: string | number;
      tips?: {
        type: 'info' | 'important' | 'trick' | 'uitm';
        content: string;
        reference?: {
          course: string;
          chapter: string;
          topic: string;
          page?: string;
        };
      }[];
      commonMistakes?: string[];
      journalEntries?: {
        date: string;
        description: string;
        debit?: {
          account: string;
          amount: number;
        }[];
        credit?: {
          account: string;
          amount: number;
        }[];
      }[];
      workings?: string;
    }[];
    finalResult?: {
      label: string;
      value: string | number;
      formula?: string;
      journalEntries?: {
        date: string;
        description: string;
        debit?: {
          account: string;
          amount: number;
        }[];
        credit?: {
          account: string;
          amount: number;
        }[];
      }[];
    };
    relatedFormulas?: {
      name: string;
      formula: string;
      uitm_reference?: {
        course: string;
        chapter: string;
        topic: string;
        page?: string;
      };
    }[];
  };
}

export function saveMessages(messages: ChatMessage[]) {
  try {
    localStorage.setItem('chat-history', JSON.stringify(messages));
  } catch (error) {
    console.error('Failed to save messages:', error);
  }
}

export function loadMessages(): ChatMessage[] {
  try {
    const saved = localStorage.getItem('chat-history');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load messages:', error);
    return [];
  }
}

export function clearMessages() {
  try {
    localStorage.removeItem('chat-history');
  } catch (error) {
    console.error('Failed to clear messages:', error);
  }
}