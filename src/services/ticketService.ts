import { fetchClient } from '../utils/fetchClient';
import { TicketPayload, ApiResponse } from '../types/ticket';
import { formatCategoryId } from '../utils/categoryUtils';

export async function createTicket(payload: TicketPayload): Promise<ApiResponse> {
  // Validate required fields
  if (!payload.title?.trim()) {
    throw new Error('Title is required');
  }
  if (!payload.category?.trim()) {
    throw new Error('Category is required');
  }

  // Format the category ID properly
  const formattedPayload = {
    ...payload,
    category: formatCategoryId(payload.category)
  };

  // Clean up payload by removing undefined/empty values
  const cleanPayload = Object.fromEntries(
    Object.entries(formattedPayload).filter(([_, value]) => value != null && value !== '')
  );

  return fetchClient('/tickets.json', {
    method: 'POST',
    body: JSON.stringify(cleanPayload),
  });
}