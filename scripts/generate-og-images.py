"""Generate branded 1200x630 social share cards from the site's hero photography."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
IMAGES = PUBLIC / "images"
OUTPUT = PUBLIC / "og"
OUTPUT.mkdir(parents=True, exist_ok=True)

PAGES = {
    "home": ("EXPLORE THE OREGON COAST", "Oregon Dunes Guide", "Maps, camping, OHV riding, weather, tides, safety, and trip planning.", PUBLIC / "dunes-hero.jpg"),
    "camping": ("CAMPING GUIDE", "Camp close to the dunes.", "Compare camp styles, coastal regions, reservations, RV fit, and ride-from-camp access.", IMAGES / "hero-guide-camping.webp"),
    "ohv-riding": ("OHV RIDING GUIDE", "Choose the right riding zone.", "Florence, Winchester Bay, and Coos Bay riding areas, staging points, maps, and group safety.", IMAGES / "hero-guide-riding.webp"),
    "maps": ("INTERACTIVE COAST OVERVIEW", "Map the Oregon Dunes.", "Explore riding zones, staging areas, campgrounds, towns, parts stores, and GPS directions.", IMAGES / "hero-maps.webp"),
    "weather": ("CURRENT CONDITIONS", "Read the coast before you go.", "Live weather, wind, rain, fog, and seven-day forecasts for all three dune regions.", IMAGES / "hero-weather.webp"),
    "tides": ("BEACH ACCESS & SAFETY", "Time the tide. Read the beach.", "NOAA tide predictions and practical beach-riding guidance for the Oregon Dunes.", IMAGES / "hero-tides.webp"),
    "day-use": ("DAY-USE GUIDE", "Build a better dunes day.", "OHV staging, quiet walks, lake access, passes, facilities, and coastal safety.", IMAGES / "hero-day-use.webp"),
    "gas-prices": ("FUEL PLANNER", "Find fuel near the dunes.", "Gas-price resources and trip fuel planning for Florence, Reedsport, and Coos Bay.", IMAGES / "hero-gas.webp"),
    "history": ("HISTORY OF THE DUNES", "A coast always in motion.", "Indigenous homelands, dune formation, settlement, recreation, and conservation.", IMAGES / "hero-history.webp"),
    "rules": ("RULES & REGULATIONS", "Know the rules before you ride.", "Oregon ATV permits, safety cards, flags, helmets, equipment, youth rules, and closures.", IMAGES / "hero-rules-v2.webp"),
    "safety": ("SAFETY FIELDBOOK", "Confidence starts before the engine.", "Dune reading, recovery, group protocol, youth riders, and field-ready preparation.", IMAGES / "hero-safety-v2.webp"),
    "nearby-towns": ("GATEWAY TOWNS", "Three towns. Three rhythms.", "Plan around Florence, Winchester Bay, Reedsport, Coos Bay, North Bend, and Lakeside.", IMAGES / "hero-guide-towns.webp"),
    "wildlife": ("WILDLIFE & HABITAT", "Notice more. Disturb less.", "Explore shorebird habitat, wetlands, freshwater lakes, forest edges, and estuaries.", IMAGES / "hero-day-use.webp"),
    "permits": ("PERMITS & REGULATIONS", "Prepare every rider and machine.", "A practical starting point for Oregon ATV permits, safety cards, and riding requirements.", IMAGES / "hero-rules-v2.webp"),
    "current-conditions": ("BEFORE YOU GO", "Check twice. Go ready.", "Weather, closures, fire restrictions, campground status, beach access, and habitat alerts.", IMAGES / "hero-weather.webp"),
    "trip-planner": ("OREGON DUNES TRIP PLANNER", "Plan it your way.", "Build a personalized stay, itinerary, group plan, checklist, printout, and shareable summary.", IMAGES / "hero-planner.webp"),
    "riding-florence": ("FLORENCE RIDING MAP", "South Jetty to Siltcoos.", "Staging areas, trail starting points, campgrounds, local services, and GPS directions.", IMAGES / "riding-01-florence.webp"),
    "riding-winchester-bay": ("WINCHESTER BAY RIDING MAP", "Explore the Umpqua Dunes.", "Large open sand, staging areas, sand camps, harbor services, and GPS directions.", IMAGES / "riding-02-winchester.webp"),
    "riding-coos-bay": ("COOS BAY RIDING MAP", "Spinreel to Horsfall.", "Southern riding zones, staging areas, camping, local services, and GPS directions.", IMAGES / "riding-03-coos-bay.webp"),
}

FONT_DISPLAY = Path(r"C:\Windows\Fonts\georgiab.ttf")
FONT_SANS = Path(r"C:\Windows\Fonts\segoeui.ttf")
FONT_SANS_BOLD = Path(r"C:\Windows\Fonts\segoeuib.ttf")
LOGO = IMAGES / "oregon-dunes-guide-logo-transparent.png"


def cover(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    ratio = max(size[0] / image.width, size[1] / image.height)
    resized = image.resize((round(image.width * ratio), round(image.height * ratio)), Image.Resampling.LANCZOS)
    left = max(0, (resized.width - size[0]) // 2)
    top = max(0, (resized.height - size[1]) // 2)
    return resized.crop((left, top, left + size[0], top + size[1]))


def wrapped_lines(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        trial = f"{current} {word}".strip()
        if draw.textlength(trial, font=font) <= max_width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_tracking(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, font: ImageFont.FreeTypeFont, fill: str, spacing: int) -> None:
    x, y = xy
    for char in text:
        draw.text((x, y), char, font=font, fill=fill)
        x += round(draw.textlength(char, font=font)) + spacing


def generate(slug: str, kicker: str, title: str, description: str, hero: Path) -> None:
    background = cover(Image.open(hero).convert("RGB"), (1200, 630)).filter(ImageFilter.GaussianBlur(0.25))
    card = background.convert("RGBA")

    overlay = Image.new("RGBA", card.size, (0, 0, 0, 0))
    pixels = overlay.load()
    for x in range(card.width):
        progress = x / card.width
        alpha = round(222 * max(0.16, 1 - progress * 1.08))
        for y in range(card.height):
            pixels[x, y] = (4, 40, 37, alpha)
    card = Image.alpha_composite(card, overlay)
    draw = ImageDraw.Draw(card)

    # A warm brand plate keeps the official dark logo legible on every photo.
    draw.rounded_rectangle((62, 48, 314, 137), radius=8, fill=(245, 240, 230, 242))
    logo = Image.open(LOGO).convert("RGBA")
    logo.thumbnail((224, 70), Image.Resampling.LANCZOS)
    card.alpha_composite(logo, (76, 58 + (69 - logo.height) // 2))

    kicker_font = ImageFont.truetype(str(FONT_SANS_BOLD), 18)
    title_font = ImageFont.truetype(str(FONT_DISPLAY), 60 if len(title) < 31 else 52)
    body_font = ImageFont.truetype(str(FONT_SANS), 24)
    url_font = ImageFont.truetype(str(FONT_SANS_BOLD), 18)

    draw_tracking(draw, (64, 178), kicker, kicker_font, "#f3bd72", 3)
    y = 222
    for line in wrapped_lines(draw, title, title_font, 790)[:3]:
        draw.text((60, y), line, font=title_font, fill="#fffdf8", stroke_width=1, stroke_fill=(8, 46, 43, 90))
        y += 70
    y += 8
    for line in wrapped_lines(draw, description, body_font, 740)[:3]:
        draw.text((64, y), line, font=body_font, fill="#e7efed")
        y += 35

    draw.line((64, 574, 1118, 574), fill=(239, 190, 116, 170), width=2)
    draw.text((64, 588), "OREGONDUNESGUIDE.COM", font=url_font, fill="#fffdf8")
    draw.text((980, 588), "PLAN  •  RIDE  •  EXPLORE", font=kicker_font, fill="#f3bd72", anchor="la")

    output = OUTPUT / f"{slug}.jpg"
    card.convert("RGB").save(output, "JPEG", quality=88, optimize=True, progressive=True)


for page_slug, page_data in PAGES.items():
    generate(page_slug, *page_data)

print(f"Generated {len(PAGES)} social share images in {OUTPUT}")
