"use client";

import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

interface Step {
  explanation: string;
  formula?: string;
  result?: string | number;
}

interface CalculationDisplayProps {
  title: string;
  steps: Step[];
  finalResult?: {
    label: string;
    value: string | number;
    formula?: string;
  };
}

export function CalculationDisplay({ title, steps, finalResult }: CalculationDisplayProps) {
  return (
    <div className="bg-slate-50 rounded-lg p-4 my-2 shadow-sm">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={index} className="border-l-2 border-blue-200 pl-3">
            <p className="text-sm text-gray-700 mb-1">{step.explanation}</p>
            {step.formula && (
              <div className="my-1 overflow-x-auto">
                <BlockMath math={step.formula} />
              </div>
            )}
            {step.result && (
              <div className="text-sm font-medium text-gray-900">
                Result: <InlineMath math={String(step.result)} />
              </div>
            )}
          </div>
        ))}
      </div>

      {finalResult && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700">{finalResult.label}:</span>
            <div className="text-lg font-semibold text-blue-600">
              {finalResult.formula ? (
                <InlineMath math={finalResult.formula} />
              ) : (
                finalResult.value
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
