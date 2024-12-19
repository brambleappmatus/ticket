export interface ApiSettings {
  instanceUrl: string;
  apiKey: string;
}

export interface TicketFormData {
  parentTicket: string;
  category: string;
  status: string;
  title: string;
  description: string;
}