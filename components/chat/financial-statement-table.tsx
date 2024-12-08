"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface FinancialStatementItem {
  description: string;
  amount: number;
  indentLevel?: number;
  isBold?: boolean;
  isTotal?: boolean;
}

interface FinancialStatementSection {
  title: string;
  items: FinancialStatementItem[];
}

interface FinancialStatementTableProps {
  title: string;
  date?: string;
  sections: FinancialStatementSection[];
  currency?: string;
}

export function FinancialStatementTable({
  title,
  date,
  sections,
  currency = "RM"
}: FinancialStatementTableProps) {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ms-MY', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="w-full my-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {date && <p className="text-sm text-gray-600">As at {date}</p>}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-2/3">Description</TableHead>
            <TableHead className="text-right">{currency}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sections.map((section, sectionIndex) => (
            <>
              {/* Section Title */}
              <TableRow key={`section-${sectionIndex}`}>
                <TableCell colSpan={2} className="font-semibold bg-muted/30">
                  {section.title}
                </TableCell>
              </TableRow>
              
              {/* Section Items */}
              {section.items.map((item, itemIndex) => (
                <TableRow 
                  key={`item-${sectionIndex}-${itemIndex}`}
                  className={item.isTotal ? "font-semibold border-t" : ""}
                >
                  <TableCell className={`${item.isBold ? "font-semibold" : ""}`}>
                    <span style={{ marginLeft: `${(item.indentLevel || 0) * 1.5}rem` }}>
                      {item.description}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatAmount(item.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
