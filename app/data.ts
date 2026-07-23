export const pages: Record<string, { eyebrow: string; title: string; intro: string; sections: { title: string; text: string; items?: string[] }[] }> = {
  camping: { eyebrow: "CAMPING GUIDE", title: "Sleep close to the wild.", intro: "From developed campgrounds to quieter forest sites, choose a base that fits your pace—and reserve early for summer weekends.", sections: [
    { title: "Choose your home base", text: "Florence works well for lakes and the north dunes. Winchester Bay puts riders near tall open sand. Coos Bay offers forested camps and access to the southern riding areas.", items: ["Developed sites: tables, fire rings, and nearby facilities", "OHV-oriented camps: direct or nearby riding access", "Quiet stays: look beyond peak weekends and major staging areas"] },
    { title: "Reservation rhythm", text: "Popular summer sites can fill months ahead. Build a shortlist, check official reservation windows, and keep one flexible backup outside the recreation area." },
    { title: "Camp kindly", text: "Store food securely, use established sites, follow fire restrictions, quiet generators on schedule, and leave sand and vegetation exactly as you found them." },
  ]},
  "ohv-riding": { eyebrow: "OHV RIDING", title: "Find your line. Know your zone.", intro: "Open sand, steep bowls, tree islands, and designated trails make every riding area distinct. Start conservative and learn the terrain.", sections: [
    { title: "Three riding personalities", text: "Florence mixes open dunes with narrow access routes. Winchester Bay is known for dramatic dune faces. The Coos Bay area combines sand with forested trail systems.", items: ["Use designated staging areas", "Confirm the zone is open to your vehicle class", "Never ride across signed habitat closures"] },
    { title: "Vehicle essentials", text: "Carry the required Oregon ATV permit, a compliant flag, approved spark arrestor, and protective equipment. Youth operators and nonresident riders may have additional requirements." },
    { title: "Ride with margin", text: "Approach crests at an angle, watch for drop-offs on the lee side, keep group spacing, and agree on a regroup point before leaving the staging area." },
  ]},
  "trail-maps": { eyebrow: "TRAIL MAPS", title: "Get oriented before the sand.", intro: "Cell service can fade and dunes change with the wind. Download official maps, carry an offline copy, and use signed routes in the field.", sections: [
    { title: "North: Florence", text: "Use this zone for lake-adjacent camping, mixed-use access points, and a broad introduction to the recreation area." },
    { title: "Central: Winchester Bay", text: "A concentrated riding destination with tall dunes and easy connections between staging areas and campgrounds." },
    { title: "South: Coos Bay", text: "A varied landscape of open sand, forest edges, and established riding networks. Study closure boundaries closely." },
  ]},
  "current-conditions": { eyebrow: "CURRENT CONDITIONS", title: "Check twice. Go ready.", intro: "This independent guide does not publish live closure data. Use the official sources below on the day you travel.", sections: [
    { title: "Morning-of checklist", text: "Review weather, wind, fire restrictions, road access, campground notices, and seasonal habitat closures before departure.", items: ["U.S. Forest Service alerts and notices", "National Weather Service coastal forecast", "Oregon road conditions and incident maps"] },
    { title: "Coastal weather", text: "Expect cooler temperatures, stronger afternoon wind, fog, and rapid shifts between exposed dunes and sheltered forest. Pack layers even on a sunny forecast." },
    { title: "When plans change", text: "Keep a lower-exposure walk, lake stop, or town visit in reserve. Turning back early is a sound decision, not a missed adventure." },
  ]},
  permits: { eyebrow: "PERMITS & REGULATIONS", title: "The rules protect the ride.", intro: "Requirements vary by activity, vehicle, age, and site. Treat this as a planning overview and verify current rules with the relevant agency.", sections: [
    { title: "For OHV visitors", text: "Oregon generally requires an ATV operating permit for vehicles used on public lands. Nonresident permits and safety education rules may apply.", items: ["Display the permit as directed", "Carry proof of required training", "Meet sound, lighting, flag, and spark-arrestor rules"] },
    { title: "For campers", text: "Campground fees, reservation policies, stay limits, fire rules, and pet requirements differ by location and season." },
    { title: "Protected places", text: "Seasonal and permanent closures protect snowy plover habitat, wetlands, vegetation, and restoration work. Signed boundaries are non-negotiable." },
  ]},
  safety: { eyebrow: "SAFETY TIPS", title: "Confidence starts before the engine.", intro: "Dunes reward preparation. Make the plan, carry more than you expect to need, and communicate clearly with your group.", sections: [
    { title: "Personal gear", text: "Wear a properly fitted helmet and eye protection when riding. Add layers, gloves, sturdy footwear, sun protection, water, and a compact first-aid kit." },
    { title: "Dune awareness", text: "Wind reshapes slopes and hides sharp drop-offs. Slow before crests, scan for other users, and avoid stopping in blind zones." },
    { title: "Group plan", text: "Share your route and return time, pair new riders with experienced ones, carry navigation and recovery tools, and know who will call for help." },
  ]},
  "local-business": { eyebrow: "LOCAL FEATURE", title: "South Coast Outfitters.", intro: "A fictional editorial spotlight celebrating the independent shops that help coastal trips go smoothly.", sections: [
    { title: "Built on local knowledge", text: "The imagined Florence shop began as a repair bench and map wall. Today its specialty is simple: matching people with reliable gear and realistic routes." },
    { title: "What we’d ask", text: "Where has wind changed the riding most? Which trail fits a first-time group? What small repair item gets forgotten? Local questions make better weekends." },
    { title: "Support the coast", text: "Fuel locally, eat locally, book guides when you need them, and treat staff recommendations as a starting point for checking official conditions." },
  ]},
  "trip-planner": { eyebrow: "TRIP PLANNER", title: "Build a weekend with breathing room.", intro: "Choose one base, one headline adventure, and one flexible backup. The coast rarely rewards an overpacked schedule.", sections: [
    { title: "Day one: arrive softly", text: "Set camp before dark, walk a short viewpoint trail, and use the evening to check weather, closures, and equipment." },
    { title: "Day two: the big day", text: "Start early for calmer conditions. Ride or hike your primary route, break for a sheltered lunch, and return with daylight to spare." },
    { title: "Day three: leave light", text: "Take a lakeside walk or local breakfast, clean equipment before travel, pack out every item, and leave time for coastal traffic." },
  ]},
  news: { eyebrow: "FIELD NOTES", title: "Stories from the shifting edge.", intro: "Evergreen trip ideas and stewardship notes for travelers drawn to Oregon’s coast.", sections: [
    { title: "Why dunes move", text: "Coastal wind sorts and carries sand, constantly redrawing small ridges and hollows. Yesterday’s tracks are not tomorrow’s map." },
    { title: "A quieter shoulder season", text: "Spring and fall bring softer light and fewer crowds, along with wetter weather and a greater need for flexible plans." },
    { title: "The value of staying local", text: "A meal, repair, guide, or overnight stay helps sustain the coastal towns that welcome recreation-area visitors." },
  ]},
  gallery: { eyebrow: "PHOTO GALLERY", title: "Light, wind, texture.", intro: "A visual field note from the meeting place of forest, water, and sand.", sections: [
    { title: "Morning", text: "Fog slips between shore pines while low light reveals every ripple in the sand." },
    { title: "Midday", text: "Open dunes turn graphic and bright; sheltered lakes remain dark, still, and close." },
    { title: "Evening", text: "Long shadows stretch from grass and driftwood as the Pacific cools the edge of the day." },
  ]},
  faqs: { eyebrow: "FREQUENTLY ASKED", title: "A few good answers.", intro: "Quick orientation for first-time visitors. Verify time-sensitive details with official agencies.", sections: [
    { title: "Do I need an OHV to enjoy the dunes?", text: "Not at all. Hiking, paddling, wildlife viewing, camping, and beach access offer quieter ways to explore." },
    { title: "When should I visit?", text: "Summer is popular and generally drier. Shoulder seasons can be peaceful, with more variable weather. Weekdays are calmer year-round." },
    { title: "Can I drive anywhere on the sand?", text: "No. Vehicle access is limited to designated areas and routes. Observe all signs, maps, and seasonal closures." },
  ]},
  contact: { eyebrow: "CONTACT", title: "Send a field note.", intro: "Questions about this independent guide, a correction, or a local story we should know about? We’d be glad to hear it.", sections: [
    { title: "General notes", text: "hello@oregondunesfieldguide.example" },
    { title: "Important", text: "For emergencies, permits, enforcement, campground reservations, or official closure information, contact the appropriate public agency directly." },
    { title: "Response time", text: "This is a demonstration site; the sample address does not receive messages." },
  ]},
};
