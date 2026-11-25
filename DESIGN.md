---
name: STK Vojvodina
description: Official website of the Novi Sad table tennis club, founded in 1945.
colors:
  crest-red: "oklch(55.57% 0.20969 29.947)"
  crest-red-glass: "oklch(55.57% 0.20969 29.947 / 50%)"
  deep-red: "oklch(30.57% 0.20969 29.947)"
  hall-black: "oklch(15.907% 0.00002 271.152)"
  hall-charcoal: "oklch(20.907% 0.00002 271.152)"
  hall-graphite: "oklch(25.907% 0.00002 271.152)"
  floodlight-white: "oklch(97.015% 0.00011 271.152)"
  chalk: "oklch(92.015% 0.00011 271.152)"
  ash-grey: "oklch(67.015% 0.00011 271.152)"
  line-grey: "oklch(47.015% 0.00011 271.152)"
  pane-black: "oklch(2.015% 0.00011 271.152 / 50%)"
typography:
  display:
    fontFamily: "Thunder, sans-serif"
    fontSize: "4rem"
    fontWeight: 700
    lineHeight: 0.95
  headline:
    fontFamily: "Thunder, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
  title-card:
    fontFamily: "Geist, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: "1.75rem"
  title:
    fontFamily: "Geist, sans-serif"
    fontSize: "1rem"
    fontWeight: 300
    lineHeight: 1.5
  body-reading:
    fontFamily: "Geist, sans-serif"
    fontSize: "1rem"
    fontWeight: 300
    lineHeight: "1.5rem"
  body:
    fontFamily: "Geist, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 300
    lineHeight: 1.5
  label:
    fontFamily: "Geist, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  md: "0.5rem"
  lg: "0.75rem"
  xl: "1rem"
spacing:
  spacing1: "0.25rem"
  spacing2: "0.5rem"
  spacing3: "1rem"
  spacing4: "1.25rem"
  spacing5: "2.5rem"
  spacing6: "5rem"
  spacing7: "10rem"
components:
  button-primary:
    backgroundColor: "{colors.crest-red}"
    textColor: "{colors.floodlight-white}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1.25rem"
  button-secondary:
    backgroundColor: "{colors.hall-black}"
    textColor: "{colors.floodlight-white}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1.25rem"
  button-secondary-small:
    backgroundColor: "{colors.hall-black}"
    textColor: "{colors.floodlight-white}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.crest-red}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1.25rem"
  button-ghost-hover:
    backgroundColor: "{colors.deep-red}"
    textColor: "{colors.floodlight-white}"
  input:
    backgroundColor: "{colors.hall-graphite}"
    textColor: "{colors.chalk}"
    rounded: "{rounded.md}"
    padding: "0.625rem 0.75rem"
  form-card:
    backgroundColor: "{colors.hall-charcoal}"
    textColor: "{colors.chalk}"
    rounded: "{rounded.lg}"
    padding: "1.5rem"
  post-panel:
    backgroundColor: "{colors.hall-charcoal}"
    textColor: "{colors.chalk}"
    rounded: "{rounded.xl}"
    padding: "2.5rem"
  league-table:
    backgroundColor: "{colors.pane-black}"
    textColor: "{colors.chalk}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "1.25rem 2.5rem"
  player-frame:
    backgroundColor: "{colors.hall-charcoal}"
    textColor: "{colors.floodlight-white}"
    rounded: "{rounded.md}"
  tooltip:
    backgroundColor: "{colors.crest-red}"
    textColor: "{colors.floodlight-white}"
    rounded: "{rounded.md}"
    padding: "1rem"
  nav-link:
    textColor: "{colors.ash-grey}"
    typography: "{typography.label}"
  nav-link-active:
    textColor: "{colors.chalk}"
  sidebar-link:
    textColor: "{colors.ash-grey}"
    typography: "{typography.label}"
    padding: "1rem 1.25rem"
  sidebar-link-selected:
    textColor: "{colors.floodlight-white}"
  category-marker:
    textColor: "{colors.chalk}"
    typography: "{typography.label}"
---

# Design System: STK Vojvodina

## Overview

**Creative North Star: "The Floodlit Hall"**

A dark sports hall with the light on the table. The page is the unlit room: near-black, colourless and quiet. What matters right now is what gets lit: a photo, a headline, a league table. Crest Red is the one coloured light in the building, and it only ever marks what is in play: the active link, the current section, the next action.

The system is confident and athletic. Tall condensed headlines stand at full height and speak in capitals, the way a name reads on a hall banner. Controls are compact and move fast. Full-screen photo panels do the heavy lifting, with small, precise interface details around them rather than decoration. Density stays low on the home page and tightens only where the data needs it, such as the league table.

The site must never read as corporate and sterile, with polish and no sport in it. It must never read as a playful kids' club either, even though youth work is central to the club's story. Youth is shown with the same seriousness as the first team.

**Key Characteristics:**
- Near-black, fully neutral surfaces with a single red accent taken from the crest.
- Thunder in tall condensed capitals for headlines; Geist for reading and data.
- Full-bleed photo panels under a dark overlay, with text set directly on them.
- Dark pages broken by bright white bands.
- Flat at rest; shadow and glow appear only on glass over photos or in response to touch.
- Compact controls with a forward double arrow and a quick press-in on hover.

## Colors

One saturated red against a truly colourless scale of blacks, greys and whites.

### Primary
- **Crest Red** (`--primary100`, ≈ #d22314): The club's colour, matched to the crest. Used for primary buttons, the active underline and edge markers, category squares and the loader.
- **Crest Red Glass** (`--primary100-50`): Crest Red at half strength, for use behind a blur over photos. The player nameplate that used it has been retired, so nothing on the site shows it now.
- **Deep Red** (`--primary75`, renders ≈ #790000): The hover fill for the ghost button. It sits outside the sRGB range, so browsers clip it.

### Neutral
- **Hall Black** (`--bg`, ≈ #0d0d0d): The page itself, and the secondary button on white bands.
- **Hall Charcoal** (`--dark5`, ≈ #181818): The first lift: form cards, post panels, empty image wells. Also the text colour on the white gallery band.
- **Hall Graphite** (`--dark10`, ≈ #242424): The second lift: input fields and plain card titles.
- **Floodlight White** (`--light100`, ≈ #f5f5f5): The white bands, plus text on Crest Red and the brightest text on dark.
- **Chalk** (`--light95`, ≈ #e4e4e4): Default text on dark.
- **Ash Grey** (`--light70`, ≈ #959595): Secondary text, metadata and resting navigation links.
- **Line Grey** (`--light50`, ≈ #5b5b5b): Hairlines, table rules and dashed dividers.
- **Pane Black** (`--light5` at 50%): The smoked glass behind the league table.

### Named Rules
**The One Light Rule.** Crest Red is the only hue in the interface. Neutrals carry no tint, and no second accent is added. Colour in a photo is welcome; colour in the interface is not.

**The In Play Rule.** Red marks what is active or actionable. If nothing is happening there, it isn't red.

**The Text Floor Rule.** Ash Grey is the lowest text colour on dark (6.50:1 on Hall Black). Line Grey measures 2.85:1 and is for lines only.

**The Red Type Rule.** Crest Red on Hall Black measures 3.69:1, so on dark it is for shapes and large text only. Small red text belongs on Floodlight White (4.83:1). White text on Crest Red also measures 4.83:1.

## Typography

**Display Font:** Thunder (with sans-serif fallback), self-hosted from `public/assets/fonts`
**Body Font:** Geist (with sans-serif fallback), loaded from Google Fonts

**Character:** Thunder is tall, tight and loud, built for names and headlines. Geist is clean and light, and stays out of the way so Thunder can do the shouting.

### Hierarchy
- **Display** (700, 4rem, 0.95): Page and news headlines, always uppercase, held to about 20 characters wide on the home page. Drops to 3rem on small screens.
- **Headline** (600, 2rem): Section titles such as Our Team and Gallery, usually uppercase. Also the club name beside the crest.
- **Title Card** (500, 1.5rem, 1.75rem): News card titles in Geist. The highlighted post title is the same size, in Thunder capitals.
- **Title** (300, 1rem, 1.5): Lead paragraphs, team tabs and footer column titles.
- **Body Reading** (300, 1rem, 1.5rem): Article text on single post pages.
- **Body** (300, 0.75rem, 1.5): The site-wide default for short text, table cells and metadata.
- **Label** (500, 0.75rem, 1.5): Navigation and buttons. Navigation is uppercase.

The whole scale follows the screen through the root size alone: 13px up to 1279px wide, 14px from 1280px, 16px from 1440px, and from 1920px up it grows in proportion to the width (`100vw / 120`, so 16px at 1920px and about 21px at 2560px). Sizes are therefore written in rem, never px or vw, except hairlines and floors. Body (`--small`) never renders below 12px on desktop, and data and touch targets hold 14px and 44px. On phones Body is still about 9.75px, which is too small for comfortable reading. Treat Body as a size for short labels and data, and use Body Reading for anything longer than a line or two. Text is balanced by default across the site; article text switches this off.

### Named Rules
**The Latin Only Rule.** Thunder has every Serbian Latin letter (Š, Đ, Č, Ć, Ž) but no Cyrillic at all. Scraped team names arrive in Cyrillic, so they always stay in Geist. Never set unconverted Cyrillic data in a Thunder style. Thunder also has no comma-below Ș or ș: it sets an S with a loose comma beside it. Player names display the cedilla Ş instead, and Contentful keeps the real spelling.

**The Two Voices Rule.** Thunder is for names and headlines; Geist is for reading and data. Thunder never sets a paragraph, and Geist never sets a page headline.

## Layout

Pages run full-bleed with no central container. The standard page frame is 5rem of vertical padding and 1.25rem at the sides, with at least 80% of the viewport height. Only articles narrow to a reading column (40rem). It starts 25rem in, on the home headline's line, or is centred where that would pass the middle; beside a portrait photo it keeps to the headline's line.

The home page opens with a full-height stage: a 15rem channel sidebar beside a full-bleed photo panel, with a white highlighted post tile docked in the bottom-right corner. Below it, page sections stack as bands. The contents of the stage change with the sidebar, so the first screen behaves like a switchable channel rather than a static hero.

Card collections use auto-fitting grids that fill the available width: gallery and contact from 25rem, news from 30rem. The player roster is the exception: it is a single track that fills the row while it can and scrolls sideways when it can't, so a squad of any size never breaks into uneven rows. News rows open up with a larger 5rem gap between rows than between columns.

The main breakpoint is 768px. Below it the header gains a menu toggle and the crest, the sidebar shrinks to an icon rail over the photo panel, and the highlighted tile moves into the page flow. The league table abbreviates its headers when its card is narrower than 640px, so all six columns stay in view; it only scrolls sideways at extreme zoom.

**The Band Rule.** Bright white bands break the dark page at section level: the gallery preview, the upcoming matches and the top of the footer. Use them to change the pace, not as a background for every other section.

**The Lit Photo Rule.** Text sits directly on full-bleed photos under a flat 65% black overlay. The photo stays visible and the text stays readable; no gradient scrims or text boxes.

## Elevation & Depth

Flat, lit by state. Surfaces separate through tonal steps from Hall Black to Charcoal to Graphite, not through shadows. The only permanent shadow belongs to glass elements that sit over photos, such as the league table. The tooltip also casts a soft drop (`0 0.25rem 0.5rem`, Hall Black at 35%), but it only exists in response to touch. Glow exists only as a response to touch.

### Shadow Vocabulary
- **Glass edge** (`box-shadow: inset 0 1px 2px oklch(97.015% 0.00011 271.152 / 20%), 0 2px 4px oklch(15.907% 0.00002 271.152 / 15%), 0 4px 8px oklch(15.907% 0.00002 271.152 / 35%)`): A thin lit top edge with a soft drop, paired with a background blur (5–10px). For panels over photos only.
- **Red glow** (`box-shadow: 0px 0px 20px 0px` Crest Red): The primary button on hover.

### Named Rules
**The Flat at Rest Rule.** Nothing casts a shadow at rest unless it is glass over a photo. Cards, forms and post panels stay flat and rise by tone.

**The Glow Answers Touch Rule.** Red glow is a reaction, never a decoration. It appears on hover and leaves with the pointer.

## Shapes

Gently rounded and consistent. Photos, buttons, inputs and the league table share the same small curve (0.5rem). Larger containers step up: form cards to 0.75rem, post panels and the map to 1rem. Full-bleed photo panels and bands have square edges, because they belong to the page, not to a card.

Small marks stay crisp: the category marker is a hard square, the loader is built from four squares, and dividers are 1px dashed lines. Only the 2px active underline softens its ends slightly.

**The Square Marker Rule.** Small brand marks are squares, not dots or pills. There are no pill shapes in this system.

## Components

The feel throughout is quick and direct, like a sharp return: compact, forward-leaning and fast to respond.

### Buttons
- **Shape:** Gently rounded (0.5rem), hugging their content, with a built-in 1rem gap above.
- **Arrow:** Every button ends in a forward double arrow. It is part of the component, not an option.
- **Primary:** Crest Red with Floodlight White text. The main action on a screen.
- **Secondary:** Hall Black with white text, used on white bands and light tiles. A small size tightens the padding.
- **Ghost:** Transparent with a 2px Crest Red border and red text, filling with Deep Red on hover. Defined but currently unused. It breaks the Red Type Rule on dark, so check contrast before using it there.
- **Hover:** A fast 0.2s press-in to 95% scale. Primary also gains the red glow.
- **Focus:** A 2px Floodlight White outline, offset 2px.

### Cards / Containers
- **Player roster:** One row of small 4:5 head-and-shoulders frames in full colour, cropped to the face by the Contentful Images API, each with the name below in Thunder capitals (600, 1.5rem). The tight crop and small frames are what tie together photos with mismatched walls. Frames are at least 124px wide. Hover eases the photo to 105% over 360ms. Player details live in the tooltip, not on the page.
- **Tooltip:** A Crest Red panel with Floodlight White text, assembled from 14 vertical strips that fly in out of order, then fading in its content. It tracks the cursor on hover. Focus and tap open it beside the trigger instead, Enter and Space toggle it, and Escape closes it. Reduced motion swaps the strips for a plain fade. It is 19rem wide, never under 304px, with a 0.5rem radius. Player content is the name in Thunder over label and value rows in Geist. Labels stay full white and step down by weight, because dimmed text on Crest Red falls below 4.5:1.
- **Plain image card:** A photo with an optional Graphite title tab in the corner.
- **News card:** A 16:9 photo with a Geist title and Ash Grey metadata below. The photo eases up to 105% scale over 360ms on hover.
- **Empty image:** Missing photos fall back to a Charcoal well with a placeholder icon.
- **Corner Style:** 0.5rem on photos.
- **Post panel:** A Charcoal column with 1rem corners and 2.5rem padding, holding the article.

### Inputs / Fields
- **Style:** Graphite fill, a 1px half-transparent dark border, 0.5rem corners, Chalk text and 1rem type. Sits on a Charcoal form card with 0.75rem corners.
- **Focus:** Not implemented. The browser outline is removed and nothing replaces it.
- **Error:** Small 0.75rem medium text below the field, with no colour of its own yet.

### Navigation
- **Header:** Fixed and transparent, fading into Hall Black towards the right, and blurred at 5px on small screens. Links are uppercase Label in Ash Grey, turning Chalk on hover and when active.
- **Active underline:** A 2px Crest Red line slides between links with a slight overshoot (0.3s, `cubic-bezier(0.75, 0.2, 0.41, 1.31)`). It uses CSS anchor positioning. The team tabs reuse the same effect and the same anchor name, so check both when changing either.
- **Language picker:** A flag with the language name, opening a small dropdown.
- **Mobile:** A toggle opens a right-aligned link stack, and the crest appears on the left.

### Channel Sidebar
The home page's signature control. A column of uppercase links with icons switches what the stage shows. The selected channel gets a soft gradient and a 2px Crest Red edge on its right side, pointing at the panel it controls. Below 768px the labels hide and it becomes an icon rail.

### League Table
Smoked glass over a darkened hall photo, with Line Grey rules between cells, a title on the left and the update date on the right. Cells stay in Geist so Cyrillic team names render properly. Below a 640px card width the headers abbreviate and all six columns stay in view. The club's own row carries a flat Hall Charcoal band and a 2px Crest Red edge.

### News Stage
A full-bleed photo with a category label (Crest Red square plus underlined text), a Thunder headline, a lead paragraph and a primary button. A vertical 01 / 02 rail on the left switches stories: thin lines at rest, thickening to 3px and brightening when active. Numbers stay near-white because they sit on a photo; the line and a heavier weight mark the active one. A bare double arrow caps each end of the rail (previous, next), with no container but a full 44px target; it nudges 3px its own way on hover. Stories rotate every 8 seconds and the active line fills Crest Red as the timer. Rotation holds while the visitor hovers or tabs through the story or rail, scrolls away or opens the table, and is off under reduced motion. The photo dissolves over 360ms while only the headline block drifts 16px, the same motion as switching between News and Table. The white highlighted post tile docks in the corner as the bright counterweight.

### Link Groups
Footer and contact link lists use a spotlight effect: hovering the group dims every link to Line Grey, and the link under the pointer lifts back to Chalk. Footer navigation links also widen the gap to their arrow on hover (180ms).

## Do's and Don'ts

### Do:
- **Do** use the existing variables in `src/index.css`. The OKLCH values are the source of truth.
- **Do** keep red for what is active or actionable, following the One Light and In Play rules.
- **Do** set headlines in uppercase Thunder and everything readable in Geist.
- **Do** keep Geist for any Cyrillic or scraped data.
- **Do** use a 65% black overlay when setting text on a full-bleed photo.
- **Do** end every button with the double arrow.
- **Do** add a visible focus state to any control you build or touch; buttons, sidebar links and the league table have one, inputs and the rest do not yet.
- **Do** respect reduced-motion preferences in new motion work; the site doesn't handle this yet, including its smooth scrolling.
- **Do** design for missing images, excerpts and translations, using the Charcoal well as the fallback.

### Don't:
- **Don't** drift towards a corporate, sterile look with polish and no sport in it.
- **Don't** drift towards a playful kids' club look, even on youth content.
- **Don't** add a second accent colour or tint the neutrals.
- **Don't** use Line Grey for text.
- **Don't** put small Crest Red text on dark surfaces.
- **Don't** add shadows to surfaces at rest, or use glow as decoration.
- **Don't** use pill shapes or round dots for small marks.
- **Don't** use Body size (0.75rem) for paragraphs.
- **Don't** set unconverted Cyrillic text in Thunder.
