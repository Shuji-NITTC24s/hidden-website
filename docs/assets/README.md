logo image placement and transparency

Place your logo file at `docs/assets/logo.png` (recommended filename).

Recommended export settings for a transparent PNG:

- Export format: PNG-24 (supports full alpha transparency). Avoid PNG-8 if your logo uses semi-transparent anti-aliasing.
- Background: Transparent (no background layer).
- Size: provide at least a 2x or 3x version for retina displays. Example sizes:
  - UI logo: 88×44 px (2x of 44×22) or 132×66 px (3x)
  - Favicon / small: also provide separate 32×32 and 16×16 if needed.
- Alternative: use an SVG (`logo.svg`) for crisp scaling if your artwork is vector.

Tools:
- Adobe Photoshop: Hide or delete the background layer, then File → Export → Export As → PNG-24 with Transparency checked.
- GIMP: File → Export As → choose PNG, ensure "Save color values from transparent pixels" is checked and export with compression 0-9.
- Photopea (web): File → Export As → PNG, check Transparent.
- Inkscape (for vectors): Save as SVG, or File → Export PNG Image and choose "Export area drawing" with background transparent.

After placing `logo.png`, reload the site. If you want, upload the PNG here and I can adjust sizing or swap to an SVG for better scaling.

Gallery images

Place gallery thumbnails at the following paths to be used by the sample pages:

- `docs/assets/j.jpg` — gallery image 1
- `docs/assets/ohno.jpg` — gallery image 2

If you don't have thumbnails, you can use resized versions of your full images (recommended width ~800px) or create smaller thumbs (~400px) for faster loading.