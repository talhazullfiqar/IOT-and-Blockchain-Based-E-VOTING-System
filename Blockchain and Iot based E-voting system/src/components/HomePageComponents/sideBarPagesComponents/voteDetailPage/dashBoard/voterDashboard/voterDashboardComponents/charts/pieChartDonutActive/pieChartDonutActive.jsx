"use client";

import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart, Sector } from "recharts";
import "./pieChartDonutActive.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../../../SideBar/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../../../../../SideBar/ui/chart";

const chartConfig = {
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

const chartData = [
  { candidates: "pmln", votes: 275 },
  { candidates: "pti", votes: 200 },
  { candidates: "ppp", votes: 150 },
  { candidates: "aml", votes: 100 },
].map((item) => ({
  ...item,
  fill: chartConfig[item.candidates]?.color || "hsl(var(--chart-default))",
}));

export function PieChartDonutActive({ title, description }) {
  return (
    <div className="pieChartDonutActiveContainer">
      {" "}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="votes"
                nameKey="candidates"
                innerRadius={60}
                strokeWidth={5}
                activeIndex={0}
                activeShape={({ outerRadius = 0, ...props }) => (
                  <Sector {...props} outerRadius={outerRadius + 10} />
                )}
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
        {/* <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total votes for the last 6 months
          </div>
        </CardFooter> */}
      </Card>
    </div>
  );
}
