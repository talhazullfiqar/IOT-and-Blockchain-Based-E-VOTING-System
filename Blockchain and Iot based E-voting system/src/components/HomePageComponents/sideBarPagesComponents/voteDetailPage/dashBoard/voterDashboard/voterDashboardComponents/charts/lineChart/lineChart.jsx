"use client";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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
import "./lineChart.css";

// Generate consistent color based on candidate name
function generateColor(label) {
  let hash = 0;
  for (let i = 0; i < label.length; i++) {
    hash = label.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 65%, 60%)`;
}

export function DashboardLineChart({ data, title }) {
  const candidates = [...new Set(data.map((d) => d.candidates))];

  // Use candidate names as keys and group their vote data
  const chartData = candidates.map((candidate) => {
    const entry = data.find((d) => d.candidates === candidate);
    return {
      name: candidate,
      [candidate]: entry.votes,
    };
  });

  // Build config with dynamic colors
  const chartConfig = {};
  candidates.forEach((c) => {
    chartConfig[c] = {
      label: c,
      color: generateColor(c),
    };
  });

  return (
    <div className="lineChartContainer">
      <Card className="w-[750px] h-[369px] overflow-hidden p-4">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Total Votes of Each Party</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer className="w-full h-[250px]" config={chartConfig}>
            <LineChart width={700} height={250} data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              {candidates.map((candidate) => (
                <Line
                  key={candidate}
                  dataKey={candidate}
                  type="monotone"
                  stroke={chartConfig[candidate].color}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
