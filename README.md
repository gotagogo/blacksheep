# Black Sheep GitHub Pages Website

Domain: www.blacksheep.co.nz

This is a static website designed for GitHub Pages.

## Features

- Front page item listing
- Individual item pages via `item.html?id=...`
- Brand, summary, size, gender, condition and price fields
- Multiple image upload in the admin page
- Add, edit and delete items in the browser
- Export/import item JSON backup

## Important limitation

GitHub Pages is static hosting only. It cannot run a real server-side admin login, database, or persistent image upload.

This version stores admin changes in the browser's `localStorage`. That means edits are visible on the same browser/device only unless you export the JSON and integrate it into the site manually or move to a backend service later.

Default demo login:

- Username: `admin`
- Password: `change-me-now`

Do not treat this as secure authentication. It is only a simple gate for local editing.

## Deploy to GitHub Pages

1. Create a GitHub repository, for example `blacksheep`.
2. Upload all files in this folder to the repository root.
3. Go to **Settings → Pages**.
4. Source: **Deploy from a branch**.
5. Branch: `main`, folder: `/root`.
6. Add a `CNAME` file containing `www.blacksheep.co.nz` if using a custom domain.
7. In your domain DNS, create a CNAME record:
   - Host: `www`
   - Value: `<your-github-username>.github.io`

## Upgrade path for real admin/database

For true login, shared admin changes, and real image uploads, use a backend such as Supabase, Firebase, Cloudflare Pages Functions, Netlify Functions, or a small VPS Flask/Node app.
