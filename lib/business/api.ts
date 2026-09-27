import type {
  ApiEnvelope,
  BusinessContext,
  BusinessCostCentre,
  BusinessDepartment,
  BusinessInvitation,
  BusinessMember,
  CostCentreInput,
  DepartmentInput,
  InvitationInput,
} from "./types";

const API_URL =
  process.env.NEXT_PUBLIC_CRUUZ_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:3002";

const ACCESS_TOKEN_KEY = "cruuz_business_access_token";
const ACCOUNT_KEY = "cruuz_business_account";
const MEMBERSHIP_KEY = "cruuz_business_membership";

export class BusinessApiError extends Error {
  status: number;
  code?: string;

  constructor(
    message: string,
    status: number,
    code?: string
  ) {
    super(message);
    this.name = "BusinessApiError";
    this.status = status;
    this.code = code;
  }
}

function canUseBrowserStorage() {
  return typeof window !== "undefined";
}

export function getBusinessAccessToken() {
  if (!canUseBrowserStorage()) {
    return null;
  }

  return (
    window.sessionStorage.getItem(ACCESS_TOKEN_KEY) ||
    window.localStorage.getItem(ACCESS_TOKEN_KEY)
  );
}

export function clearBusinessSession() {
  if (!canUseBrowserStorage()) {
    return;
  }

  for (const key of [
    ACCESS_TOKEN_KEY,
    ACCOUNT_KEY,
    MEMBERSHIP_KEY,
  ]) {
    window.sessionStorage.removeItem(key);
    window.localStorage.removeItem(key);
  }
}

async function readResponse(
  response: Response
): Promise<ApiEnvelope<unknown> | null> {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as ApiEnvelope<unknown>;
  } catch {
    throw new BusinessApiError(
      "The CRUUZ API returned an invalid response.",
      response.status
    );
  }
}

function getErrorMessage(
  payload: ApiEnvelope<unknown> | null,
  fallback: string
) {
  return (
    payload?.error?.message ||
    payload?.message ||
    fallback
  );
}

async function businessRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getBusinessAccessToken();

  if (!token) {
    throw new BusinessApiError(
      "Your CRUUZ Business session has expired. Please sign in again.",
      401,
      "BUSINESS_SESSION_REQUIRED"
    );
  }

  const headers = new Headers(options.headers);

  headers.set("Accept", "application/json");
  headers.set("Authorization", `Bearer ${token}`);

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  const payload = await readResponse(response);

  if (!response.ok) {
    if (response.status === 401) {
      clearBusinessSession();
    }

    throw new BusinessApiError(
      getErrorMessage(
        payload,
        "The CRUUZ Business request could not be completed."
      ),
      response.status,
      payload?.error?.code
    );
  }

  return (payload?.data ?? payload) as T;
}

function extractArray<T>(
  payload: unknown,
  keys: string[]
): T[] {
  if (Array.isArray(payload)) {
    return payload as T[];
  }

  if (
    !payload ||
    typeof payload !== "object"
  ) {
    return [];
  }

  const record = payload as Record<string, unknown>;

  for (const key of keys) {
    if (Array.isArray(record[key])) {
      return record[key] as T[];
    }
  }

  return [];
}

export async function getBusinessContext() {
  return businessRequest<BusinessContext>(
    "/business-accounts/me"
  );
}

export async function getBusinessDepartments() {
  const payload = await businessRequest<unknown>(
    "/business-accounts/departments"
  );

  return extractArray<BusinessDepartment>(
    payload,
    ["departments", "items"]
  );
}

export async function createBusinessDepartment(
  input: DepartmentInput
) {
  return businessRequest<BusinessDepartment>(
    "/business-accounts/departments",
    {
      method: "POST",
      body: JSON.stringify({
        name: input.name.trim(),
        code: input.code?.trim() || undefined,
      }),
    }
  );
}

export async function updateBusinessDepartment(
  departmentId: string,
  input: Partial<DepartmentInput> & {
    status?: string;
  }
) {
  return businessRequest<BusinessDepartment>(
    `/business-accounts/departments/${encodeURIComponent(
      departmentId
    )}`,
    {
      method: "PATCH",
      body: JSON.stringify(input),
    }
  );
}

export async function getBusinessCostCentres() {
  const payload = await businessRequest<unknown>(
    "/business-accounts/cost-centres"
  );

  return extractArray<BusinessCostCentre>(
    payload,
    ["costCentres", "costCenters", "items"]
  );
}

export async function createBusinessCostCentre(
  input: CostCentreInput
) {
  return businessRequest<BusinessCostCentre>(
    "/business-accounts/cost-centres",
    {
      method: "POST",
      body: JSON.stringify({
        name: input.name.trim(),
        code: input.code.trim(),
        departmentId:
          input.departmentId || undefined,
        monthlyBudget:
          input.monthlyBudget ?? undefined,
        currency:
          input.currency?.trim().toUpperCase() || "GHS",
      }),
    }
  );
}

export async function updateBusinessCostCentre(
  costCentreId: string,
  input: Partial<CostCentreInput> & {
    status?: string;
  }
) {
  return businessRequest<BusinessCostCentre>(
    `/business-accounts/cost-centres/${encodeURIComponent(
      costCentreId
    )}`,
    {
      method: "PATCH",
      body: JSON.stringify(input),
    }
  );
}

export async function getBusinessMembers() {
  const payload = await businessRequest<unknown>(
    "/business-accounts/members"
  );

  return extractArray<BusinessMember>(
    payload,
    ["members", "items"]
  );
}

export async function updateBusinessMember(
  memberId: string,
  input: Partial<
    Pick<
      BusinessMember,
      | "role"
      | "departmentId"
      | "defaultCostCentreId"
      | "employeeReference"
      | "jobTitle"
      | "canBookForOthers"
      | "canViewBilling"
      | "canManageMembers"
      | "canManagePolicies"
      | "status"
    >
  >
) {
  return businessRequest<BusinessMember>(
    `/business-accounts/members/${encodeURIComponent(
      memberId
    )}`,
    {
      method: "PATCH",
      body: JSON.stringify(input),
    }
  );
}

export async function getBusinessInvitations() {
  const payload = await businessRequest<unknown>(
    "/business-accounts/member-invitations"
  );

  return extractArray<BusinessInvitation>(
    payload,
    ["invitations", "items"]
  );
}

export async function createBusinessInvitation(
  input: InvitationInput
) {
  return businessRequest<BusinessInvitation>(
    "/business-accounts/member-invitations",
    {
      method: "POST",
      body: JSON.stringify({
        ...input,
        email: input.email.trim().toLowerCase(),
        departmentId:
          input.departmentId || undefined,
        defaultCostCentreId:
          input.defaultCostCentreId || undefined,
        employeeReference:
          input.employeeReference?.trim() || undefined,
        jobTitle:
          input.jobTitle?.trim() || undefined,
      }),
    }
  );
}

export async function revokeBusinessInvitation(
  invitationId: string
) {
  return businessRequest<BusinessInvitation>(
    `/business-accounts/member-invitations/${encodeURIComponent(
      invitationId
    )}/revoke`,
    {
      method: "POST",
    }
  );
}

export function isAuthenticationError(error: unknown) {
  return (
    error instanceof BusinessApiError &&
    error.status === 401
  );
}

export function getBusinessErrorMessage(
  error: unknown
) {
  return error instanceof Error
    ? error.message
    : "The CRUUZ Business request could not be completed.";
}