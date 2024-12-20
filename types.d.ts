/*
 * The user type returned from Firebase Auth
 */

type User = {
  id: string;
  email: string;
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
  goals?: Goal[]
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

/*
 * Global app settings saved at 'app/root')
 * in Firestore including a list of
 * authorised users allowed to edit
 * campaign documents
 */
type App = {
  users: string[];
};

/*
 * Form submission and value types
 */
type FormSubmission = { [k: string]: FormDataEntryValue };
type FormValues = { [k: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any
