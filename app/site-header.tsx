"use client";

import Link from "next/link";
import { useState } from "react";

const nav = [
  ["Camp", "/camping"], ["Ride", "/ohv-riding"], ["Maps", "/trail-maps"],
  ["Conditions", "/current-conditions"], ["Plan", "/trip-planner"], ["More", "/faqs"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <Link className="brand" href="/">OD<span>FIELD GUIDE</span></Link>
    <nav aria-label="Main navigation">{nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
    <Link className="header-cta" href="/trip-planner">Plan a trip <span>↗</span></Link>
    <button className="menu-button" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
    {open && <div className="mobile-menu">{nav.map(([label, href]) => <Link onClick={() => setOpen(false)} key={href} href={href}>{label}<span>→</span></Link>)}</div>}
  </header>;
}
