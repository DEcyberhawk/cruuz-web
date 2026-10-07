// Invitation secrets stay in the URL fragment and component memory, never query strings.
export function invitationToken(value: string): string {
  const token = value.trim();
  if (!/^[a-f0-9]{64}$/.test(token)) throw new Error("This invitation link is incomplete or invalid. Ask your company administrator for a new link.");
  return token;
}

export function invitationLink(origin: string, token: string): string {
  const url = new URL("/business/invitation", origin);
  if (url.protocol !== "https:" && !(url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname))) {
    throw new Error("Invitation links require a secure website.");
  }
  url.hash = new URLSearchParams({token: invitationToken(token)}).toString();
  return url.toString();
}

export function tokenFromFragment(fragment: string): string {
  const params = new URLSearchParams(fragment.replace(/^#/, ""));
  if (params.getAll("token").length !== 1) throw new Error("Open the complete invitation link supplied by your company administrator.");
  return invitationToken(params.get("token") || "");
}

type Envelope = {
  success?: boolean; message?: string; error?: {message?: string};
  accessToken?: string; mfaRequired?: boolean; mustChangePassword?: boolean;
  data?: {membership?: {id?: string; status?: string}};
};

async function responseBody(response: Response): Promise<Envelope> {
  try { return await response.json() as Envelope; }
  catch { throw new Error("The server returned an unreadable response. Check your membership before trying again."); }
}

export async function acceptInvitationWithPassword(
  input: {apiUrl: string; token: string; email: string; password: string},
  request: typeof fetch = fetch,
): Promise<string> {
  const token = invitationToken(input.token);
  const email = input.email.trim().toLowerCase();
  if (!email || !input.password) throw new Error("Enter the invited email and your existing CRUUZ password.");
  if (!input.apiUrl) throw new Error("CRUUZ Business authentication is not configured.");
  const api = new URL(input.apiUrl);
  if (api.protocol !== "https:" && !(api.protocol === "http:" && ["localhost", "127.0.0.1"].includes(api.hostname))) throw new Error("Authentication requires a secure API.");
  const base = input.apiUrl.replace(/\/+$/, "");
  const login = await request(`${base}/auth/login`, {
    method: "POST", cache: "no-store", redirect: "error",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({identifier: email, password: input.password}),
  });
  const auth = await responseBody(login);
  if (!login.ok || auth.success === false) throw new Error(auth.message || "Sign-in failed. Check your email and password.");
  if (auth.mfaRequired) throw new Error("This account requires MFA. Invitation acceptance with MFA is not available here yet; contact your company administrator.");
  if (auth.mustChangePassword) throw new Error("Set your CRUUZ password using your account setup link before accepting this invitation.");
  if (!auth.accessToken) throw new Error("Sign-in returned no access token. The invitation has not been accepted.");
  let response: Response;
  try {
    response = await request(`${base}/business-accounts/member-invitations/accept`, {
      method: "POST", cache: "no-store", redirect: "error",
      headers: {"Content-Type": "application/json", Authorization: `Bearer ${auth.accessToken}`},
      body: JSON.stringify({token}),
    });
  } catch {
    throw new Error("The acceptance result could not be confirmed. Try signing in to the Business dashboard to check your membership before retrying.");
  }
  const result = await responseBody(response);
  if (!response.ok || result.success === false) throw new Error(result.error?.message || result.message || "The invitation could not be accepted.");
  if (!result.data?.membership?.id || result.data.membership.status !== "ACTIVE") throw new Error("The server did not confirm an active membership. Check your Business dashboard before retrying.");
  return auth.accessToken;
}
