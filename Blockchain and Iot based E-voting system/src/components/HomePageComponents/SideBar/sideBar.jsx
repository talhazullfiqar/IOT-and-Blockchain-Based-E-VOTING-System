"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../../contractABI/contractAddress";
import ContractAbi from "../../contractABI/VotingSystem.json";

import { LayoutDashboard } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../SideBar/ui/sidebar";
import candidate from "../SideBar/iconSvgs/candidate";
import voting from "./iconSvgs/voting";
import Link from "next/link";
import { NavUser } from "./sideBarComponents/nav-user";

const items = [
  {
    title: "Admin Dashboard",
    url: "/home/adminDashboard",
    icon: candidate,
  },
  {
    title: "Sub Admin Dashboard",
    url: "/home/subAdminDashboard",
    icon: candidate,
  },
  {
    title: "Vote Details",
    url: "/home/votingDashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Vote Registration",
    url: "/home/voterRegistration",
    icon: voting,
  },
  {
    title: "Candidate Registration",
    url: "/home/candidateRegistration",
    icon: candidate,
  },
  {
    title: "Party Registration",
    url: "/home/partyRegistration",
    icon: candidate,
  },
  {
    title: "Party Candidate Registration",
    url: "/home/partyCandidateRegistration",
    icon: candidate,
  },
];

const data = {
  user: {
    name: "E-Voting",
    email: "evoting@blockchain.com",
  },
};

export function AppSidebar() {
  const PageUser = "party"; // Change this to "party", "partyCandidate", "voter","subadmin" or "admin" to test
  const [activeItem, setActiveItem] = useState(null);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    getUserRole();
  }, []);

  const connectContract = async () => {
    if (!window.ethereum) throw new Error("MetaMask is not installed");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, ContractAbi.abi, signer);
  };

  const getUserRole = async () => {
    try {
      const contract = await connectContract();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      console.log(address);
      const roleId = await contract.getRole(address);
      console.log(roleId);
      const role = Number(roleId);
      console.log(role);
      const userRole = getRoleName(role);
      setUserRole(userRole);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch user role.");
    }
  };

  const getRoleName = (id) => {
    console.log(`ID: ${id}`);
    switch (id) {
      case 0:
        return "none";
      case 1:
        return "admin";
      case 2:
        return "party";
      case 3:
        return "partyCandidate";
      default:
        return "";
    }
  };

  const handleSetActive = (title) => {
    setActiveItem(title);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard Pages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userRole === "admin"
                ? items
                    .filter(
                      (item) =>
                        item.title === "Admin Dashboard" ||
                        item.title === "Party Registration"
                    )
                    .map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={activeItem === item.title}
                          onClick={() => handleSetActive(item.title)}
                        >
                          <Link href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                : userRole === "party"
                ? items
                    .filter(
                      (item) =>
                        item.title === "Vote Details" ||
                        item.title === "Vote Registration" ||
                        item.title === "Party Candidate Registration"
                    )
                    .map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={activeItem === item.title}
                          onClick={() => handleSetActive(item.title)}
                        >
                          <Link href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                : userRole === "partyCandidate"
                ? items
                    .filter(
                      (item) =>
                        item.title === "Vote Details" ||
                        item.title === "Vote Registration"
                    )
                    .map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={activeItem === item.title}
                          onClick={() => handleSetActive(item.title)}
                        >
                          <Link href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                : userRole === "none"
                ? items
                    .filter(
                      (item) =>
                        item.title === "Vote Details" ||
                        item.title === "Vote Registration" ||
                        item.title === "Candidate Registration"
                    )
                    .map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={activeItem === item.title}
                          onClick={() => handleSetActive(item.title)}
                        >
                          <Link href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                : userRole === "subadmin"
                ? items
                    .filter((item) => item.title === "Sub Admin Dashboard")
                    .map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={activeItem === item.title}
                          onClick={() => handleSetActive(item.title)}
                        >
                          <Link href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                : null}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} userRole={userRole} />
      </SidebarFooter>
    </Sidebar>
  );
}
