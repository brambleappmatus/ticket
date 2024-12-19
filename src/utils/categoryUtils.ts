// Format category ID for API requests
export function formatCategoryId(id: string): string {
  // Remove prefix if it exists to avoid double-prefixing
  const rawId = id.replace('categories_', '');
  return `categories_${rawId}`;
}

// Extract raw ID from formatted category ID
export function getRawCategoryId(formattedId: string): string {
  return formattedId.replace('categories_', '');
}