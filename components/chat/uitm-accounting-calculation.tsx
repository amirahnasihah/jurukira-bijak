"use client";

import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";
import {
  Info,
  TrendingUp,
  AlertCircle,
  BookOpen,
  Calculator,
  ArrowUp,
} from "lucide-react";
import { FinancialStatementTable } from "./financial-statement-table";
import { useEffect, useState } from "react";

interface UiTMReference {
  course: string;
  chapter: string;
  topic: string;
  page?: string;
}

interface AccountingTip {
  type: "info" | "important" | "trick" | "uitm";
  content: string;
  reference?: UiTMReference;
}

interface JournalEntry {
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
}

interface FinancialStatement {
  type: "balanceSheet" | "incomeStatement" | "cashFlow";
  title: string;
  date?: string;
  sections: {
    title: string;
    items: {
      description: string;
      amount: number;
      indentLevel?: number;
      isBold?: boolean;
      isTotal?: boolean;
    }[];
  }[];
}

interface AccountingStep {
  explanation: string;
  formula?: string;
  result?: string | number;
  tips?: AccountingTip[];
  commonMistakes?: string[];
  journalEntries?: JournalEntry[];
  workings?: string;
  financialStatement?: FinancialStatement;
}

interface UiTMAccountingCalculationProps {
  title: string;
  courseCode: string;
  chapter: string;
  context?: string;
  steps: AccountingStep[];
  finalResult: {
    label: string;
    value: string | number;
    formula?: string;
    journalEntries?: JournalEntry[];
  };
  relatedFormulas?: {
    name: string;
    formula: string;
    uitm_reference?: UiTMReference;
  }[];
}

function TipBox({ tip }: { tip: AccountingTip }) {
  const icons = {
    info: <Info className="h-4 w-4 text-blue-500" />,
    important: <AlertCircle className="h-4 w-4 text-amber-500" />,
    trick: <TrendingUp className="h-4 w-4 text-green-500" />,
    uitm: <BookOpen className="h-4 w-4 text-purple-500" />,
  };

  const colors = {
    info: "bg-blue-50 border-blue-200",
    important: "bg-amber-50 border-amber-200",
    trick: "bg-green-50 border-green-200",
    uitm: "bg-purple-50 border-purple-200",
  };

  return (
    <div
      className={`flex items-start gap-2 p-2 rounded-md ${
        colors[tip.type]
      } mt-1`}
    >
      {icons[tip.type]}
      <div className="flex-1">
        <span className="text-sm">{tip.content}</span>
        {tip.reference && (
          <div className="text-xs mt-1 text-gray-600">
            Reference: {tip.reference.course} - {tip.reference.chapter} (
            {tip.reference.topic})
            {tip.reference.page && `, Page ${tip.reference.page}`}
          </div>
        )}
      </div>
    </div>
  );
}

function JournalEntryTable({ entries }: { entries: JournalEntry[] }) {
  return (
    <div className="overflow-x-auto mt-2">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-xs text-gray-500">Date</th>
            <th className="px-4 py-2 text-xs text-gray-500">Description</th>
            <th className="px-4 py-2 text-xs text-gray-500 text-right">
              Debit (RM)
            </th>
            <th className="px-4 py-2 text-xs text-gray-500 text-right">
              Credit (RM)
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {entries.map((entry, index) => (
            <>
              {entry.debit?.map((debit, dIndex) => (
                <tr key={`${index}-d-${dIndex}`}>
                  {dIndex === 0 && (
                    <td
                      className="px-4 py-2 text-xs"
                      rowSpan={
                        (entry.debit?.length || 0) + (entry.credit?.length || 0)
                      }
                    >
                      {entry.date}
                    </td>
                  )}
                  <td className="px-4 py-2 text-xs">{debit.account}</td>
                  <td className="px-4 py-2 text-xs text-right">
                    {debit.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-xs text-right"></td>
                </tr>
              ))}
              {entry.credit?.map((credit, cIndex) => (
                <tr key={`${index}-c-${cIndex}`}>
                  <td className="px-4 py-2 text-xs pl-8">{credit.account}</td>
                  <td className="px-4 py-2 text-xs text-right"></td>
                  <td className="px-4 py-2 text-xs text-right">
                    {credit.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-1 text-xs text-gray-500 italic"
                >
                  {entry.description}
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function UiTMAccountingCalculation({
  title,
  courseCode,
  chapter,
  context,
  steps,
  finalResult,
  relatedFormulas,
}: UiTMAccountingCalculationProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollTop(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 my-2 shadow-sm relative">
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="text-sm text-gray-600">
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
            {courseCode} - Chapter {chapter}
          </span>
        </div>
      </div>

      {context && (
        <div className="text-gray-600 text-sm mb-4 bg-gray-50 p-3 rounded">
          {context}
        </div>
      )}

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="border-l-2 border-purple-200 pl-4">
            <div className="flex items-center gap-2">
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded">
                Step {index + 1}
              </span>
            </div>

            <p className="text-sm text-gray-700 mt-2">{step.explanation}</p>

            {step.formula && (
              <div className="my-2 p-2 bg-gray-50 rounded overflow-x-auto">
                <div className="text-xs font-medium text-gray-600 mb-1">
                  Formula:
                </div>
                <BlockMath>{step.formula.replace(/\n/g, " ")}</BlockMath>
              </div>
            )}

            {step.workings && (
              <div className="my-2 p-2 bg-gray-50 rounded">
                <div className="text-xs font-medium text-gray-600 mb-1">
                  Workings:
                </div>
                <pre className="text-xs whitespace-pre-wrap">
                  {step.workings}
                </pre>
              </div>
            )}

            {step.journalEntries && (
              <JournalEntryTable entries={step.journalEntries} />
            )}

            {step.result && (
              <div className="text-sm font-medium text-gray-900 mt-2 bg-blue-50 p-2 rounded">
                Result: <InlineMath math={String(step.result)} />
              </div>
            )}

            {step.tips &&
              step.tips.map((tip, tipIndex) => (
                <TipBox key={tipIndex} tip={tip} />
              ))}

            {step.commonMistakes && step.commonMistakes.length > 0 && (
              <div className="mt-2 p-2 bg-red-50 rounded-md">
                <p className="text-xs font-medium text-red-800 mb-1">
                  Common Mistakes:
                </p>
                <ul className="list-disc list-inside text-xs text-red-700">
                  {step.commonMistakes.map((mistake, mistakeIndex) => (
                    <li key={mistakeIndex}>{mistake}</li>
                  ))}
                </ul>
              </div>
            )}

            {step.financialStatement && (
              <FinancialStatementTable
                title={step.financialStatement.title}
                date={step.financialStatement.date}
                sections={step.financialStatement.sections}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="bg-purple-50 p-4 rounded-md">
          <h4 className="text-sm font-semibold text-purple-800 mb-3">
            Final Result: {finalResult.label}
          </h4>

          {finalResult.formula ? (
            <div className="text-lg font-semibold text-purple-900">
              <BlockMath math={finalResult.formula} />
            </div>
          ) : (
            <div className="text-lg font-semibold text-purple-900">
              {finalResult.value}
            </div>
          )}

          {finalResult.journalEntries && (
            <div className="mt-4">
              <h5 className="text-sm font-medium text-purple-800 mb-2">
                Journal Entries:
              </h5>
              <JournalEntryTable entries={finalResult.journalEntries} />
            </div>
          )}
        </div>
      </div>

      {relatedFormulas && relatedFormulas.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-semibold mb-3">Related Formulas</h4>
          <div className="grid gap-3">
            {relatedFormulas.map((formula, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs text-gray-600">{formula.name}</p>
                  {formula.uitm_reference && (
                    <span className="text-xs text-purple-600">
                      {formula.uitm_reference.course} -{" "}
                      {formula.uitm_reference.chapter}
                    </span>
                  )}
                </div>
                <BlockMath math={formula.formula} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
