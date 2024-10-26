"use client";

import { BarChart, DollarSign, FileText, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const mockData = [
  { month: "Jan", amount: 2400 },
  { month: "Feb", amount: 1398 },
  { month: "Mar", amount: 9800 },
  { month: "Apr", amount: 3908 },
  { month: "May", amount: 4800 },
  { month: "Jun", amount: 3800 },
];

export function Dashboard() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-chart-1" />
            <h3 className="text-sm font-medium">Revenue</h3>
          </div>
          <p className="mt-2 text-2xl font-bold">$45,231.89</p>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-chart-2" />
            <h3 className="text-sm font-medium">Invoices</h3>
          </div>
          <p className="mt-2 text-2xl font-bold">34</p>
          <p className="text-xs text-muted-foreground">12 pending approval</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <BarChart className="h-4 w-4 text-chart-3" />
            <h3 className="text-sm font-medium">Expenses</h3>
          </div>
          <p className="mt-2 text-2xl font-bold">$21,012.00</p>
          <p className="text-xs text-muted-foreground">-5% from last month</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-chart-4" />
            <h3 className="text-sm font-medium">Profit Margin</h3>
          </div>
          <p className="mt-2 text-2xl font-bold">24.3%</p>
          <p className="text-xs text-muted-foreground">+2.4% from last month</p>
        </Card>
      </div>
      
      <Card className="p-4">
        <h3 className="mb-4 text-lg font-medium">Monthly Revenue</h3>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={mockData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="hsl(var(--chart-1))" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}