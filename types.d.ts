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
};

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
