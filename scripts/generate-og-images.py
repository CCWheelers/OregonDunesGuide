"""Generate the Oregon Dunes Guide 1200x630 social-card family."""

from pathlib import Path
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
IMAGES = PUBLIC / "images"
OUTPUT = ROOT / "og"
OUTPUT.mkdir(parents=True, exist_ok=True)

# Page title, compact descriptor, source photograph.
PAGES = {
    "home": ("OREGON DUNES GUIDE", "MAPS · CAMPING · RIDING · WEATHER · TRIP PLANNING", PUBLIC / "dunes-hero.jpg"),
    "camping": ("CAMPING GUIDE", "CAMPGROUNDS · RV SITES · RIDE-FROM-CAMP", IMAGES / "hero-guide-camping.webp"),
    "ohv-riding": ("OHV RIDING GUIDE", "RIDING ZONES · STAGING · DUNE SKILLS · GROUPS", IMAGES / "hero-guide-riding.webp"),
    "maps": ("INTERACTIVE MAPS", "RIDING ZONES · STAGING · CAMPING · GPS", IMAGES / "hero-maps.webp"),
    "weather": ("WEATHER CENTER", "WIND · RAIN · FOG · SEVEN-DAY OUTLOOKS", IMAGES / "hero-weather.webp"),
    "tides": ("TIDE GUIDE", "BEACH ACCESS · LOW-TIDE WINDOWS · COAST SAFETY", IMAGES / "hero-tides.webp"),
    "day-use": ("DAY-USE GUIDE", "STAGING · DUNE WALKS · LAKES · QUIET STOPS", IMAGES / "hero-day-use.webp"),
    "gas-prices": ("GAS PRICES", "FLORENCE · REEDSPORT · COOS BAY · FUEL PLANNING", IMAGES / "hero-gas.webp"),
    "history": ("HISTORY OF THE DUNES", "PEOPLE · SAND · SETTLEMENT · CONSERVATION", IMAGES / "hero-history.webp"),
    "rules": ("RULES & REGULATIONS", "PERMITS · FLAGS · HELMETS · EQUIPMENT · CLOSURES", IMAGES / "hero-rules-v2.webp"),
    "safety": ("SAFETY FIELDBOOK", "DUNE READING · GROUPS · YOUTH · EMERGENCIES", IMAGES / "hero-safety-v2.webp"),
    "nearby-towns": ("GATEWAY TOWNS", "FLORENCE · WINCHESTER BAY · REEDSPORT · COOS BAY", IMAGES / "hero-guide-towns.webp"),
    "wildlife": ("WILDLIFE & HABITAT", "SHOREBIRDS · ELK · WETLANDS · ESTUARIES", IMAGES / "wildlife-hero-elk.webp"),
    "permits": ("PERMITS & REGULATIONS", "ATV PERMITS · SAFETY CARDS · RIDER REQUIREMENTS", IMAGES / "hero-rules-v2.webp"),
    "current-conditions": ("CURRENT CONDITIONS", "WEATHER · CLOSURES · FIRE · ROADS · ACCESS", IMAGES / "hero-weather.webp"),
    "trip-planner": ("TRIP PLANNER", "STAY · RIDE · EXPLORE · EAT · PRINT · SHARE", IMAGES / "hero-planner.webp"),
    "riding-florence": ("FLORENCE RIDING MAP", "SOUTH JETTY · SILTCOOS · STAGING · GPS", IMAGES / "riding-01-florence.webp"),
    "riding-winchester-bay": ("WINCHESTER BAY MAP", "UMPQUA DUNES · STAGING · SAND CAMPS · GPS", IMAGES / "riding-02-winchester.webp"),
    "riding-coos-bay": ("COOS BAY RIDING MAP", "SPINREEL · HAUSER · HORSFALL · GPS", IMAGES / "riding-03-coos-bay.webp"),
}

FONT_DISPLAY = Path(r"C:\Windows\Fonts\georgiab.ttf")
FONT_SANS_BOLD = Path(r"C:\Windows\Fonts\segoeuib.ttf")
LOGO = IMAGES / "oregon-dunes-guide-logo-transparent.png"
SUNSET_LOGO = IMAGES / "oregon-dunes-guide-logo-footer-sunset.png"


def cover(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    ratio = max(size[0] / image.width, size[1] / image.height)
    resized = image.resize(
        (round(image.width * ratio), round(image.height * ratio)),
        Image.Resampling.LANCZOS,
    )
    left = max(0, (resized.width - size[0]) // 2)
    top = max(0, (resized.height - size[1]) // 2)
    return resized.crop((left, top, left + size[0], top + size[1]))


def fit_font(draw: ImageDraw.ImageDraw, text: str, max_width: int) -> ImageFont.FreeTypeFont:
    size = 67
    while size > 38:
        font = ImageFont.truetype(str(FONT_DISPLAY), size)
        if draw.textlength(text, font=font) <= max_width:
            return font
        size -= 2
    return ImageFont.truetype(str(FONT_DISPLAY), 38)


def fit_sans_font(
    draw: ImageDraw.ImageDraw,
    text: str,
    max_width: int,
    start_size: int,
    minimum_size: int,
) -> ImageFont.FreeTypeFont:
    size = start_size
    while size > minimum_size:
        font = ImageFont.truetype(str(FONT_SANS_BOLD), size)
        if draw.textlength(text, font=font) <= max_width:
            return font
        size -= 1
    return ImageFont.truetype(str(FONT_SANS_BOLD), minimum_size)


def centered_x(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, left: int, right: int) -> int:
    return round(left + ((right - left) - draw.textlength(text, font=font)) / 2)


def split_logo() -> tuple[Image.Image, Image.Image]:
    """Separate the emblem and wordmark while preserving the overlapping wave."""
    logo = Image.open(LOGO).convert("RGBA")
    # The emblem and first letter overlap slightly in the source artwork. A clean
    # crop avoids leaving even a sliver of the O beside the enlarged icon.
    emblem = logo.crop((0, 0, 252, logo.height))
    emblem = emblem.crop(emblem.getbbox())

    sunset_logo = Image.open(SUNSET_LOGO).convert("RGBA")
    wordmark = sunset_logo.crop((250, 62, sunset_logo.width, 224))
    word_alpha = wordmark.getchannel("A")
    # Remove the small tail of the emblem that shares the left edge of this crop.
    cleanup = ImageDraw.Draw(word_alpha)
    cleanup.rectangle((0, 96, 48, wordmark.height), fill=0)
    wordmark.putalpha(word_alpha)
    wordmark = wordmark.crop(wordmark.getbbox())
    return emblem, wordmark


def generate(slug: str, title: str, descriptor: str, hero: Path) -> None:
    card = cover(Image.open(hero).convert("RGB"), (1200, 630)).filter(ImageFilter.GaussianBlur(0.2)).convert("RGBA")

    # The photograph stays recognizable while the central type remains readable.
    shade = Image.new("RGBA", card.size, (0, 0, 0, 0))
    pixels = shade.load()
    for x in range(card.width):
        for y in range(card.height):
            left_strength = max(0.0, 1.0 - x / 660)
            bottom_strength = max(0.0, (y - 430) / 200)
            alpha = round(45 + 155 * left_strength + 55 * bottom_strength)
            pixels[x, y] = (3, 34, 32, min(226, alpha))
    card = Image.alpha_composite(card, shade)
    draw = ImageDraw.Draw(card)

    # Fine dune-contour rings preserve the established OG-card family.
    ring_color = (240, 213, 155, 205)
    center = (-20, 310)
    for radius in range(260, 690, 24):
        draw.ellipse(
            (center[0] - radius, center[1] - radius, center[0] + radius, center[1] + radius),
            outline=ring_color,
            width=1,
        )

    # Let the oversized emblem dominate the left side while keeping every
    # headline and descriptor crisply legible above it.
    emblem, wordmark = split_logo()
    emblem = emblem.resize((emblem.width * 3, emblem.height * 3), Image.Resampling.LANCZOS)
    emblem_y = round((card.height - emblem.height) / 2)
    card.alpha_composite(emblem, (-100, emblem_y))
    draw = ImageDraw.Draw(card)

    content_left, content_right = 366, 1128
    kicker_font = ImageFont.truetype(str(FONT_SANS_BOLD), 21)
    title_font = fit_font(draw, title, content_right - content_left)
    descriptor_font = fit_sans_font(draw, descriptor, content_right - content_left, 25, 19)
    path = "" if slug == "home" else f"/{slug.upper()}"
    address = f"OREGONDUNESGUIDE.COM{path}"
    url_font = fit_sans_font(draw, address, content_right - content_left, 23, 17)

    kicker = "OREGON DUNES GUIDE"
    draw.text(
        (centered_x(draw, kicker, kicker_font, content_left, content_right), 108),
        kicker,
        font=kicker_font,
        fill="#ffc56f",
        stroke_width=2,
        stroke_fill="#143f3a",
    )
    draw.text(
        (centered_x(draw, title, title_font, content_left, content_right), 160),
        title,
        font=title_font,
        fill="#f7ecd5",
        stroke_width=2,
        stroke_fill="#163c38",
    )
    accent_width = 122
    accent_left = round(content_left + ((content_right - content_left) - accent_width) / 2)
    draw.rounded_rectangle((accent_left, 268, accent_left + accent_width, 274), radius=3, fill="#ef653d")
    draw.text(
        (centered_x(draw, descriptor, descriptor_font, content_left, content_right), 296),
        descriptor,
        font=descriptor_font,
        fill="#fffaf0",
    )

    # The emblem owns the open left side. The matching wordmark sits in the band
    # beneath the descriptor, safely above the divider and page address.
    wordmark.thumbnail((440, 158), Image.Resampling.LANCZOS)
    wordmark_x = round(content_left + ((content_right - content_left) - wordmark.width) / 2)
    card.alpha_composite(wordmark, (wordmark_x, 348))

    divider_y = 535
    draw.line((content_left, divider_y, content_right, divider_y), fill=(239, 190, 116, 210), width=2)
    draw.text((content_left, 559), address, font=url_font, fill="#fffdf8")

    output = OUTPUT / f"{slug}.jpg"
    card.convert("RGB").save(output, "JPEG", quality=90, optimize=True, progressive=True)


requested_slugs = sys.argv[1:]
selected_pages = PAGES
if requested_slugs:
    unknown = [slug for slug in requested_slugs if slug not in PAGES]
    if unknown:
        raise SystemExit(f"Unknown social-card slug(s): {', '.join(unknown)}")
    selected_pages = {slug: PAGES[slug] for slug in requested_slugs}

for page_slug, page_data in selected_pages.items():
    generate(page_slug, *page_data)

print(f"Generated {len(selected_pages)} social share image(s) in {OUTPUT}")
