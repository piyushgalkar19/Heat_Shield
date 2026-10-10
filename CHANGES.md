# Changes in v9.1

- Crash fixed: if the weather request failed but the air-quality request worked, scoring threw an error.
- Live data for Ranchi, Shillong, Shimla, Thiruvananthapuram and Visakhapatnam was never loaded (only the first 33 of 38 cities were requested).
- Heat duration no longer freezes at the first forecast after a refresh.
- Missing ground temperature or humidity values no longer lower the score; the modelled value is used instead.
- Every district now loads from `public/districts.json`. The old fallback tried to download a 78 MB file from jsDelivr, which is over its 20 MB limit.
- Bad source rows are dropped (8 districts with one- or two-letter names, one stray island polygon). Names are shown in title case.
- Live weather is requested in spaced batches (inside Open-Meteo's 600 points a minute), retried once, and cached for 30 minutes. A failed request is no longer reported as "Live data".
- Typing in a search box is no longer wiped, and focus is no longer stolen, when live data arrives.
- Home page auto-rotation stops once you pick a city or click the search box.
- Cooling-option markers now appear the first time a zone is selected; a failed lookup says so instead of "none found"; a second server is tried.
- Click handlers on the map are registered once, not again after every base-map switch.
- Safari's history.replaceState limit no longer breaks the sliders. Escape now zooms back out like the Close button.
- Direct links to district zones open the right zone. Single toast timer. Added vercel.json and public/_redirects so links work after a reload on Vercel or Netlify.
