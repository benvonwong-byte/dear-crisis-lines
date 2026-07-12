# Dear Crisis — Curation Table (Design)

Date: 2026-07-12
Owner: Benjamin Von Wong (hi@vonwong.com)
Status: Approved

## What this is

A self-hosted, shareable webpage for the Dear Crisis community. It presents a
growing pool of "Dear Crisis, ___" conversation starters — each an **insight
(grounded factoid/metaphor from metacrisis thought or nature) followed by a
personal, self-reflective, witty question** aimed at the reader's own life. The
owner browses the pool, **favorites** the keepers over time, and **exports** the
favorites to paste into the community WhatsApp chat.

Not a daily-rotation joke site. It is a **curation tool**: grow a list, keep the
best.

### Line shape (canonical)

> Dear Crisis, we swim in cheap energy like a fish swims in water — invisible
> until it's gone. What else are you not seeing in your life right now…
> precisely because it's everywhere?

Structure: `insight/factoid — [beat] — personal question turning on YOU`.
Tone dial: deeply intellectual + perspective-shifting, threaded with
wry-absurdist, tender-spiritual, and provocative; funny/whimsical where it can
be. Muzzle always pointed at the *system*, never the sufferer.

## Research foundation

Three deep-research passes seeded the content (see conversation): (1) metacrisis
intellectual landscape — Schmachtenberger/Moloch/multipolar traps, Vervaeke
meaning crisis, McGilchrist hemispheres, Morton hyperobjects, Hagens
superorganism/energy blindness, Meadows leverage points, Eisenstein interbeing,
Akomolafe slow-urgency; (2) nature-centric & spiritual framings — wood wide web,
slime-mold-vs-Tokyo-rail, wolves-change-rivers, lichen, Kimmerer gift/animacy,
Abbey cancer-cell, compost, murmurations, solastalgia/Symbiocene, Macy Great
Turning/Active Hope; (3) Dear Crisis brand voice + metacrisis-humor craft —
gallows humor that keeps agency, commit fully, punch up at systems.

## Look and feel

Reuse DearCrisis's riso/analog zine aesthetic verbatim from
`/Users/vonwong/Dropbox/ClaudeCode/DearCrisis/src/app/globals.css`:

- Palette: paper-cream `#F5F0E8` base, ink-black `#1A1A1A`, riso-coral `#E85D4A`,
  muted-teal `#5B8A8A`, charcoal `#3D3D3D`.
- Paper-grain fractal-noise texture (multiply blend), halftone dots, coral
  misregistration ghost (2px/1px offset behind headings), thick 2px ink borders,
  hard `5px 5px 0px` drop-shadows on cards.
- Type: Lora (serif headlines, heavy), Inter (labels/body, uppercase tracked
  eyebrows). Coral text-selection.

## Architecture

- **Framework:** Next.js (App Router) + Tailwind v4. Static — no server routes,
  no API, no DB.
- **Hosting:** Vercel (shareable link). Also runnable locally via `npm run dev`.
- **Directory:** `/Users/vonwong/DailyJoke`.

### Components / files

- `src/app/globals.css` — copied from DearCrisis, riso primitives.
- `src/app/layout.tsx` — fonts (Lora + Inter), metadata, paper background.
- `src/app/page.tsx` — the single curation page (client component for favorites).
- `src/data/lines.ts` — the pool. `export const lines: Line[]` where
  `Line = { id: string; text: string }`. `text` is the part AFTER "Dear Crisis,"
  (display + copy prepend the framing). Seeded with the 52 approved lines.
- `src/lib/favorites.ts` — localStorage read/write helpers + export formatter.
- Card + filter UI can live inline in `page.tsx` or split into
  `src/components/LineCard.tsx` and `src/components/FilterBar.tsx`.

### Data flow

1. `lines.ts` is imported statically at build time → rendered as cards.
2. Favorites are a `Set<string>` of line ids in React state, hydrated from
   `localStorage["dearcrisis.favorites"]` on mount, written back on every toggle.
3. Filter toggle (`All` / `Favorites`) filters the rendered list client-side.
4. **Copy for WhatsApp** (per card): writes `Dear Crisis, ${text}` to clipboard.
5. **Export favorites**: writes all favorited lines (as `Dear Crisis, ${text}`,
   newline-separated) to clipboard.

### Display vs stored vs copied

- Stored (`lines.ts`): the `___` part only.
- Displayed: riso caps `DEAR CRISIS,` header + the `text` below.
- Copied: `Dear Crisis, ${text}` (single clean block, WhatsApp-ready).

## Error handling

- Clipboard: use `navigator.clipboard.writeText` with a fallback + a brief
  "Copied!" affordance; if it rejects (permissions), show a non-blocking notice.
- localStorage: guard for unavailable/again private-mode — wrap in try/catch, and
  if unavailable, favorites simply don't persist (feature degrades, page still
  works). SSR-safe: only touch `window`/`localStorage` inside effects.
- Empty Favorites view: show a gentle empty state ("No keepers yet — tap ♥").

## Testing

Lightweight for a personal experiment, but per the TDD gate:

- Unit-test the pure helpers in `src/lib/favorites.ts`:
  - export formatter turns a set of ids + lines into the correct newline-joined
    `Dear Crisis, …` block, in pool order.
  - toggle add/remove logic on the id set.
- Component smoke test (React Testing Library): renders N cards from a fixture,
  toggling ♥ moves a card into the Favorites filter, Copy calls the clipboard
  with the framed string. Mock `navigator.clipboard` and `localStorage`.
- Manual verification: `npm run dev`, load page, favorite a few, refresh (persists),
  export (clipboard correct), `npm run build` clean.

## Out of scope (YAGNI)

Daily rotation; live AI generation; cloud/shared favorites; auth; user
submissions; image/social share cards; archive-by-date. The pool grows by
hand-editing `lines.ts` or requesting more batches.

## Content: the 52 seed lines

Stored as the text after "Dear Crisis,". Authored beats (`…`) preserved.

1. a brainless slime mold redesigned the Tokyo rail network in a weekend. I've been "getting around to" reorganizing one closet since 2023. What's the system in your life a blob would've fixed by now?
2. the wolves repaired an entire river by eating elk — no summit, no steering committee. What's the elk in your life you keep scheduling meetings about instead of just eating?
3. trees quietly pump sugar underground to feed each other's dying seedlings, ad-free, better uptime than the internet. Who's a seedling you could slip a little sugar to this week?
4. we say "it" about the river so we never owe it a birthday card. What would you actually treat differently tomorrow if you called it "kin"?
5. an old-growth forest's proudest move is that it stopped growing outward and started growing deep. Where are you overdue to do the same — and what are you scared you'd lose?
6. everyone recycles harder while Moloch quietly laughs. Be honest: what do you do mostly to feel less guilty, that mainly just… helps you feel less guilty?
7. we built the machines to free us from the treadmill, then handed the treadmill a motor. What's your one "time-saving" thing that somehow devours the most time?
8. a compost heap turns every ending into next spring's soil; our economy never learned to rot. What ending are you composting — and what are you just calling "away"?
9. a starling tracks only its seven nearest neighbors, and a thousand of them dodge the hawk as one. Who are your seven — and when did you last actually watch them?
10. they keep insisting the times are too urgent to slow down. So where, exactly, are you moving fast mainly to avoid feeling something?
11. the "self-made" man turns out to be a lichen who forgot he's half algae. Who's the algae quietly keeping you alive that you've stopped thanking?
12. we swim in cheap energy like a fish swims in water — invisible until it's gone. What else are you not seeing in your life right now… precisely because it's everywhere?
13. growth purely for its own sake is, medically speaking, the thing a tumor does. Where are you growing something only because stopping would feel like failing?
14. the largest living thing on Earth is a shy Oregon fungus, thousands of years old, no CEO, no quarterly report. What would you build if nothing had to show results this quarter?
15. you're a hyperobject — too vast to see, yet in every weather report and grocery bill. What "someday" problem have you filed under future precisely because it's already here?
16. the most connected humans in history are also the loneliest; somewhere the two graphs crossed. Honestly — how many of your connections would notice if you went quiet for a week?
17. nobody is actually driving the superorganism: not the billionaires, not the voters, not the presidents. So who have you been blaming for something no single hand is steering?
18. a monoculture is gloriously efficient right up until the weather turns. Which part of your life is one bad season away from finding that out?
19. in Potawatomi the same root word means "berry" and "gift." What would you receive differently tomorrow if the harvest were a present, not an inventory?
20. despair, it turns out, is just hope that hasn't been composted yet. What are you refusing to let rot so something new can finally grow?
21. we spent ten thousand years unlearning how to hear the world speak, then hired therapists so we'd feel less alone. When did you last let the more-than-human world get a word in?
22. there's a homesickness you can feel without ever leaving home. If grief is just love with nowhere to sit down — where will you let yours sit tonight?
23. we've somehow turned "solving the crisis" into a growth industry. Where in your life are you impressively, exhaustingly busy in precisely the wrong direction?
24. modernity may be one half of a brain that fired the half that saw things whole. What have you optimized so hard you forgot why you wanted it?
25. a seed's real genius is knowing when not to sprout. What are you forcing to grow that's quietly begging you for a winter?
26. infinite growth on a finite planet — an alien economist would assume we were doing satire. What would you have to keep believing for your busiest day to make sense?
27. you're standing in the doorway between an old story and one not yet born. What are you doing in the doorway — panicking, scrolling, or paying attention?
28. a river "wastes" miles meandering, and that laziness is exactly what stops it flooding. What meander in your life do you keep trying to straighten into a to-do list?
29. a forest banks diversity for the bad year the way we're supposed to keep savings. What did you cash in for one more productive quarter that you'd secretly like back?
30. you don't want my panic and you don't want my optimism. You want my attention. Okay — you've got it. Now what do I actually want to do about you?
31. there's an old Cree word — wetiko — for the hunger that consumes without limit and convinces the host it's perfectly fine. Where does yours whisper "just one more" the loudest… and do you still believe it?
32. a tree hands the fungus 30% of its sugar for minerals it could never reach alone, and calls it a fair deal. What "tax" in your life is secretly the best trade you make?
33. the part of the mind that measures and controls was only ever meant to serve the part that sees things whole — and somewhere it seized the house. Which one's been running your calendar this week?
34. someone once said the opposite of a trap is a garden. What have you been guarding like a trap… that might actually grow if you treated it like a garden?
35. a gift loses value the instant you hoard it and multiplies the moment you pass it on — the exact inverse of money. What are you stockpiling that only comes alive when it moves?
36. the old animists swore the land looks back at you. Faintly unsettling. When did you last stand somewhere long enough to be looked at?
37. turns out hope isn't a mood you wait around for — it's a thing you do, like push-ups. What's one rep you could manage today?
38. humanity now wields godlike technology with roughly the self-governance of a group chat at 2am. Where has your power quietly outrun your wisdom lately?
39. there's a name floated for the age after this one — the Symbiocene, where we live with instead of off. What's one relationship you'd move from "off" to "with"?
40. there's a ritual where people speak as the river, the wolf, the last bee, just to escape their own skull for an hour. If a creature could send you a "Dear Human" letter — who'd write, and what would it say?
41. the Buddha basically did degrowth 2,500 years ago and called it enlightenment: whatever you tie down comes loose, whatever you build up falls. What are you clutching that might feel lighter held loosely?
42. the doomers call hope a drug; the hopeful call doom a cop-out; both are sometimes right. Which one are you reaching for today to avoid simply… looking?
43. every solution ships with a second-order effect nobody printed on the label. What "fix" in your life quietly became next year's problem?
44. when one starling turns, the whole flock feels it before it makes any sense to. Whose small turn are you waiting on for permission — or are you the one meant to turn first?
45. pull a single keystone species and the whole arch of an ecosystem quietly collapses. Who's the keystone in your life you've been treating like they're optional?
46. our kind of money literally has to grow or it dies — which makes it brilliant at whispering there's never enough. Where does "not enough" run your decisions when it isn't even true?
47. the coming years may simply hold less more — less stuff, less speed, less scale. If "more" quietly moved out, what would you be relieved to stop carrying?
48. the frog never jumps, because the water heats one polite degree at a time. What's been warming so slowly around you that you've stopped feeling the temperature?
49. one story says you're a separate self adrift in a world of strangers; the other says you exist because everything else does. Which story did you wake up inside of this morning?
50. Bayo says a crisis is a place where "a composting of ourselves can take place" — delightfully gross. What part of who you used to be is finally ready to become soil?
51. in an economy engineered to harvest your attention, spending it on purpose is nearly an act of rebellion. What's deserved an hour of yours for months and still isn't getting it?
52. the dreamers keep sketching "omni-win" — a game where your winning doesn't require anyone's losing. When did you last win something where nobody had to lose?
