import { BarCharts } from "../../../voterDashboardComponents/charts/barChart/barChart";
import { PieChartLabel } from "../../../voterDashboardComponents/charts/pieChartLabel/pieChartLabel";

export default function NationalAssemblyResults() {
  return (
    <>
      <div style={{ marginLeft: "180px" }}>
        {" "}
        <BarCharts
          title="Party-Wise Candidate Distribution"
          description="Candidates by parties in Pakistan"
        />
      </div>
    </>
  );
}
