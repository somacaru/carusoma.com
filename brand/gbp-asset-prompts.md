# GBP & marketing assets — brand spec and image prompts

Derived from `src/app/globals.css`, `tailwind.config.ts`, and homepage copy (`src/app/page.tsx`). Use for Google Business Profile, social covers, and any tool (Imagen, DALL·E, Midjourney, local LLM → image pipeline).

## Design tokens (source of truth: code)

| Token | Hex / value |
|-------|-------------|
| Background (primary) | `#0a0f1a` |
| Background (darker) | `#060a12` |
| Foreground text | `#e2e8f0` |
| Heading text | `#f1f5f9` |
| Cyan accent | `#22d3ee` |
| Cyan bright | `#67e8f9` |
| Cyan dim | `#0891b2` |
| Secure / positive | `#34d399` |
| Threat / alert | `#ef4444` (use sparingly) |
| Typography | Inter, bold headlines, `-0.025em` letter-spacing on headings |
| Mood | Dark SOC / cybersecurity, subtle cyan grid or glow — not rainbow sci-fi |

## Messaging hooks (from site)

- Hero: “Small-Business Security” / “Try-Hard by Design”
- Sub: commercial-grade coverage; monitoring, testing, response
- Location: Phoenix, AZ — “SYSTEMS ACTIVE • PHOENIX, AZ”

**Legal name (GBP):** Arcane Digital LLC  
**Brand name:** Arcane Digital Shield

## Image prompts (paste into your image generator)

### Square logo / profile (e.g. 720×720; keep safe margin for circular crop)

```
Minimal professional logo for cybersecurity consultancy "Arcane Digital Shield". Dark background #0a0f1a, accent cyan #22d3ee and #67e8f9, optional green #34d399 for a small "secure" indicator. Simple shield or lock icon, clean sans-serif wordmark, Inter-like typography, subtle grid texture, no clipart, no neon rainbow, high contrast, flat vector style, square composition, generous padding for Google Business Profile circular crop.
```

### Wide cover (e.g. 1024×576; keep text in safe center-left area)

```
Wide banner for Google Business Profile: cybersecurity company in Phoenix AZ. Background #0a0f1a with faint cyan #22d3ee grid lines and soft cyan glow. Text: "Arcane Digital LLC" and subtitle "Cybersecurity & IT · Phoenix, AZ". Modern, trustworthy, dark SOC aesthetic, not stock-photo cheesy, no fake people, 16:9 composition with important text in center-left safe zone.
```

### Optional: small LLM instruction block

When using a fast/nano text model to vary prompts, paste this first:

```
You are a brand assistant for Arcane Digital Shield (Arcane Digital LLC), Phoenix AZ. Colors: bg #0a0f1a, cyan #22d3ee, green #34d399 for positive accents. Output only revised image prompts or short taglines; stay professional, no hype words, no fake credentials.
```

## Notes

- Prefer a **real photo** of the owner or workspace for GBP “team” or interior slots — builds trust vs. AI-only faces.
- After export, match **arcanedigitalshield.com** in a side-by-side check before uploading to Google.
- Regenerate this file if `tailwind.config.ts` or hero copy changes materially.
