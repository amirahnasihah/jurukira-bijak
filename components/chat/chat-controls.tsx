"use client";

import { Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ChatControlsProps {
  onClear: () => void;
  onDownload: () => void;
}

export function ChatControls({ onClear, onDownload }: ChatControlsProps) {
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onDownload}
        className="flex items-center gap-2"
      >
        <Save className="h-4 w-4" />
        Download History
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          onClear();
          toast.success("Chat history cleared");
        }}
        className="flex items-center gap-2"
      >
        <Trash2 className="h-4 w-4" />
        Clear History
      </Button>
    </div>
  );
}