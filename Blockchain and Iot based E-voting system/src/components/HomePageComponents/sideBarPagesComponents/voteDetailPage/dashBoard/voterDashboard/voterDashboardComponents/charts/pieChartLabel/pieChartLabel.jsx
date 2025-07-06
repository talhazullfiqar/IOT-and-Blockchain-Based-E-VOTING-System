"use client";
import { Pie, PieChart } from "recharts";
import styles from "./pieChartLabel.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../../../../SideBar/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../../../../../SideBar/ui/chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  pmln: {
    label: "PMLN",
    color: "hsl(var(--chart-1))",
  },
  pti: {
    label: "PTI",
    color: "hsl(var(--chart-2))",
  },
  ppp: {
    label: "PPP",
    color: "hsl(var(--chart-3))",
  },
  aml: {
    label: "AML",
    color: "hsl(var(--chart-4))",
  },
};

const rawVotes = [
  { candidates: "pmln", votes: 275 },
  { candidates: "pti", votes: 200 },
  { candidates: "ppp", votes: 150 },
  { candidates: "aml", votes: 100 },
];

const totalVotes = rawVotes.reduce((sum, item) => sum + item.votes, 0);

const chartData = rawVotes.map((item) => ({
  ...item,
  percentage: ((item.votes / totalVotes) * 100).toFixed(1),
  fill: chartConfig[item.candidates]?.color || "hsl(var(--chart-default))",
}));

export function PieChartLabel({ title, description }) {
  return (
    <div className="pieChartLabelContainer">
      <Card className="flex flex-col ">
        <CardHeader className="items-center pb-0">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0 ">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[350px] pb-10  [&_.recharts-pie-label-text]:fill-foreground"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="votes"
                nameKey="candidates"
                label={({ percentage }) => `${percentage}%`}
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
