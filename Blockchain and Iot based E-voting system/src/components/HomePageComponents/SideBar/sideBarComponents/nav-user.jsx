"use client";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../../../contractABI/contractAddress";
import ContractAbi from "../../../contractABI/VotingSystem.json";
import { ChevronsUpDown, LogOut } from "lucide-react"; // Import ArrowUpCircle for the withdraw icon
import { PiHandWithdraw } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import images from "../../../../assets/images/avatar.jpg";
import { useEffect, useState } from "react";

export function NavUser({ user, userRole }) {
  const [isIndependentCandidate, setIsIndependentCandidate] = useState(false);
  useEffect(() => {
    getIndependentCandidateRegistered();
  }, []);

  const { isMobile } = useSidebar();

  const connectContract = async () => {
    console.log("connectcontract");
    if (!window.ethereum) throw new Error("MetaMask is not installed");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, ContractAbi.abi, signer);
  };

  const getIndependentCandidateRegistered = async () => {
    try {
      const contract = await connectContract();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const signerAddress = await signer.getAddress();
      const currentYear = await contract.getElectionYear();
      const i_Candidate = await contract.getIndependentCandidate(signerAddress);

      console.log("getIndependentCandidateRegistered");
      console.log(`Signer = ${signer}`);
      console.log(`Signer Address = ${signerAddress}`);
      console.log(`Current Year = ${currentYear}`);
      console.log(`Candidate = ${i_Candidate}`);

      console.log(`is registered? = ${i_Candidate.isRegistered}
                  candidate year = ${i_Candidate.electionYear}
        `);
      if (
        i_Candidate.isRegistered &&
        Number(i_Candidate.electionYear) === Number(currentYear)
      ) {
        setIsIndependentCandidate(true);
      } else {
        return;
      }
    } catch (error) {
      if (
        error?.reason === "Independent Candidate not found" ||
        error?.revert?.args?.[0] === "Independent Candidate not found" ||
        error?.message?.includes("Independent Candidate not found")
      ) {
        console.log("I_Candidate not registered. Exiting function.");
        // alert("Voter not registered Kindly Register Yourself");
        return;
      }
    }
  };

  const handleWithdrawCandidate = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ContractAbi.abi,
        signer
      );

      const tx = await contract.withdrawCandidateRegistration();
      console.log("Transaction sent:", tx.hash);

      await tx.wait();
      alert("Successfully withdrawn your candidacy.");

      // Optional: Reload or update state/UI
      window.location.reload();
    } catch (error) {
      console.error("Withdraw failed:", error);
      if (error.reason) alert(error.reason);
      else if (error.message) alert(error.message);
      else alert("Withdrawal failed.");
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <Image
                  src={images}
                  width={200}
                  height={200}
                  alt="user-avatar"
                />
                {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                {/* <AvatarFallback className="rounded-lg">CN</AvatarFallback> */}
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Conditionally render the "Withdraw" button if PageUser is partyCandidate */}
            {userRole === "partyCandidate" && (
              <>
                <DropdownMenuItem className="gap-2 cursor-pointer">
                  <button
                    onClick={handleWithdrawCandidate}
                    className="flex items-center gap-2 w-full text-left"
                  >
                    <PiHandWithdraw />
                    Withdraw
                  </button>
                </DropdownMenuItem>
              </>
            )}
            {userRole === "none" && isIndependentCandidate && (
              <>
                <DropdownMenuItem>
                  <PiHandWithdraw />
                  <Link href="/">Withdraws</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem>
              <LogOut />
              <Link href="/">Log out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
