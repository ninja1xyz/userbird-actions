# UserBird Actions

UserBird's light-weight draggable toolbar widget for UserBird, built with Vite.

## Features

- Embeds a floating toolbar on your site
- Authenticates via URL hash token
- Links to your UserBird dashboard
- Easy to integrate as a library

## Project Structure

```
index.html
package.json
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

2. **Run locally:**
   ```sh
   npm run dev
   ```

3. **Build for production:**
   ```sh
   npm run build
   ```

### Usage

You can use the toolbar as a module in your project:

```js
import { UserBirdToolbar } from './dist/userbird-toolbar.es.js';

const toolbar = new UserBirdToolbar({
  siteId: 'your-site-id',
  workspaceId: 'your-workspace-id'
});

toolbar.init();
```

Or, include it directly in your HTML:

```html
<script src="https://your-cdn.com/userbird-toolbar.umd.js"/>
<script type="module">
  const UserBirdToolbar = window.UserBirdToolbar
  const toolbar = new UserBirdToolbar({
    siteId: 'site123',
    workspaceId: 'workspace456'
  });
  toolbar.init();
</script>
```

### Configuration

Edit [`src/config/config.js`](src/config/config.js) to set environment, API URLs, and domain.

## License

[ISC](LICENSE)

## Issues

Report bugs or request features