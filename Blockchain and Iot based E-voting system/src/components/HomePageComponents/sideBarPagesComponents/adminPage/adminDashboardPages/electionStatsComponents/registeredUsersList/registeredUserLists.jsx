"use client";
import React, { useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { ChevronUpIcon, ChevronDownIcon } from "lucide-react";
import "./registeredUsersLists.css";
import { MdLocalPrintshop } from "react-icons/md";

export default function RegisteredUsersLists() {
  const initialUsers = [
    {
      walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      gender: "Male",
      constituency: "NA40",
    },
    {
      walletAddress: "0x123f681646d4a755815f9cb19e1acc8565a0c2ac",
      gender: "Female",
      constituency: "NA30",
    },
    {
      walletAddress: "0x942d35Cc6634C0532925a3b844Bc454e4438f44e",
      gender: "Male",
      constituency: "NA20",
    },
    {
      walletAddress: "0x542d35Cc6634C0532925a3b844Bc454e4438f44e",
      gender: "Female",
      constituency: "NA10",
    },
    {
      walletAddress: "0x342d35Cc6634C0532925a3b844Bc454e4438f44e",
      gender: "Other",
      constituency: "NA10",
    },
    {
      walletAddress: "0xA12d35Cc6634C0532925a3b844Bc454e4438f44e",
      gender: "Male",
      constituency: "NA40",
    },
    {
      walletAddress: "0xB34f681646d4a755815f9cb19e1acc8565a0c2ac",
      gender: "Female",
      constituency: "NA30",
    },
    {
      walletAddress: "0xC56d35Cc6634C0532925a3b844Bc454e4438f44e",
      gender: "Other",
      constituency: "NA20",
    },
    {
      walletAddress: "0xD78f681646d4a755815f9cb19e1acc8565a0c2ac",
      gender: "Male",
      constituency: "NA10",
    },
    {
      walletAddress: "0xE90d35Cc6634C0532925a3b844Bc454e4438f44e",
      gender: "Female",
      constituency: "NA40",
    },
    {
      walletAddress: "0xF12f681646d4a755815f9cb19e1acc8565a0c2ac",
      gender: "Other",
      constituency: "NA30",
    },
    {
      walletAddress: "0x112d35Cc6634C0532925a3b844Bc454e4438f44e",
      gender: "Male",
      constituency: "NA20",
    },
    {
      walletAddress: "0x223f681646d4a755815f9cb19e1acc8565a0c2ac",
      gender: "Female",
      constituency: "NA10",
    },
    {
      walletAddress: "0x334d35Cc6634C0532925a3b844Bc454e4438f44e",
      gender: "Other",
      constituency: "NA40",
    },
    {
      walletAddress: "0x445f681646d4a755815f9cb19e1acc8565a0c2ac",
      gender: "Male",
      constituency: "NA30",
    },
    {
      walletAddress: "0x556d35Cc6634C0532925a3b844Bc454e4438f44e",
      gender: "Female",
      constituency: "NA20",
    },
    {
      walletAddress: "0x667f681646d4a755815f9cb19e1acc8565a0c2ac",
      gender: "Other",
      constituency: "NA10",
    },
    {
      walletAddress: "0x778d35Cc6634C0532925a3b844Bc454e4438f44e",
      gender: "Male",
      constituency: "NA40",
    },
    {
      walletAddress: "0x889f681646d4a755815f9cb19e1acc8565a0c2ac",
      gender: "Female",
      constituency: "NA30",
    },
    {
      walletAddress: "0x990d35Cc6634C0532925a3b844Bc454e4438f44e",
      gender: "Other",
      constituency: "NA20",
    },
    {
      walletAddress: "0xAA1f681646d4a755815f9cb19e1acc8565a0c2ac",
      gender: "Male",
      constituency: "NA10",
    },
    {
      walletAddress: "0xBB2d35Cc6634C0532925a3b844Bc454e4438f44e",
      gender: "Female",
      constituency: "NA40",
    },
    {
      walletAddress: "0xCC3f681646d4a755815f9cb19e1acc8565a0c2ac",
      gender: "Other",
      constituency: "NA30",
    },
    {
      walletAddress: "0xDD4d35Cc6634C0532925a3b844Bc454e4438f44e",
      gender: "Male",
      constituency: "NA20",
    },
    {
      walletAddress: "0xEE5f681646d4a755815f9cb19e1acc8565a0c2ac",
      gender: "Female",
      constituency: "NA10",
    },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [selectedConstituency, setSelectedConstituency] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const constituencies = ["NA10", "NA20", "NA30", "NA40"];
  const genders = ["all", "Male", "Female", "Other"];

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedUsers = [...users].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });

    setUsers(sortedUsers);
    setSortConfig({ key, direction });
  };

  const handleConstituencyChange = (event) => {
    const value = event.target.value;
    setSelectedConstituency(value);
    filterUsers(value, selectedGender);
  };

  const handleGenderChange = (event) => {
    const value = event.target.value;
    setSelectedGender(value);
    filterUsers(selectedConstituency, value);
  };

  const filterUsers = (constituency, gender) => {
    let filteredUsers = initialUsers;

    if (constituency !== "all") {
      filteredUsers = filteredUsers.filter(
        (user) => user.constituency === constituency
      );
    }

    if (gender !== "all") {
      filteredUsers = filteredUsers.filter((user) => user.gender === gender);
    }

    setUsers(filteredUsers);
  };

  const getSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) {
      return <ChevronUpIcon className="icon-inactive" />;
    }
    return sortConfig.direction === "ascending" ? (
      <ChevronUpIcon className="icon-active" />
    ) : (
      <ChevronDownIcon className="icon-active" />
    );
  };

  const handlePrint = () => {
    const printContent = document.getElementById("voterList");
    const newWindow = window.open();
    newWindow.document.write(printContent.innerHTML);
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              marginLeft: "10px",
            }}
          >
            Voting List
          </h1>
          <select
            className="dropdown"
            onChange={handleConstituencyChange}
            value={selectedConstituency}
          >
            <option value="all">All Constituencies</option>
            {constituencies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            className="dropdown"
            onChange={handleGenderChange}
            value={selectedGender}
          >
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
          <button onClick={handlePrint} className="print-btn">
            <MdLocalPrintshop style={{ fontSize: "2rem" }} />
          </button>
        </div>
        <div className="table-wrapper" id="voterList">
          <table className="table">
            <thead>
              <tr>
                <th>Wallet Address</th>
                <th onClick={() => handleSort("gender")} className="sortable">
                  <span> Gender {getSortIcon("gender")}</span>
                </th>
                <th
                  onClick={() => handleSort("constituency")}
                  className="sortable"
                >
                  <span> Constituency {getSortIcon("constituency")}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="row">
                  <td className="mono">{user.walletAddress}</td>
                  <td>{user.gender}</td>
                  <td>{user.constituency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="footerContainer">
          <div className="footer">
            <FaEthereum
              style={{
                marginTop: "4px",
                marginRight: "2px",
                fontSize: "1rem",
              }}
            />
            <p style={{ fontStyle: "italic", fontSize: "0.9rem" }}>
              This is Block-chain Generated report that doesn't require
              signatures
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
