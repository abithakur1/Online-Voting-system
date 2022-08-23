import { gql } from '@apollo/client';

export const PROCEDURES_LIST = gql`
  query ProceduresList(
    $offset: Int
    $pageSize: Int
    $listTypes: [ListType!]
    $sort: String
    $filter: ProcedureFilter
    $constituencies: [String!]
    $period: Int!
  ) {
    procedures(
      offset: $offset
      pageSize: $pageSize
      listTypes: $listTypes
      sort: $sort
      filter: $filter
      period: $period
    ) {
      _id
      title
      procedureId
      sessionTOPHeading
      subjectGroups
      voteDate
      voteEnd
      list
      type
      voteWeek
      voteYear
      activityIndex {
        activityIndex
      }
      votedGovernment
      voted
      voteResults {
        yes
        abstination
        no
        governmentDecision
      }
      communityVotes(constituencies: $constituencies) {
        yes
        abstination
        no
        total
      }
    }
  }
`;
