export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  user_type: string;
};

export type Event = {
  id: number;
  comment: string;
  event_date: string;
  created_date: string;
  trainer_id: number;
  student_id: number;
};
