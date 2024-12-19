import { getApiConfig } from '../config/api';

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

export async function fetchClient(endpoint: string, options: FetchOptions = {}) {
  const config = getApiConfig();
  const { params = {}, ...fetchOptions } = options;
  
  // Build the URL with the instance
  const baseUrl = `https://${config.INSTANCE_URL}/api/v6`;
  
  // Add access token to params
  const queryParams = new URLSearchParams({
    accessToken: config.ACCESS_TOKEN,
    ...params
  });
  
  const url = `${baseUrl}${endpoint}?${queryParams}`;

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...fetchOptions.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      if (errorData?.error?.form) {
        const formErrors = Object.entries(errorData.error.form)
          .map(([field, message]) => `${field}: ${message}`)
          .join(', ');
        throw new Error(`Validation error: ${formErrors}`);
      }
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
}