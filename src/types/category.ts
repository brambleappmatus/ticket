export interface Category {
  id: string;
  category_id: string;
  name: string;
}

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}