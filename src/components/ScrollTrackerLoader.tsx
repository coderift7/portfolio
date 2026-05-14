"use client";

import dynamic from "next/dynamic";

const ScrollTracker = dynamic(() => import("@/components/ScrollTracker"), {
  ssr: false,
});

export default function ScrollTrackerLoader() {
  return <ScrollTracker />;
}
