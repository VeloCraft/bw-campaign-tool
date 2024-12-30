/*
 * Breadcrumbs used in the AppWrapper component
 */

type Breadcrumb = {
  label: string;
  href?: string;
};

/*
 * The user type returned from Firebase Auth
 */

type User = {
  id: string;
  email: string;
  roles: string[];
  displayName: string;
  photoURL: string;
  avatar?: string;
};

/*
 * A status message to display to the user
 */
type Status = {
  message: string;
  variant: 'info' | 'error' | 'success';
  duration?: number;
};

/*
 * TODO: Description here
 */
type Campaign = {
  id: string;
  name: string;
  description?: string;
  status?: string;
  contribution?: string;
  goals?: Goal[];
};

type CampaignDetails = {
  name?: string;
  id?: string;
}

/*
 * TODO: Description here
 */
type Goal = {
  id: string;
  name: string;
  description?: string;
  status?: string;
  campaignId: string;
  campaignName: string;
};

type Action = {
  id: string;
  action?: string;
  creadtedAt?: string;
  campaign?: {
    id?: string;
    name?: string;
  };
  user?: {
    id?: string;
    name?: string | null;
    email?: string;
  };
  media: MediaRecord;
};

type MediaRecord = {
  id: string;
  notification_type: string; // assuming it's always "upload"
  original_filename: string;
  display_name: string;
  bytes: number;
  pages?: number;
  placeholder?: boolean;
  public_id: string;
  request_id: string;
  resource_type: string; // assuming it's always "image"
  secure_url?: string;
  signature_key?: string;
  tags?: string[];
  timestamp: string; // ISO 8601 date string
  type: string; // assuming it's always "upload"
  url?: string;
  version?: number;
  version_id?: string;
  width?: number;
}

/*
 * Global app settings saved at 'app/{docId}')
 * in Firestore including a list of
 * authorised users allowed to edit
 * campaign documents, and a definition of roles and permissions
 */
type AppRoles = Partial<{
  [role: string]: string[];
}>;

type AppPermissions = Partial<{
  [role: string]: string[];
}>;

/*
 * Form submission and value types
 */
type FormSubmission = { [k: string]: FormDataEntryValue };
type FormValues = { [k: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any
