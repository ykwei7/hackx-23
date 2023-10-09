"use client";

import React, { useEffect, useState } from "react";
import { MapPage } from "@/components/main/map-page";
import { BottomNavBar } from "@/components/bottom-nav";
import { BicylesPage } from "@/components/main/bicycles-page";
import { HomePage } from "@/components/main/home-page";
import { ReportPage } from "@/components/main/report-page";
import { ProfilePage } from "@/components/main/profile-page";
import { TopNavBar } from "@/components/top-nav";

export default function MainPage() {
  const [currView, setView] = useState("home");
  const views = {
    map: "map",
    bicycles: "bicycles",
    home: "home",
    report: "report",
    profile: "profile",
  };
  const viewsMapping = {
    map: <MapPage />,
    bicycles: <BicylesPage />,
    home: <HomePage />,
    report: <ReportPage />,
    profile: <ProfilePage />,
  };
  return (
    <div className="h-full">
      <TopNavBar />
      <div className="pt-20 pb-10">{viewsMapping[currView]}</div>
      <BottomNavBar views={views} setView={setView} />
    </div>
  );
}
