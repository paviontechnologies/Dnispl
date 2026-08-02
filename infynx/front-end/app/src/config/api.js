/**
 * Single place where the front-end learns the API's address, and the only place
 * that knows how an authenticated request is shaped.
 *
 * Set REACT_APP_API_URL at build time to point a deployment at its own backend;
 * the localhost default keeps `npm start` working with no extra setup.
 */
export const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:5000').replace(/\/$/, '');

/** Absolute URL for an API path. `api('/api/jobs')` → `http://host/api/jobs`. */
export const api = (path) => `${API_URL}${path.startsWith('/') ? path : `/${path}`}`;

/** Absolute URL for an uploaded file (résumés). */
export const uploadUrl = (filename) => api(`/uploads/${filename}`);

export const getToken = () => localStorage.getItem('token');
export const getRole = () => localStorage.getItem('userRole');

export const authHeaders = (extra = {}) => {
  const token = getToken();
  return token ? { Authorization: token, ...extra } : { ...extra };
};

/** Clears the session and bounces to login — used whenever the API says 401/403. */
export const signOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  window.location.href = '/admin/login';
};

/**
 * fetch for admin screens. Attaches the token, parses JSON, and turns a failed
 * response into a thrown Error carrying the server's message — so callers get
 * one `catch` instead of an `if (!res.ok)` ladder at every call site.
 *
 * An expired or rejected token signs the user out rather than leaving the page
 * sitting on an empty table with no explanation.
 */
export const authFetch = async (path, options = {}) => {
  const { body, headers, json = true, ...rest } = options;

  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
  const res = await fetch(api(path), {
    ...rest,
    headers: authHeaders({
      ...(json && !isFormData ? { 'Content-Type': 'application/json' } : {}),
      ...headers
    }),
    body: isFormData || body === undefined ? body : JSON.stringify(body)
  });

  if (res.status === 401 || res.status === 403) {
    signOut();
    throw new Error('Your session has expired. Please sign in again.');
  }

  const payload = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(payload.message || `Request failed (${res.status})`);
  return payload;
};

/** fetch for public pages — no token, same error shape. */
export const publicFetch = async (path, options = {}) => {
  const { body, headers, ...rest } = options;

  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
  const res = await fetch(api(path), {
    ...rest,
    headers: {
      ...(body !== undefined && !isFormData ? { 'Content-Type': 'application/json' } : {}),
      ...headers
    },
    body: isFormData || body === undefined ? body : JSON.stringify(body)
  });

  const payload = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(payload.message || `Request failed (${res.status})`);
  return payload;
};
