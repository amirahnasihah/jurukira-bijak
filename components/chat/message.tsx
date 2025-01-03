"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ChatMessage } from "@/lib/storage";
import { CopyButton } from "@/components/ui/copy-button";
import { ScrollArea } from "../ui/scroll-area";
import { CalculationDisplay } from "./calculation-display";
import { AccountingCalculation } from "./accounting-calculation";
import { UiTMAccountingCalculation } from "./uitm-accounting-calculation";

interface MessageProps {
  message: ChatMessage;
  onTopicSelect?: (topic: string) => void;
}

export function Message({ message, onTopicSelect }: MessageProps) {
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    setTimeString(new Date(message.timestamp).toLocaleTimeString());
  }, [message.timestamp]);

  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`relative rounded-lg px-4 py-2 max-w-[80%] ${
          message.role === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        }`}
      >
        {message.role === "assistant" && (
          <div className="absolute top-2 right-2">
            <CopyButton value={message.content} />
          </div>
        )}
        <div className="text-sm whitespace-pre-wrap pr-8 markdown-content">
          <ScrollArea className="pr-4">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-2xl font-bold my-4" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-xl font-bold my-3" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-lg font-bold my-2" {...props} />
                ),
                h4: ({ node, ...props }) => (
                  <h4 className="text-base font-bold my-2" {...props} />
                ),
                p: ({ node, ...props }) => <p className="my-2" {...props} />,
                ul: ({ node, ...props }) => (
                  <ul
                    className="list-disc list-inside my-2 space-y-1"
                    {...props}
                  />
                ),
                ol: ({ node, ...props }) => (
                  <ol
                    className="list-decimal list-inside my-2 space-y-1"
                    {...props}
                  />
                ),
                li: ({ node, ...props }) => <li className="my-1" {...props} />,
                strong: ({ node, ...props }) => (
                  <strong className="font-bold" {...props} />
                ),
                em: ({ node, ...props }) => (
                  <em className="italic" {...props} />
                ),
                code: ({ node, inline, ...props }: any) =>
                  inline ? (
                    <code
                      className="bg-muted-foreground/10 rounded-md px-1 py-0.5 text-sm"
                      {...props}
                    />
                  ) : (
                    <code
                      className="bg-muted-foreground/10 rounded-md p-1 text-sm block"
                      {...props}
                    />
                  ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="border-l-4 border-primary pl-4 my-2"
                    {...props}
                  />
                ),
                a: ({ node, href, ...props }) => (
                  <a
                    className="text-primary underline hover:no-underline"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),
                table: ({ node, ...props }) => (
                  <div className="my-4 w-full overflow-x-auto">
                    <table
                      className="min-w-full divide-y divide-gray-200"
                      {...props}
                    />
                  </div>
                ),
                thead: ({ node, ...props }) => (
                  <thead className="bg-muted/50" {...props} />
                ),
                th: ({ node, ...props }) => (
                  <th
                    className="px-3 py-2 text-left text-sm font-semibold"
                    {...props}
                  />
                ),
                td: ({ node, ...props }) => (
                  <td className="px-3 py-2 text-sm" {...props} />
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
            {message.calculation &&
              (message.calculation.type === "uitm-accounting" ? (
                <UiTMAccountingCalculation
                  title={message.calculation.title}
                  courseCode={message.calculation.courseCode!}
                  chapter={message.calculation.chapter!}
                  context={message.calculation.context}
                  steps={message.calculation.steps}
                  finalResult={message.calculation.finalResult!}
                  relatedFormulas={message.calculation.relatedFormulas}
                />
              ) : message.calculation.type === "accounting" ? (
                <AccountingCalculation
                  title={message.calculation.title}
                  context={message.calculation.context}
                  steps={message.calculation.steps}
                  finalResult={message.calculation.finalResult!}
                  relatedFormulas={message.calculation.relatedFormulas}
                />
              ) : (
                <CalculationDisplay
                  title={message.calculation.title}
                  steps={message.calculation.steps}
                  finalResult={message.calculation.finalResult}
                />
              ))}
            {message.sources && message.sources.length > 0 && (
              <div className="mt-4 border-t pt-2 text-xs">
                <div className="font-semibold mb-1">Sources:</div>
                {message.sources.map((source, index) => (
                  <div key={index} className="mb-2">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {source.title}
                    </a>
                    {source.snippet && (
                      <p className="mt-1 text-gray-600">{source.snippet}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
        {message.role === "assistant" &&
          message.content.includes("What would you like to know?") && (
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => onTopicSelect?.("Tell me about bookkeeping")}
                className="rounded-md bg-primary/10 px-3 py-1 text-sm hover:bg-primary/20 transition-colors"
              >
                Bookkeeping
              </button>
              <button
                onClick={() => onTopicSelect?.("Help me with tax planning")}
                className="rounded-md bg-primary/10 px-3 py-1 text-sm hover:bg-primary/20 transition-colors"
              >
                Tax Planning
              </button>
              <button
                onClick={() => onTopicSelect?.("Explain financial analysis")}
                className="rounded-md bg-primary/10 px-3 py-1 text-sm hover:bg-primary/20 transition-colors"
              >
                Financial Analysis
              </button>
              <button
                onClick={() =>
                  onTopicSelect?.("What is regulatory compliance?")
                }
                className="rounded-md bg-primary/10 px-3 py-1 text-sm hover:bg-primary/20 transition-colors"
              >
                Regulatory Compliance
              </button>
            </div>
          )}
        {timeString && (
          <div className="mt-1 text-xs opacity-50">{timeString}</div>
        )}
      </div>
    </div>
  );
}
