"use client";

import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import { Info, TrendingUp, AlertCircle, BookOpen } from 'lucide-react';

interface TipInfo {
  type: 'info' | 'important' | 'trick' | 'uitm';
  content: string;
}

interface AccountingStep {
  explanation: string;
  formula?: string;
  result?: string | number;
  tips?: TipInfo[];
  commonMistakes?: string[];
}

interface AccountingCalculationProps {
  title: string;
  context?: string;
  steps: AccountingStep[];
  finalResult: {
    label: string;
    value: string | number;
    formula?: string;
  };
  relatedFormulas?: {
    name: string;
    formula: string;
  }[];
}

function TipBox({ tip }: { tip: TipInfo }) {
  const icons = {
    info: <Info className="h-4 w-4 text-blue-500" />,
    important: <AlertCircle className="h-4 w-4 text-amber-500" />,
    trick: <TrendingUp className="h-4 w-4 text-green-500" />,
    uitm: <BookOpen className="h-4 w-4 text-purple-500" />
  };

  const colors = {
    info: 'bg-blue-50 border-blue-200',
    important: 'bg-amber-50 border-amber-200',
    trick: 'bg-green-50 border-green-200',
    uitm: 'bg-purple-50 border-purple-200'
  };

  return (
    <div className={`flex items-start gap-2 p-2 rounded-md ${colors[tip.type]} mt-1`}>
      {icons[tip.type]}
      <span className="text-sm">{tip.content}</span>
    </div>
  );
}

export function AccountingCalculation({
  title,
  context,
  steps,
  finalResult,
  relatedFormulas
}: AccountingCalculationProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 my-2 shadow-sm">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {context && (
        <p className="text-gray-600 text-sm mb-4">{context}</p>
      )}

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="border-l-2 border-blue-200 pl-4">
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                Step {index + 1}
              </span>
            </div>
            <p className="text-sm text-gray-700 mt-2">{step.explanation}</p>
            
            {step.formula && (
              <div className="my-2 p-2 bg-gray-50 rounded overflow-x-auto">
                <BlockMath math={step.formula} />
              </div>
            )}

            {step.result && (
              <div className="text-sm font-medium text-gray-900 mt-2">
                Result: <InlineMath math={String(step.result)} />
              </div>
            )}

            {step.tips && step.tips.map((tip, tipIndex) => (
              <TipBox key={tipIndex} tip={tip} />
            ))}

            {step.commonMistakes && step.commonMistakes.length > 0 && (
              <div className="mt-2 p-2 bg-red-50 rounded-md">
                <p className="text-xs font-medium text-red-800 mb-1">Common Mistakes:</p>
                <ul className="list-disc list-inside text-xs text-red-700">
                  {step.commonMistakes.map((mistake, mistakeIndex) => (
                    <li key={mistakeIndex}>{mistake}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="flex items-center justify-between bg-blue-50 p-3 rounded-md">
          <span className="font-medium text-gray-700">{finalResult.label}:</span>
          <div className="text-lg font-semibold text-blue-700">
            {finalResult.formula ? (
              <InlineMath math={finalResult.formula} />
            ) : (
              finalResult.value
            )}
          </div>
        </div>
      </div>

      {relatedFormulas && relatedFormulas.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <h4 className="text-sm font-semibold mb-2">Related Formulas</h4>
          <div className="grid gap-2">
            {relatedFormulas.map((formula, index) => (
              <div key={index} className="bg-gray-50 p-2 rounded">
                <p className="text-xs text-gray-600 mb-1">{formula.name}</p>
                <BlockMath math={formula.formula} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
