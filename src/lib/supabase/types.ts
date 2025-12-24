export type Profile = {
  id: string;
  email: string;
  name: string | null;
  role: string | null;
  created_at: string | null;
};

export type Coach = {
  id: string;
  profile_id: string;
  status: string | null;
  created_at: string | null;
  profile?: Profile;
};

export type Plan = {
  id: string;
  name: string;
  price: number;
  currency: string;
  billing_period: string | null;
  features: string[];
  is_featured: boolean | null;
  created_at: string | null;
};

export type Client = {
  id: string;
  profile_id: string;
  coach_id: string | null;
  plan_id: string | null;
  status: string | null;
  created_at: string | null;
  profile?: Profile;
  coach?: Coach;
  plan?: Plan;
};

export type Payment = {
  id: string;
  client_id: string;
  coach_id: string | null;
  amount: number;
  currency: string;
  method: string | null;
  status: string | null;
  paid_at: string | null;
  created_at: string | null;
  client?: Client;
  coach?: Coach;
};

export type Event = {
  id: string;
  name: string;
  date: string;
  location: string | null;
  slots: string | null;
  created_at: string | null;
};

