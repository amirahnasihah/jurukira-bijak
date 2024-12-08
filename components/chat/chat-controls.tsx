"use client";

import { Button } from "@/components/ui/button";
import { Trash2, Download } from "lucide-react";
import { clearMessages } from "@/lib/storage";
import { toast } from "sonner";

interface ChatControlsProps {
  onClear: () => void;
  onDownload?: () => void;
}

export function ChatControls({ onClear, onDownload }: ChatControlsProps) {
  const handleClear = () => {
    clearMessages();
    onClear();
    toast.success("Chat history cleared");
  };

  return (
    <div className="flex justify-end space-x-2 mb-4">
      {onDownload && (
        <Button
          variant="outline"
          size="icon"
          onClick={onDownload}
          title="Download chat history"
        >
          <Download className="h-4 w-4" />
        </Button>
      )}
      <Button
        variant="outline"
        size="icon"
        onClick={handleClear}
        title="Clear chat history"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}