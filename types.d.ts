type User = {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
  avatar?: string;
};

type Status = {
  message: string;
  variant: 'info' | 'error' | 'success';
  duration?: number;
};

type Campaign = {
  id: string;
  name: string;
  description?: string;
  status?: string;
  contribution?: string;
};

type Goal = {
  id: string;
  name: string;
  description?: string;
  status?: string;
  campaignId: string;
  campaignName: string;
  targetDate: Date;
};
