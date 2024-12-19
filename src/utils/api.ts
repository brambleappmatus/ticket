import { TicketPayload, ApiResponse } from '../types/ticket';

const API_URL = 'https://mstanotest.daktela.com/api/v6/tickets.json';
const ACCESS_TOKEN = 'ffc90793e8738b0e648da603985c5f334cc4caf5';

export async function createTicket(payload: TicketPayload): Promise<ApiResponse> {
  try {
    const response = await fetch(
      `${API_URL}?_method=POST&accessToken=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create ticket: ${error.message}`);
    }
    throw new Error('An unexpected error occurred');
  }
}