import React from 'react';
import { Send } from 'lucide-react';
import { createTicket } from '../services/ticketService';

const DEFAULT_TICKET = {
  parentTicket: "110",
  title: "testNew",
  category: "categories_56cb1be0b1393068423655",
  stage: "OPEN",
  priority: "LOW"
} as const;

export function CreateTicketButton() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      await createTicket(DEFAULT_TICKET);
      setSuccess(true);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create ticket';
      console.error('Error creating ticket:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`
          flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white 
          font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-200 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        <Send size={20} className={isLoading ? 'animate-spin' : ''} />
        {isLoading ? 'Creating...' : 'Create Ticket'}
      </button>
      
      {error && (
        <div className="text-red-500 text-sm mt-2 p-3 bg-red-50 rounded-lg border border-red-200">
          {error}
        </div>
      )}
      
      {success && (
        <div className="text-green-500 text-sm mt-2 p-3 bg-green-50 rounded-lg border border-green-200">
          Ticket created successfully!
        </div>
      )}
    </div>
  );
}