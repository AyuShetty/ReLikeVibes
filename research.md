# Interaction Research Notes

> These references are used to extract interaction principles, not to reproduce any composition, code, asset, or signature transition.

| Source | Interaction primitive | User action | Perceived effect | Transferable principle | Original adaptation | Risk / fallback |
| --- | --- | --- | --- | --- | --- | --- |
| [Codrops — *More Than a Portfolio*](https://tympanus.net/codrops/2026/04/28/more-than-a-portfolio-building-a-scroll-driven-3d-world-with-something-to-say/) | Scroll-orchestrated camera space with GSAP Observer and ScrollTrigger; restrained shader overlay | Scroll via mouse, touch, or trackpad; hover/click for menu expansion | A continuous camera take rather than disconnected page sections | Treat scroll as a single choreography layer and use organic motion only where it conveys state | One HTML/canvas “signal field” will evolve into audience, process nodes, data points, and clusters without WebGL dependence | Avoid turning decorative effects into page structure; offer static DOM narrative and reduced particle density |
| [Shorthand — *Scrollytelling examples*](https://shorthand.com/the-craft/scrollytelling-examples/index.html) | Scroll-revealed text, maps, workflow diagrams, and contextual data visuals | Natural document scrolling | Progressive disclosure preserves narrative orientation while explaining complex information | Reveal the smallest amount of information needed for each beat, then let visuals make the next question legible | Use chapter labels, tightly paced large type, and explicitly labelled illustrative dashboard states instead of opaque visual spectacle | Avoid scroll-jacking; keep all text content reachable with ordinary scrolling and keyboard navigation |
| [The Pudding — *Making Internet Things, part 3: Storytelling*](https://pudding.cool/process/how-to-make-dope-shit-part-3/) | Question-led visual essay and explanatory data graphics | Progress through a linear editorial narrative | Complex ideas become tractable when anchored by a narrow question or an individual data point | Give every visual an explicit narrative question and show it progressively instead of presenting dashboard miscellany | The question sequence—“What should we publish?” through “Can we predict what will work?”—will turn the analytics chapter into a changing point of view | Avoid data theatre and invented results; use visual datasets only as clearly labelled illustrative visualization |

## Interim synthesis

The portfolio will use **one continuous, canvas-assisted visual vocabulary** rather than an assortment of unrelated animation demos. Scroll progress moves a single field through meaningful states—signal, audience, content operation, analytic field, experimentation, system—while large editorial typography names the conceptual shift. The central analytic pivot is question-led, so data visualizations exist to answer an evolving inquiry rather than simulate a dashboard. Ordinary semantic content remains in the DOM, and all high-cost ambience has a reduced-motion and mobile simplification.

## Technique decisions

| Adopt | Reason | Intentionally reject |
| --- | --- | --- |
| GSAP ScrollTrigger for pinned chapter timelines | Maps natural scroll to a controlled sequence and keeps cross-section transitions coordinated | Full-page scroll hijacking; native scrolling remains authoritative |
| Canvas for the signal field | Provides a responsive, low-weight visual language that can mutate between narrative states | WebGL, because genuine 3D depth is not essential to the story |
| Framer Motion for local feedback and interactive reveals | Offers small, interruptible component-state motion | A global animation controller or arbitrary entrance animations |
| CSS texture, masks, and restrained transforms | Adds materiality without blocking the semantic experience | Always-moving parallax, noisy cursor trails, and decorative neon glow |
