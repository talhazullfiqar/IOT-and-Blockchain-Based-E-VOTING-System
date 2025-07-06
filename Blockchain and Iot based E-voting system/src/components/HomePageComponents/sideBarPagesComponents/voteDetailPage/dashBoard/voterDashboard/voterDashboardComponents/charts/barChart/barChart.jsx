// "use client";

// import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
// import "./barChart.css";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../../../../../../../SideBar/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "../../../../../../../SideBar/ui/chart";

// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//   },
//   pmln: {
//     label: "PMLN",
//     color: "hsl(var(--chart-1))",
//   },
//   pti: {
//     label: "PTI",
//     color: "hsl(var(--chart-2))",
//   },
//   ppp: {
//     label: "PPP",
//     color: "hsl(var(--chart-3))",
//   },
//   other: {
//     label: "OTHER",
//     color: "hsl(var(--chart-4))",
//   },
// };

// const chartData = [
//   { candidates: "pmln", votes: 175 },
//   { candidates: "pti", votes: 200 },
//   { candidates: "ppp", votes: 275 },
//   { candidates: "other", votes: 100 },
// ].map((item) => ({
//   ...item,
//   fill: chartConfig[item.candidates]?.color || "hsl(var(--chart-default))",
// }));

// export function BarCharts({ title, description }) {
//   return (
//     <div className="barChartContainer">
//       <Card>
//         <CardHeader>
//           <CardTitle>{title}</CardTitle>
//           <CardDescription>{description}</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <ChartContainer config={chartConfig}>
//             <BarChart accessibilityLayer data={chartData}>
//               <CartesianGrid vertical={false} />
//               <XAxis
//                 dataKey="candidates"
//                 tickLine={false}
//                 tickMargin={10}
//                 axisLine={false}
//                 tickFormatter={(value) => chartConfig[value]?.label}
//               />
//               <ChartTooltip
//                 cursor={false}
//                 content={<ChartTooltipContent hideLabel />}
//               />
//               <Bar
//                 dataKey="votes"
//                 strokeWidth={2}
//                 radius={8}
//                 activeIndex={2}
//                 activeBar={({ ...props }) => {
//                   return (
//                     <Rectangle
//                       {...props}
//                       fillOpacity={0.8}
//                       stroke={props.payload.fill}
//                       strokeDasharray={4}
//                       strokeDashoffset={4}
//                     />
//                   );
//                 }}
//               />
//             </BarChart>
//           </ChartContainer>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
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
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../../../../../../../../contractABI/contractAddress";
import ContractAbi from "../../../../../../../../contractABI/VotingSystem.json";
import "./barChart.css";

// Helper to generate consistent colors per party
function generateColor(label) {
  let hash = 0;
  for (let i = 0; i < label.length; i++) {
    hash = label.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 65%, 60%)`;
  return color;
}

export function BarCharts({ title, description }) {
  const [chartData, setChartData] = useState([]);
  const [chartConfig, setChartConfig] = useState({});

  useEffect(() => {
    const fetchCandidateData = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          ContractAbi.abi,
          signer
        );

        const candidateAddresses = await contract.getAllCandidates();
        const partyCounts = {};

        for (const addr of candidateAddresses) {
          const candidate = await contract.getCandidate(addr);
          const party = candidate.partyName || "Independent";

          partyCounts[party] = (partyCounts[party] || 0) + 1;
        }

        const data = Object.entries(partyCounts).map(([party, count]) => {
          const color = generateColor(party);
          return {
            candidates: party,
            candidate: count,
            fill: color,
          };
        });

        const config = data.reduce((acc, item) => {
          acc[item.candidates] = {
            label: item.candidates,
            color: item.fill,
          };
          return acc;
        }, {});

        setChartData(data);
        setChartConfig(config);
      } catch (error) {
        console.error("Error loading party-wise candidate data:", error);
      }
    };

    fetchCandidateData();
  }, []);

  return (
    <div className="barChartContainer">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart data={chartData} width={500} height={300}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="candidates"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => chartConfig[value]?.label}
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Bar
                dataKey="candidate"
                strokeWidth={2}
                radius={8}
                activeIndex={2}
                activeBar={({ ...props }) => (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                )}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
