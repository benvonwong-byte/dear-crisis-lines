// The pool of "Dear Crisis, ___" conversation starters.
// `text` is the part AFTER "Dear Crisis," — display and copy prepend the framing.
// Shape: a grounded insight/factoid, a beat, then a personal question that turns
// the reader inward. Add or cut freely; each needs a stable, unique `id`.

export type Line = {
  id: string;
  text: string;
};

export const lines: Line[] = [
  { id: "1", text: "a brainless slime mold redesigned the Tokyo rail network in a weekend. I've been “getting around to” reorganizing one closet since 2023. What's the system in your life a blob would've fixed by now?" },
  { id: "2", text: "the wolves repaired an entire river by eating elk — no summit, no steering committee. What's the elk in your life you keep scheduling meetings about instead of just eating?" },
  { id: "3", text: "trees quietly pump sugar underground to feed each other's dying seedlings, ad-free, better uptime than the internet. Who's a seedling you could slip a little sugar to this week?" },
  { id: "4", text: "we say “it” about the river so we never owe it a birthday card. What would you actually treat differently tomorrow if you called it “kin”?" },
  { id: "5", text: "an old-growth forest's proudest move is that it stopped growing outward and started growing deep. Where are you overdue to do the same — and what are you scared you'd lose?" },
  { id: "6", text: "everyone recycles harder while Moloch quietly laughs. Be honest: what do you do mostly to feel less guilty, that mainly just… helps you feel less guilty?" },
  { id: "7", text: "we built the machines to free us from the treadmill, then handed the treadmill a motor. What's your one “time-saving” thing that somehow devours the most time?" },
  { id: "8", text: "a compost heap turns every ending into next spring's soil; our economy never learned to rot. What ending are you composting — and what are you just calling “away”?" },
  { id: "9", text: "a starling tracks only its seven nearest neighbors, and a thousand of them dodge the hawk as one. Who are your seven — and when did you last actually watch them?" },
  { id: "10", text: "they keep insisting the times are too urgent to slow down. So where, exactly, are you moving fast mainly to avoid feeling something?" },
  { id: "11", text: "the “self-made” man turns out to be a lichen who forgot he's half algae. Who's the algae quietly keeping you alive that you've stopped thanking?" },
  { id: "12", text: "we swim in cheap energy like a fish swims in water — invisible until it's gone. What else are you not seeing in your life right now… precisely because it's everywhere?" },
  { id: "13", text: "growth purely for its own sake is, medically speaking, the thing a tumor does. Where are you growing something only because stopping would feel like failing?" },
  { id: "14", text: "the largest living thing on Earth is a shy Oregon fungus, thousands of years old, no CEO, no quarterly report. What would you build if nothing had to show results this quarter?" },
  { id: "15", text: "you're a hyperobject — too vast to see, yet in every weather report and grocery bill. What “someday” problem have you filed under future precisely because it's already here?" },
  { id: "16", text: "the most connected humans in history are also the loneliest; somewhere the two graphs crossed. Honestly — how many of your connections would notice if you went quiet for a week?" },
  { id: "17", text: "nobody is actually driving the superorganism: not the billionaires, not the voters, not the presidents. So who have you been blaming for something no single hand is steering?" },
  { id: "18", text: "a monoculture is gloriously efficient right up until the weather turns. Which part of your life is one bad season away from finding that out?" },
  { id: "19", text: "in Potawatomi the same root word means “berry” and “gift.” What would you receive differently tomorrow if the harvest were a present, not an inventory?" },
  { id: "20", text: "despair, it turns out, is just hope that hasn't been composted yet. What are you refusing to let rot so something new can finally grow?" },
  { id: "21", text: "we spent ten thousand years unlearning how to hear the world speak, then hired therapists so we'd feel less alone. When did you last let the more-than-human world get a word in?" },
  { id: "22", text: "there's a homesickness you can feel without ever leaving home. If grief is just love with nowhere to sit down — where will you let yours sit tonight?" },
  { id: "23", text: "we've somehow turned “solving the crisis” into a growth industry. Where in your life are you impressively, exhaustingly busy in precisely the wrong direction?" },
  { id: "24", text: "modernity may be one half of a brain that fired the half that saw things whole. What have you optimized so hard you forgot why you wanted it?" },
  { id: "25", text: "a seed's real genius is knowing when not to sprout. What are you forcing to grow that's quietly begging you for a winter?" },
  { id: "26", text: "infinite growth on a finite planet — an alien economist would assume we were doing satire. What would you have to keep believing for your busiest day to make sense?" },
  { id: "27", text: "you're standing in the doorway between an old story and one not yet born. What are you doing in the doorway — panicking, scrolling, or paying attention?" },
  { id: "28", text: "a river “wastes” miles meandering, and that laziness is exactly what stops it flooding. What meander in your life do you keep trying to straighten into a to-do list?" },
  { id: "29", text: "a forest banks diversity for the bad year the way we're supposed to keep savings. What did you cash in for one more productive quarter that you'd secretly like back?" },
  { id: "30", text: "you don't want my panic and you don't want my optimism. You want my attention. Okay — you've got it. Now what do I actually want to do about you?" },
  { id: "31", text: "there's an old Cree word — wetiko — for the hunger that consumes without limit and convinces the host it's perfectly fine. Where does yours whisper “just one more” the loudest… and do you still believe it?" },
  { id: "32", text: "a tree hands the fungus 30% of its sugar for minerals it could never reach alone, and calls it a fair deal. What “tax” in your life is secretly the best trade you make?" },
  { id: "33", text: "the part of the mind that measures and controls was only ever meant to serve the part that sees things whole — and somewhere it seized the house. Which one's been running your calendar this week?" },
  { id: "34", text: "someone once said the opposite of a trap is a garden. What have you been guarding like a trap… that might actually grow if you treated it like a garden?" },
  { id: "35", text: "a gift loses value the instant you hoard it and multiplies the moment you pass it on — the exact inverse of money. What are you stockpiling that only comes alive when it moves?" },
  { id: "36", text: "the old animists swore the land looks back at you. Faintly unsettling. When did you last stand somewhere long enough to be looked at?" },
  { id: "37", text: "turns out hope isn't a mood you wait around for — it's a thing you do, like push-ups. What's one rep you could manage today?" },
  { id: "38", text: "humanity now wields godlike technology with roughly the self-governance of a group chat at 2am. Where has your power quietly outrun your wisdom lately?" },
  { id: "39", text: "there's a name floated for the age after this one — the Symbiocene, where we live with instead of off. What's one relationship you'd move from “off” to “with”?" },
  { id: "40", text: "there's a ritual where people speak as the river, the wolf, the last bee, just to escape their own skull for an hour. If a creature could send you a “Dear Human” letter — who'd write, and what would it say?" },
  { id: "41", text: "the Buddha basically did degrowth 2,500 years ago and called it enlightenment: whatever you tie down comes loose, whatever you build up falls. What are you clutching that might feel lighter held loosely?" },
  { id: "42", text: "the doomers call hope a drug; the hopeful call doom a cop-out; both are sometimes right. Which one are you reaching for today to avoid simply… looking?" },
  { id: "43", text: "every solution ships with a second-order effect nobody printed on the label. What “fix” in your life quietly became next year's problem?" },
  { id: "44", text: "when one starling turns, the whole flock feels it before it makes any sense to. Whose small turn are you waiting on for permission — or are you the one meant to turn first?" },
  { id: "45", text: "pull a single keystone species and the whole arch of an ecosystem quietly collapses. Who's the keystone in your life you've been treating like they're optional?" },
  { id: "46", text: "our kind of money literally has to grow or it dies — which makes it brilliant at whispering there's never enough. Where does “not enough” run your decisions when it isn't even true?" },
  { id: "47", text: "the coming years may simply hold less more — less stuff, less speed, less scale. If “more” quietly moved out, what would you be relieved to stop carrying?" },
  { id: "48", text: "the frog never jumps, because the water heats one polite degree at a time. What's been warming so slowly around you that you've stopped feeling the temperature?" },
  { id: "49", text: "one story says you're a separate self adrift in a world of strangers; the other says you exist because everything else does. Which story did you wake up inside of this morning?" },
  { id: "50", text: "Bayo says a crisis is a place where “a composting of ourselves can take place” — delightfully gross. What part of who you used to be is finally ready to become soil?" },
  { id: "51", text: "in an economy engineered to harvest your attention, spending it on purpose is nearly an act of rebellion. What's deserved an hour of yours for months and still isn't getting it?" },
  { id: "52", text: "the dreamers keep sketching “omni-win” — a game where your winning doesn't require anyone's losing. When did you last win something where nobody had to lose?" },
];
