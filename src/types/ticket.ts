export interface TicketPayload {
  parentTicket?: string;
  title: string;
  description?: string;
  category: string;
  status?: string;
  stage: 'OPEN';
  priority: 'LOW';
}

export interface ApiResponse {
  // Add specific response type here when known
  [key: string]: any;
}