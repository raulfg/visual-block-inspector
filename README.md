# Visual Block Inspector for WordPress

**See your page structure while you edit** - Automatic visual outlines and labels for every block in the WordPress editor.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![WordPress](https://img.shields.io/badge/wordpress-5.8%2B-green.svg)
![License](https://img.shields.io/badge/license-GPL--2.0%2B-orange.svg)

---

## Why You Need This Plugin

Ever felt lost editing a complex WordPress page? Not sure which block is which? Wondering if that's a column or a group?

**Visual Block Inspector solves this instantly.**

When you activate this plugin, every block in your editor gets:
- **Color-coded outline** so you can see exactly where each block starts and ends
- **Automatic label** showing the block type (appears when you hover)
- **Smart numbering** for columns and grids
- **Visual hierarchy** so you understand parent/child relationships at a glance

**No setup. No configuration. Just activate and hover.**

---

## What You'll See

### Automatic Color Coding

**Green = Layout blocks** (containers that hold other blocks)
- Groups, Columns, Grids, Stacks, Rows

**Colors = Content blocks** (your actual content)
- Paragraphs, Images, Headings, Buttons, etc.
- Each block type gets its own unique color

**Purple = Your page title**
- Never confuse your title with content blocks again

### Smart Labels

**Hover over any block** to see:
- The exact block type (e.g., "core/paragraph", "core/image")
- For columns: numbers (1, 2, 3...) so you know which is which
- For grids: both the grid position AND what type of block it is

### Visual Hierarchy

- **Parent containers** show their label OUTSIDE (above, centered)
- **Content blocks** show their label INSIDE (top-right corner)
- Makes it crystal clear which blocks contain other blocks

---

## Installation (60 seconds)

### Method 1: WordPress Admin (Recommended)

1. **Download** the plugin ZIP file
2. Go to **WordPress Admin** → **Plugins** → **Add New**
3. Click **Upload Plugin** and choose the ZIP
4. Click **Install Now** → **Activate**
5. **That's it!** Open any page/post and hover over blocks

### Method 2: Manual Upload

1. **Download** and unzip the plugin
2. **Upload** the `visual-block-inspector` folder to `/wp-content/plugins/`
3. **Activate** from WordPress Admin → Plugins
4. **Done!** No settings to configure

---

## How to Use

### Basic Usage

1. **Edit any page or post** in WordPress
2. **Hover your mouse** over any block
3. **See the magic:**
   - Colored outline shows the block boundary
   - Label appears with the block name
   - Numbers appear on columns/grids

### Tips for Best Results

- **Find container blocks fast** - Look for green outlines
- **Count your columns** - Hover over a Columns block to see numbers (1, 2, 3...)
- **Understand nesting** - Labels outside = parent, labels inside = child
- **Spot your title** - Purple outline shows the page/post title
- **See what's what** - Each content block type has a unique color

---

## Frequently Asked Questions

### Will this change how my website looks to visitors?

**No!** The plugin only works in the WordPress editor. Your actual website looks exactly the same to visitors.

### Do I need to configure anything?

**Nope!** Just activate the plugin and start editing. Everything works automatically.

### Does it slow down the editor?

**Not at all.** The plugin is super lightweight (only 12KB) and uses modern browser features for smooth performance.

### Can I change the colors?

**Yes!** If you know CSS, you can customize the colors in the plugin's CSS file. But the default colors work great for most users.

### Does it work with page builders like Elementor?

**No.** This plugin is specifically designed for the native WordPress Block Editor (Gutenberg). It won't work with third-party page builders.

### What if I use the Classic Editor?

This plugin only works with the Block Editor (Gutenberg). If you're still using the Classic Editor, this plugin won't do anything.

### Does it work on mobile/tablet?

The plugin works in the WordPress editor on any device. However, the hover effects work best with a mouse. On touch devices, you may need to tap blocks to see labels.

### Can I use it on client sites?

**Absolutely!** The plugin is free and GPL-licensed. Use it on as many sites as you want, including client projects.

---

## Who Is This For?

### Perfect for:

- **WordPress developers** building complex layouts
- **Designers** who need to understand block structure
- **Content creators** working with nested blocks
- **Site builders** managing columns and grids
- **Beginners** learning how the Block Editor works
- **Anyone** who's ever been confused editing a WordPress page

### Especially Useful When:

- Working with multi-column layouts
- Building complex nested structures
- Learning the WordPress Block Editor
- Taking over someone else's site
- Teaching WordPress to clients
- Debugging layout issues
- Understanding existing page structures

---

## Technical Requirements

### Minimum Requirements

- **WordPress:** Version 5.8 or higher
- **PHP:** Version 7.4 or higher
- **Browser:** Chrome 111+, Firefox 113+, or Safari 16.4+

### Works With

- WordPress Block Editor (Gutenberg)
- Full Site Editing
- Post Editor
- Page Editor
- Template Editor
- Pattern Editor

### Does NOT Work With

- Classic Editor
- Page builders (Elementor, Divi, etc.)
- Frontend editing

---

## Color System Explained

### Why Different Colors?

**Green shades** = "This is a container"
- Helps you spot groups, columns, and layout blocks instantly

**Unique colors** = "Each content type is different"
- Paragraphs get one color, images another, buttons another, etc.
- Makes it easy to scan your page structure

**Purple** = "This is the title"
- Your page/post title is special, so it gets a special color

### The Colors Are Smart

The plugin automatically assigns colors when you first use a block type. Once assigned, that block type keeps the same color throughout your editing session, so you can learn to recognize blocks by color.

---

## Troubleshooting

### I don't see any outlines

**Try these steps:**
1. Make sure the plugin is **activated** (WordPress Admin → Plugins)
2. **Refresh** the page (Ctrl+R or Cmd+R)
3. Try a **hard refresh** (Ctrl+Shift+R or Cmd+Shift+R)
4. Check you're in the **Block Editor** (not Classic Editor)

### The labels don't appear when I hover

**Check your browser version:**
- Update to Chrome 111+, Firefox 113+, or Safari 16.4+
- Older browsers don't support the modern CSS needed

### Some blocks don't show outlines

The plugin automatically detects all standard WordPress blocks. If a custom block from another plugin doesn't show up, that plugin might be using non-standard markup.

### Can I turn it off temporarily?

Yes! Just **deactivate** the plugin from WordPress Admin → Plugins. You can reactivate it anytime.

---

## Support & Feedback

### Need Help?

- Read this guide carefully
- Found a bug? [Report it on GitHub](https://github.com/yourusername/visual-block-inspector/issues)
- Have an idea? [Suggest a feature](https://github.com/yourusername/visual-block-inspector/issues)

### Love the Plugin?

- Rate it on WordPress.org
- Tell other WordPress users
- Contribute on GitHub

---

## Privacy & Security

**100% Privacy-Friendly:**
- No tracking
- No external calls
- No data collection
- Works entirely in your browser
- Never sends anything to external servers

**Safe & Secure:**
- Clean, well-documented code
- Regular updates
- Follows WordPress coding standards
- GPL licensed

---

## License

**GPL v2 or later** - Free to use on unlimited sites.

Full license: https://www.gnu.org/licenses/gpl-2.0.html

---

## Developer

**Created by Raúl Fernández**
Website: [https://clink.es](https://clink.es)

---

## Version History

### Version 1.0.0

Initial release with basic functionality.

---

## Why This Plugin Is Different

Most developer tools require technical knowledge. **This plugin just works.**

- **No configuration** - Activate and go
- **No learning curve** - Hover and see
- **No clutter** - Only appears when you hover
- **No slowdown** - Lightning fast
- **No cost** - Completely free

**It's like X-ray vision for your WordPress pages.**

---

**Try it today and never get lost in your WordPress editor again!**

*Made with love for the WordPress community*
