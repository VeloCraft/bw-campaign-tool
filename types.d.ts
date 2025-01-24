/*
 * Navigation items used in the AppWrapper component
 */

type NavLink = {
  label: string;
  href: string;
  active?: (pathname: string) => boolean;
};

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
  displayName?: string;
  photoURL?: string;
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
  status?: 'active' | 'inactive';
  contribution?: string;
  goals?: Goal[];
  userId: string;
  updatedAt?: Date;
  createdAt: Date;
  contacts: string[];
};

/*
 * TODO: Description here
 */
type Goal = {
  id: string;
  name: string;
  description?: string;
  status?: 'active' | 'complete';
  campaignId: string;
  createdAt: Date;
  updatedAt?: Date;
};

type Action = {
  id: string;
  action?: string;
  createdAt?: Date;
  updatedAt?: Date;
  dateSet?: Date;
  status?: 'pending' | 'inprogress' | 'complete';
  campaignId?: string;
  userId?: string;
  assigneeId?: string;
  assigneeEmail?: string;
  media?: Media | null;
};

type Media = {
  asset_id: string; // Unique identifier for the media in Cloudinary
  version: number;
  public_id: string; // Unique identifier for the media in Cloudinary
  type: 'upload';
  asset_folder: string; // Folder in which the media is stored in Cloudinary
  original_filename?: string; // Original name of the uploaded file
  display_name?: string; // Name of the media file
  url: string; // URL to access the uploaded media
  secure_url: string; // URL to access the uploaded media
  resource_type: 'image' | 'raw'; // Type of resource
  width?: number; // Media width (for images/videos)
  height?: number; // Media height (for images/videos)
  format?: string; // File format, e.g., jpg, mp4
  bytes?: number; // File size in bytes
  created_at?: string; // Upload timestamp
  //[key: string]: any; // Allow for additional properties returned by Cloudinary
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
  description?: string;
};

type Contact = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  organisation: string;
  role: string;
  createdAt: Date;
};

type Status = {
  message: string;
  variant: 'info' | 'success' | 'error';
  duration?: number;
};

type RouteReport = {
  userId: string;
  hazardous?: boolean;
  level?: number;
};

type Route = {
  id?: string;
  summary: string;
  path: string;
  distance: string;
  position: google.maps.LatLngLiteral;
  nearestStations: [string, string];
  stationWeight: number;
  level?: number;
  hazardous?: boolean;
  updatedAt?: DateType;
  reports?: RouteReport[];
};

type RootRoutes = {
  updateAt: DateType;
  [id: string]: Omit<Route, 'id'>;
};

type Station = {
  id: string;
  locationName: string;
  riverName: string;
  updatedAt: DateType;
  position: google.maps.LatLngLiteral;
  levels: number[];
  timestamps: string[];
};

type RouteStatus = 'clear' | 'hazardous' | 'flooded';
type FilterValue = 'all' | RouteStatus | 'reports' | 'noReports';

type LocalReport = {
  level?: number;
  hazardous?: boolean;
  timestamp: string;
};

type LocalReports = {
  [id: string]: LocalReport;
};

type Role = 'admin' | 'editor';

/*
 * Global app settings saved at 'app/{docId}')
 * in Firestore including a list of
 * authorised users allowed to edit
 * campaign documents, and a definition of roles and permissions
 */
type AppRoles = Partial<{
  [role: Role]: string[];
}>;

type AppPermissions = Partial<{
  [role: Role]: string[];
}>;

/*
 * Form submission and value types
 */
type FormSubmission = { [k: string]: FormDataEntryValue };
type FormValues = { [k: string]: any };
