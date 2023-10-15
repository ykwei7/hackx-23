"use client";

import React, { useEffect, useState } from "react";
import { MapPage } from "@/components/main/map-page";
import { BottomNavBar } from "@/components/bottom-nav";
import { BicyclesPage } from "@/components/main/bicycles-page";
import { HomePage } from "@/components/main/home-page";
import { ProfilePage } from "@/components/main/profile-page";
import { TopNavBar } from "@/components/top-nav";
import dynamic from "next/dynamic";
import NotificationDialog from "@/components/notification-dialog";
import { addOrUpdateSubscription } from "@/app/api/main/main";

const ReportPage = dynamic(
  () => import("@/components/main/report-page") as any
);

function registerServiceWorker() {
  if (navigator.serviceWorker.controller) {
    console.log("Service worker already registered.");
    return;
  }

  return navigator.serviceWorker
    .register("/service-worker.js")
    .then(function (registration) {
      console.log("Service worker successfully registered.");
      return registration;
    })
    .catch(function (err) {
      console.error("Unable to register service worker.", err);
    });
}

function subscribeUserToPush(user_id: string) {
  return navigator.serviceWorker
    .register("/service-worker.js")
    .then(function (registration) {
      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string
        ),
      };

      return registration.pushManager.subscribe(subscribeOptions);
    })
    .then(function (pushSubscription) {
      console.log(
        "Received PushSubscription: ",
        JSON.stringify(pushSubscription)
      );
      addOrUpdateSubscription(pushSubscription, user_id)
        .then((response) => {
          console.log("Subscription updated successfully: ", response);
        })
        .catch((error) => {
          console.error("Error updating subscription: ", error);
        });
    });
}

function urlBase64ToUint8Array(base64String: string) {
  var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  var base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function MainPage({ searchParams }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      registerServiceWorker();
    }
  }, []);

  const [openModal, setOpenModal] = useState(false);

  var defaultIsNotifEnabled = false;
  if (typeof window != "undefined" && "Notification" in window) {
    defaultIsNotifEnabled = Notification.permission === "granted";
  }
  const [notifEnabled, setNotifEnabled] = useState(defaultIsNotifEnabled);
  useEffect(() => {
    const notif_allowed = localStorage.getItem("notif_allowed") || "yes";
    if (
      typeof window != "undefined" &&
      "Notification" in window &&
      Notification.permission !== "granted" &&
      notif_allowed !== "no"
    ) {
      setOpenModal(true);
    }
  }, []);

  useEffect(() => {
    subscribeUserToPush(localStorage.getItem("user_id") as string);
  }, [notifEnabled]);

  const [currView, setView] = useState(searchParams.page || "home");
  const views = {
    map: "map",
    bicycles: "bicycles",
    home: "home",
    report: "report",
    profile: "profile",
  };
  const viewsMapping = {
    map: <MapPage />,
    bicycles: <BicyclesPage />,
    home: <HomePage setView={setView} views={views} />,
    report: <ReportPage />,
    profile: <ProfilePage />,
  };

  return (
    <div className="h-full">
      <TopNavBar />
      <div className="pt-20 pb-10">{viewsMapping[currView]}</div>
      <BottomNavBar views={views} setView={setView} />
      <NotificationDialog
        openModal={openModal}
        setOpenModal={setOpenModal}
        setNotifEnabled={setNotifEnabled}
      />
    </div>
  );
}
