export interface Status {
  id: string;
  status_id: string;
  name: string;
}

export interface StatusState {
  statuses: Status[];
  loading: boolean;
  error: string | null;
}