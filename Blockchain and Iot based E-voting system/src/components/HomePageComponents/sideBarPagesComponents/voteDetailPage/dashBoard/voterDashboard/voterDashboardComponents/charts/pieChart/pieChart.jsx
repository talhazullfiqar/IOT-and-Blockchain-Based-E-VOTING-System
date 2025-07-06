"use client";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
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
  ChartLegend,
  ChartLegendContent,
} from "../../../../../../../SideBar/ui/chart";
import "./pieChart.css";

// Helper to generate consistent random colors per label
function generateColor(label) {
  let hash = 0;
  for (let i = 0; i < label.length; i++) {
    hash = label.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 65%, 60%)`;
  return color;
}

export function DashboardPieChart({ cardTtile, data }) {
  const pieData = data.map((item) => ({
    ...item,
    fill: item.fill || generateColor(item.candidates),
  }));

  const totalVotes = React.useMemo(() => {
    return pieData.reduce((acc, curr) => acc + Number(curr.votes), 0);
  }, [pieData]);

  // Build config object
  const chartConfig = pieData.reduce((acc, curr) => {
    acc[curr.candidates] = {
      label: curr.candidates,
      color: curr.fill,
    };
    return acc;
  }, {});

  return (
    <div className="pieChartContainer">
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>{cardTtile} Votes Count</CardTitle>
          <CardDescription>Total Votes by Party</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[350px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={pieData}
                dataKey="votes"
                nameKey="candidates"
                innerRadius={65}
                outerRadius={100}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox?.cx && viewBox?.cy) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan className="fill-foreground text-xl font-bold">
                            {totalVotes.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Votes
                          </tspan>
                        </text>
                      );
                    }
                    return null;
                  }}
                />
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="candidates" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
