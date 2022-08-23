/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListType, ProcedureFilter, VoteSelection } from "./../../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ProceduresList
// ====================================================

export interface ProceduresList_procedures_activityIndex {
  __typename: "ActivityIndex";
  activityIndex: number;
}

export interface ProceduresList_procedures_voteResults {
  __typename: "VoteResult";
  yes: number;
  abstination: number;
  no: number;
  governmentDecision: VoteSelection;
}

export interface ProceduresList_procedures_communityVotes {
  __typename: "CommunityVotes";
  yes: number;
  abstination: number;
  no: number;
  total: number;
}

export interface ProceduresList_procedures {
  __typename: "Procedure";
  _id: string;
  title: string;
  procedureId: string;
  sessionTOPHeading: string | null;
  subjectGroups: string[];
  voteDate: any | null;
  voteEnd: any | null;
  list: ListType | null;
  type: string;
  voteWeek: number | null;
  voteYear: number | null;
  activityIndex: ProceduresList_procedures_activityIndex;
  votedGovernment: boolean | null;
  voted: boolean;
  voteResults: ProceduresList_procedures_voteResults | null;
  communityVotes: ProceduresList_procedures_communityVotes | null;
}

export interface ProceduresList {
  procedures: ProceduresList_procedures[];
}

export interface ProceduresListVariables {
  offset?: number | null;
  pageSize?: number | null;
  listTypes?: ListType[] | null;
  sort?: string | null;
  filter?: ProcedureFilter | null;
  constituencies?: string[] | null;
  period: number;
}
