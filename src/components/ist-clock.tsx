"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/**
 * The clock in the masthead. Rendered empty on the server and filled on mount,
 * because a server-rendered time would be stale, and mismatched, by the time it
 * paints.
 */
export function IstClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="meta tabular-nums" suppressHydrationWarning>
      {time ? `${time} IST` : "IST"}
    </span>
  );
}
