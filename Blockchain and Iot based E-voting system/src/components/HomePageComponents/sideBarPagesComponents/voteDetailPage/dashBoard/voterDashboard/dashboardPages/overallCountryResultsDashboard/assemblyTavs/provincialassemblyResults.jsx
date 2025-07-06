import { PieChartDonutActive } from "../../../voterDashboardComponents/charts/pieChartDonutActive/pieChartDonutActive";

export default function ProvincialAssemblyResults() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ marginLeft: "-70px", marginRight: "100px" }}>
          {" "}
          <PieChartDonutActive
            title="Punjab Assembly"
            description="Assembly Seats win by parties in Punjab Province"
          />
          <PieChartDonutActive
            title="Sindh Assembly"
            description="Assembly Seats win by parties in Sindh Province"
          />{" "}
        </div>
        <div>
          {" "}
          <PieChartDonutActive
            title="Balochistan Assembly"
            description="Assembly Seats win by parties in Balochistan Province"
          />
          <PieChartDonutActive
            title="KPK Assembly"
            description="Assembly Seats win by parties in KPK Province"
          />
        </div>
      </div>
    </>
  );
}
