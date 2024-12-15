export type Campaign = {
  name: string;
  id: string;
  description: string;
  contribution: string;
  status: string;
};

export type Goal = {
  name: string;
  id: string;
  description: string;
  status: string;
  campaign_id: string;
  target_date: string;
};

// Define types for the campaign with goals
export interface CampaignWithGoals extends Campaign {
  goals: Goal[];
}
