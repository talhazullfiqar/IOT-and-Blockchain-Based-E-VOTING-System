"use client";
import React, { useState } from "react";
import { CascadeSelect } from "primereact/cascadeselect";

export default function AddressComponent({ selections, setConstituency }) {
  const [selectedArea, setSelectedArea] = useState(null);
  const constituencies = [
    {
      name: "NA-51 Rawalpindi-cum-Murree",
      areas: [
        { name: "Murree District" },
        { name: "Kahuta Tehsil" },
        { name: "Kallar Syedan Tehsil" },
      ],
    },
    {
      name: "NA-52 Rawalpindi-I",
      areas: [{ name: "Gujar Khan Tehsil" }, { name: "Sagri Qanungo Halqa" }],
    },
    {
      name: "NA-53 Rawalpindi-II",
      areas: [
        { name: "Adhwal (including Chak Beli Khan)" },
        { name: "Banda" },
        { name: "Bassali (including Chaklala)" },
        { name: "Gorakh Pur" },
        { name: "Sehal" },
        { name: "Chakri" },
        {
          name: "Rawalpindi Metropolitan Corporation",
          charges: [
            { name: "Charge No.29" },
            { name: "Charge No.30" },
            { name: "Charge No.31" },
            { name: "Charge No.32" },
            { name: "Charge No.33" },
            { name: "Charge No.34" },
          ],
        },
      ],
    },
    {
      name: "NA-54 Rawalpindi-III",
      areas: [
        { name: "Taxila Tehsil" },
        { name: "Adyala Qanungo Halqa" },
        {
          name: "Rawalpindi Metropolitan Corporation",
          charges: [{ name: "Charge No.04" }, { name: "Charge No.05" }],
        },
      ],
    },
    {
      name: "NA-55 Rawalpindi-IV",
      areas: [
        { name: "Rawalpindi Cantonment" },
        {
          name: "Chaklala Cantonment",
          charges: [{ name: "Charge No.05" }, { name: "Charge No.06" }],
        },
      ],
    },
    {
      name: "NA-56 Rawalpindi-V",
      areas: [
        {
          name: "Rawalpindi Metropolitan Corporation",
          charges: [
            { name: "Charge No.11" },
            { name: "Charge No.12" },
            { name: "Charge No.13" },
            { name: "Charge No.14" },
            { name: "Charge No.15" },
            { name: "Charge No.16" },
          ],
        },
      ],
    },
    {
      name: "NA-57 Rawalpindi-VI",
      areas: [
        {
          name: "Rawalpindi Metropolitan Corporation",
          charges: [
            { name: "Charge No.20" },
            { name: "Charge No.21" },
            { name: "Charge No.25" },
          ],
        },
        { name: "Chaklala Cantonment excluding Charges 05 & 06" },
      ],
    },
  ];

  const handleSelectionChange = (e) => {
    const selectedValue = e.value;
    setSelectedArea(selectedValue);

    // Log the selected value
    console.log("Selected Value:", selectedValue);

    // Find the constituency based on the selected value
    const findConstituency = (value) => {
      for (const constituency of constituencies) {
        // Check if the selected value is an area
        if (constituency.areas.some((area) => area.name === value?.name)) {
          return constituency.name;
        }
        // Check if the selected value is a charge within an area
        for (const area of constituency.areas) {
          if (
            area.charges &&
            area.charges.some((charge) => charge.name === value?.name)
          ) {
            return constituency.name;
          }
        }
      }
      return null;
    };

    const data = findConstituency(selectedValue);
    // Log the constituency name
    const constituencyName = data.split(" ")[0].replace("-", "");
    console.log("Constituency Name:", constituencyName);

    if (constituencyName) {
      setConstituency(constituencyName);
    }
  };

  return (
    <div
      className="flex justify-content-center"
      style={{ paddingTop: "15px", paddingLeft: "10px" }}
    >
      <CascadeSelect
        value={selectedArea}
        onChange={handleSelectionChange}
        options={constituencies}
        optionLabel="name"
        optionGroupLabel="name"
        optionGroupChildren={["areas", "charges"]}
        className="w-full md:w-14rem"
        breakpoint="767px"
        placeholder={`Select your ${selections}`}
        style={{ maxWidth: "17rem", maxHeight: "400px", overflowY: "auto" }}
      />
    </div>
  );
}
