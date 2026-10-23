// Shown when an image file is missing, so the layout never breaks.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
<rect width="400" height="400" fill="#f1ecff"/>
<g fill="none" stroke="#6335e8" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity=".55">
<rect x="130" y="140" width="140" height="120" rx="14"/><circle cx="170" cy="185" r="14"/><path d="M135 250l55-50 40 35 40-30"/></g></svg>`;

export const PLACEHOLDER_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

export function handleImageError(event) {
  event.currentTarget.onerror = null; // avoid an infinite loop
  event.currentTarget.src = PLACEHOLDER_IMAGE;
}
