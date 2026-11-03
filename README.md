# AUREL — The Art of Shopping

A premium, responsive multi-category storefront concept built with HTML, CSS and vanilla JavaScript.

## Run locally
1. Download or clone this repository.
2. Open `index.html` in your browser.
3. For the best local development experience, use VS Code with the Live Server extension.

## Publish with GitHub Pages
1. Create a new public GitHub repository named `aurel-store` (or your preferred name).
2. Upload the contents of this folder — upload `index.html`, `assets/`, and this README at the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then Save.
6. Wait for GitHub Pages to publish your site. Your URL will look like:
   `https://YOUR-USERNAME.github.io/aurel-store/`

## What's included
- Custom AUREL wordmark and geometric brand mark (inline SVG)
- Responsive editorial storefront and animated hero
- Product catalogue with category filters, search and sorting
- Product quick-view modal
- Working cart with quantity controls and localStorage persistence
- Wishlist toggle and saved count
- Newsletter interaction (front-end demo)
- Checkout preview state
- Scroll reveal and reduced-motion support

## Important: demo vs production
This is a front-end storefront. Product data is sample content and images are loaded from Unsplash. Cart and wishlist persist in the visitor's browser using localStorage.

The checkout button is intentionally a preview. **No real payment is collected and no order is submitted.** Before accepting customers, connect a secure backend and a payment provider such as Paystack or Flutterwave, configure shipping, inventory, tax, order notifications and privacy/returns policies. Never put payment secret keys in browser JavaScript.

## Editing products
Open `assets/app.js` and edit the `products` array near the top. Each product has:
- `id`
- `name`
- `category` (`fashion`, `tech`, `living`, or `accessories`)
- `type`
- `price` (number in NGN)
- `tag`
- `image` (image URL)
- `desc`

## Brand direction
AUREL is a fictional concept brand created for this design challenge. Replace the brand name, product catalogue, prices, contact details and policies with verified business information before launch.
