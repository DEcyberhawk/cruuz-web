export type BusinessAccount = {
  id: string;
  legalName: string;
  tradingName?: string | null;
  registrationNumber?: string | null;
  taxIdentificationNumber?: string | null;
  primaryEmail?: string | null;
  primaryPhone?: string | null;
  country?: string | null;
  city?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  status: string;
  verificationStatus: string;
  createdAt?: string;
  updatedAt?: string;
};

export type BusinessMembership = {
  id: string;
  businessAccountId: string;
  userId: string;
  role: string;
  status: string;
  departmentId?: string | null;
  defaultCostCentreId?: string | null;
  employeeReference?: string | null;
  jobTitle?: string | null;
  canBookForOthers: boolean;
  canViewBilling: boolean;
  canManageMembers: boolean;
  canManagePolicies: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type BusinessDepartment = {
  id: string;
  businessAccountId: string;
  name: string;
  code?: string | null;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

export type BusinessCostCentre = {
  id: string;
  businessAccountId: string;
  departmentId?: string | null;
  name: string;
  code: string;
  monthlyBudget?: number | string | null;
  currency?: string | null;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

export type BusinessMember = {
  id: string;
  businessAccountId: string;
  userId: string;
  departmentId?: string | null;
  defaultCostCentreId?: string | null;
  role: string;
  employeeReference?: string | null;
  jobTitle?: string | null;
  canBookForOthers: boolean;
  canViewBilling: boolean;
  canManageMembers: boolean;
  canManagePolicies: boolean;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

export type BusinessInvitation = {
  id: string;
  businessAccountId: string;
  email: string;
  role: string;
  departmentId?: string | null;
  defaultCostCentreId?: string | null;
  employeeReference?: string | null;
  jobTitle?: string | null;
  canBookForOthers: boolean;
  canViewBilling: boolean;
  canManageMembers: boolean;
  canManagePolicies: boolean;
  status: string;
  expiresAt?: string | null;
  acceptedAt?: string | null;
  revokedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type BusinessContext = {
  account: BusinessAccount;
  membership: BusinessMembership;
};

export type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  data?: T;
  error?: {
    code?: string;
    message?: string;
    details?: unknown;
  };
};

export type BusinessWorkspaceData = {
  context: BusinessContext;
  departments: BusinessDepartment[];
  costCentres: BusinessCostCentre[];
  members: BusinessMember[];
  invitations: BusinessInvitation[];
};

export type BusinessSection =
  | "overview"
  | "members"
  | "departments"
  | "cost-centres"
  | "travel"
  | "billing"
  | "policies";

export type InvitationInput = {
  email: string;
  role: string;
  departmentId?: string;
  defaultCostCentreId?: string;
  employeeReference?: string;
  jobTitle?: string;
  canBookForOthers: boolean;
  canViewBilling: boolean;
  canManageMembers: boolean;
  canManagePolicies: boolean;
};

export type DepartmentInput = {
  name: string;
  code?: string;
};

export type CostCentreInput = {
  name: string;
  code: string;
  departmentId?: string;
  monthlyBudget?: number;
  currency?: string;
};

export function canManageBusinessMembers(
  membership: BusinessMembership
) {
  const role = String(membership.role || "").toUpperCase();

  return (
    role === "OWNER" ||
    role === "ADMIN" ||
    membership.canManageMembers
  );
}

export function canViewBusinessBilling(
  membership: BusinessMembership
) {
  const role = String(membership.role || "").toUpperCase();

  return (
    role === "OWNER" ||
    role === "ADMIN" ||
    membership.canViewBilling
  );
}

export function isBusinessAccountOperational(
  account: BusinessAccount
) {
  return (
    String(account.status).toUpperCase() === "ACTIVE" &&
    String(account.verificationStatus).toUpperCase() === "VERIFIED"
  );
}