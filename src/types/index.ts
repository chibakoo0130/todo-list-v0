export type User = {
  uid: string;
  photo: string;
  displayName: string;
};
export type Project = {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
  updated_at?: string;
};

export type Todo = {
  id: string;
  project_id: string;
  user_id: string;
  title: string;
  status: number;
  created_at: string;
  updated_at?: string;
};
