# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two co-primary audiences. Neither automatically outranks the other.

- **Fans and club community:** members, players' families and supporters following the club. They come for news, the league table, the squad and photos.
- **Sponsors and partners:** companies and institutions judging whether the club is credible, active and worth backing.

Parents looking for a school for their child are a real audience for the club, but not a design target yet. See the planned school page under Capabilities and Constraints.

## Product Purpose

The official website of STK Vojvodina (English: TTC Vojvodina), a table tennis club in Novi Sad, Serbia, founded in 1945.

It gives the club one trustworthy home for its news, league standing, squad, photos and contact details. Success means fans use it to follow the club, and a prospective sponsor leaves convinced this is a serious, active organisation worth supporting.

## Positioning

A club founded in 1945 that is still developing young players today. The story leads with these two things together: heritage and youth development.

The youth side has live proof: a table tennis school, kids' camps and tournaments, and Dušan Milošević's debut for Serbia's younger cadet national team after training with the first team. Competitive results support the story but do not lead it.

## Operating Context

- **Publishing:** content lives in Contentful (space "Vojvodina Blog"). Club staff and the developer both publish, so entries arrive unevenly: some have no excerpt, image or Serbian translation, and untitled drafts exist.
- **League data:** the league table and matches are written to Contentful by an external scraper for "Prva Liga Muskarci". They update without an editor and include an update timestamp.
- **Club rhythm:** news covers tournaments, camps, guests, TV appearances and club events through the year.
- **Direct contact:** stkvojvodinans@gmail.com, +381 63 1201 431, Sutjeska 2, 21000 Novi Sad.
- **Social channels:** Facebook, Instagram and LinkedIn.

## Capabilities and Constraints

**Live today**
- Home page with news highlights, league table, squad and gallery preview.
- Events list and single post pages, gallery, contact page.
- Serbian and English interface. Serbian is the default.

**Committed to ship**
- Contact form that really delivers messages to the club. It currently only logs to the console, and the delivery method is undecided.
- Upcoming matches and calendar. The code exists but is hidden; match data is already in Contentful.
- Sponsors list, replacing the "coming soon" line. No sponsor names are on hand yet.

**Planned later**
- A dedicated page for the table tennis school. Enrolment is not a site goal for now.

**Not planned**
- Newsletter. The footer signup field does nothing and should go.

**Content constraints**
- Contentful's default locale is `en-US`, and `sr` falls back to it, so a Serbian visitor can see English text where a translation is missing.
- Player names, ages and images are not localised.
- Scraped team names arrive in Cyrillic, while the Serbian interface and news are in Latin script.
- The "Coaching Staff" tab has no entries behind it yet (0 coach entries), and no "delegation" content type exists.

**Terminology**
- Serbian: STK Vojvodina, stonoteniski klub. English: TTC Vojvodina or STK Vojvodina; both appear in published content.
- League: Prva Liga. Youth category: younger cadets (mlađi kadeti).

**Undecided**
- Contact form delivery method.
- Hosting and deployment target.
- Which name the English site should standardise on.

## Brand Commitments

- Club name: STK Vojvodina.
- Crest: `public/assets/logo.png`, carrying the name and the year 1945.
- Tagline: "Osnovan 1945. godine. Zvanični sajt stonoteniskog kluba." / "Founded in 1945. Official website of the table tennis club."
- Published copy speaks as "we" and calls the club a family ("stonoteniska porodica"). This is observed in posts, not a formally confirmed voice.

## Evidence on Hand

**Available**
- 20 news posts in Contentful, mostly bilingual, 2 of them untitled drafts. They cover the school, kids' camps in Kanjiža and Banja Luka, the GEWO children's tournament, the Vojvodina Championship, TOP12 for younger cadets, a tournament in Romania, and television appearances.
- 8 senior squad players in Contentful.
- A live league table and match data for Prva Liga Muskarci. Standings change, so read them from data and never hard-code them.
- The club's own published claim: "the longest tradition and the best training conditions". It has no supporting evidence on file, so treat it as the club's wording, not a verified fact.

**Absent: do not fabricate or imply**
- Club history beyond the 1945 founding year. Titles, trophies, archive photos and notable former players are not available to the developer at the moment.
- Sponsor names and logos.
- Sponsorship packages, audience reach or membership numbers.
- Testimonials and quotes.
- Coaching staff profiles.

## Product Principles

1. **Claim only what can be shown.** Heritage rests on one confirmed fact today. Let 1945 and real club activity carry the weight, and never suggest honours or history nobody can document.
2. **Show a living club.** Current news, standings and young players are the strongest proof for fans and sponsors alike.
3. **Earn sponsors through credibility.** The site shows a sponsor that the club is serious and active, using the same real activity fans follow, not a separate sales pitch.
4. **Serbian first.** Serbian is the default experience. English is a full alternative, not the source language.
5. **Hold up under real publishing.** Every surface must still work when an entry has no image, excerpt or translation, because that is how content actually arrives.
