/**
 * Add Cloudinary auto-optimization transforms to image URLs.
 * Adds f_auto (format), q_auto (quality) for smaller file sizes.
 * Only transforms Cloudinary URLs — returns others unchanged.
 */
export function optimizeCloudinaryUrl(url, width) {
  if (!url || !url.includes("res.cloudinary.com")) return url;

  const transforms = ["f_auto", "q_auto"];
  if (width) transforms.push(`w_${width}`);

  // Insert transforms after /upload/
  return url.replace("/upload/", `/upload/${transforms.join(",")}/`);
}
