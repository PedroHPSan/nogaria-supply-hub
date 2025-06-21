

// Default category image with Nogaria logo and brand gradient
export const DEFAULT_CATEGORY_IMAGE = '/lovable-uploads/722fe65d-b32a-419e-b146-1ffeff62ad00.png';

// Fallback function to get default image when category image is missing
export const getCategoryImage = (categoryImageUrl?: string | null): string => {
  return categoryImageUrl || DEFAULT_CATEGORY_IMAGE;
};

