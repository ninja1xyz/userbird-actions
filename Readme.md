# UserBird Actions

A lightweight, draggable toolbar widget for UserBird, built with Vite.

## Features

- Embeds a floating toolbar on your site
- Authenticates via URL hash token or postMessage
- Links to your UserBird dashboard
- Customizable for different environments (staging/production)
- Easy to integrate as a library

## Project Structure

```
.env
.gitignore
package.json
README.md
test.html
vite.config.js
src/
  index.js
  assets/
    logoRender.js
  config/
    config.js
```

## Getting Started

### Development

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Build for production:**
   ```sh
   npm run build
   ```

### Usage

#### In HTML (UMD build) (Prefered)

Add this to your HTML (in the `<head>` or before `</body>`):

```html
<script src="./dist/userbird-toolbar.umd.js"></script>
<script>
  const { UserBirdToolbar } = window.UserBirdToolbar;
  const birdToolbar = new UserBirdToolbar();
  birdToolbar.bindEvent(this.window); // Listen for authentication messages
</script>
```

- Use `bindEvent(window)` to enable authentication via `postMessage`.
- The toolbar will initialize when it receives the required credentials.


## Configuration

Edit [`src/config/config.js`](src/config/config.js) to set environment, API URLs, and domain.

You can also use a `.env` file to override Vite environment variables for local development.

## How It Works

- The toolbar authenticates using a token from the URL hash or via a `postMessage` event.
- On successful authentication, it fetches the user profile and displays a draggable toolbar with a link to your UserBird dashboard.
- The toolbar is styled and can be moved around the page.


## Issues

Report bugs or request features at [https://github.com/ninja1xyz/userbird-actions/issues](https://github.com/ninja1xyz/userbird-actions/issues)