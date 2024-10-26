import { AccountingChat } from "@/components/accounting-chat";
import {
  Calculator,
  BookOpen,
  Receipt,
  Landmark,
  FileSpreadsheet,
} from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col container mx-auto">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            <span className="text-xl font-bold">Pasal Akaun</span>
          </div>
        </div>
      </header>

      <div className="container flex-1 items-stretch py-6 md:grid md:grid-cols-[1fr_300px] md:gap-6 lg:grid-cols-[1fr_400px]">
        <div className="flex-1">
          <AccountingChat />
        </div>

        <div className="hidden md:block">
          <div className="sticky top-24 space-y-4">
            <div className="rounded-lg border bg-card p-4">
              <h2 className="font-semibold">Expertise Areas</h2>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Bookkeeping & Accounting</span>
                </div>
                <div className="flex items-center gap-2">
                  <Receipt className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Tax Planning & Compliance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Landmark className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Regulatory Compliance</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Financial Reporting</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-4">
              <h2 className="font-semibold">Sample Questions</h2>
              <div className="mt-4 space-y-3">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Bookkeeping
                  </h3>
                  <button className="w-full rounded-md bg-muted p-3 text-left text-sm hover:bg-muted/80">
                    What is the difference between cash and accrual accounting?
                  </button>
                  <button className="w-full rounded-md bg-muted p-3 text-left text-sm hover:bg-muted/80">
                    How do I reconcile bank statements?
                  </button>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Tax Planning
                  </h3>
                  <button className="w-full rounded-md bg-muted p-3 text-left text-sm hover:bg-muted/80">
                    What are the latest tax deductions for small businesses?
                  </button>
                  <button className="w-full rounded-md bg-muted p-3 text-left text-sm hover:bg-muted/80">
                    How do I calculate estimated tax payments?
                  </button>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Financial Analysis
                  </h3>
                  <button className="w-full rounded-md bg-muted p-3 text-left text-sm hover:bg-muted/80">
                    How do I analyze financial ratios?
                  </button>
                  <button className="w-full rounded-md bg-muted p-3 text-left text-sm hover:bg-muted/80">
                    What are key performance indicators for my business?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
