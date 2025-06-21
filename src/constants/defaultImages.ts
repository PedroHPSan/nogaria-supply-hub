
// Default category image with Nogaria logo and brand gradient
export const DEFAULT_CATEGORY_IMAGE = '/lovable-uploads/c2c5b513-85fc-45df-9a20-a708929d19d3.png';

// Fallback function to get default image when category image is missing
export const getCategoryImage = (categoryImageUrl?: string | null): string => {
  return categoryImageUrl || DEFAULT_CATEGORY_IMAGE;
};
