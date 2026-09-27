"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getBusinessContext,
  getBusinessCostCentres,
  getBusinessDepartments,
  getBusinessErrorMessage,
  getBusinessInvitations,
  getBusinessMembers,
  isAuthenticationError,
} from "./api";

import {
  canManageBusinessMembers,
  isBusinessAccountOperational,
  type BusinessContext,
  type BusinessCostCentre,
  type BusinessDepartment,
  type BusinessInvitation,
  type BusinessMember,
} from "./types";

type WorkspaceState = {
  context: BusinessContext | null;
  departments: BusinessDepartment[];
  costCentres: BusinessCostCentre[];
  members: BusinessMember[];
  invitations: BusinessInvitation[];
  loading: boolean;
  refreshing: boolean;
  authenticationRequired: boolean;
  error: string | null;
  warning: string | null;
};

const initialState: WorkspaceState = {
  context: null,
  departments: [],
  costCentres: [],
  members: [],
  invitations: [],
  loading: true,
  refreshing: false,
  authenticationRequired: false,
  error: null,
  warning: null,
};

export function useBusinessWorkspace() {
  const [state, setState] =
    useState<WorkspaceState>(initialState);

  const loadWorkspace = useCallback(
    async (background = false) => {
      setState((current) => ({
        ...current,
        loading: background
          ? current.loading
          : true,
        refreshing: background,
        authenticationRequired: false,
        error: null,
        warning: null,
      }));

      try {
        const context =
          await getBusinessContext();

        if (
          !context?.account ||
          !context?.membership
        ) {
          throw new Error(
            "Your CRUUZ Business account information could not be loaded."
          );
        }

        if (
          !isBusinessAccountOperational(
            context.account
          )
        ) {
          setState({
            context,
            departments: [],
            costCentres: [],
            members: [],
            invitations: [],
            loading: false,
            refreshing: false,
            authenticationRequired: false,
            error: null,
            warning: null,
          });

          return;
        }

        const canManageMembers =
          canManageBusinessMembers(
            context.membership
          );

        const results =
          await Promise.allSettled([
            getBusinessDepartments(),
            getBusinessCostCentres(),
            getBusinessMembers(),
            canManageMembers
              ? getBusinessInvitations()
              : Promise.resolve([]),
          ]);

        const warnings: string[] = [];

        const departments =
          results[0].status === "fulfilled"
            ? results[0].value
            : [];

        const costCentres =
          results[1].status === "fulfilled"
            ? results[1].value
            : [];

        const members =
          results[2].status === "fulfilled"
            ? results[2].value
            : [];

        const invitations =
          results[3].status === "fulfilled"
            ? results[3].value
            : [];

        const labels = [
          "departments",
          "cost centres",
          "employees",
          "invitations",
        ];

        results.forEach((result, index) => {
          if (result.status === "rejected") {
            warnings.push(
              `${labels[index]}: ${getBusinessErrorMessage(
                result.reason
              )}`
            );
          }
        });

        setState({
          context,
          departments,
          costCentres,
          members,
          invitations,
          loading: false,
          refreshing: false,
          authenticationRequired: false,
          error: null,
          warning:
            warnings.length > 0
              ? `Some information could not be loaded (${warnings.join(
                  "; "
                )}).`
              : null,
        });
      } catch (failure) {
        setState((current) => ({
          ...current,
          loading: false,
          refreshing: false,
          authenticationRequired:
            isAuthenticationError(failure),
          error:
            getBusinessErrorMessage(failure),
          warning: null,
        }));
      }
    },
    []
  );

  useEffect(() => {
    void loadWorkspace();
  }, [loadWorkspace]);

  return {
    ...state,
    reload: () => loadWorkspace(true),
  };
}