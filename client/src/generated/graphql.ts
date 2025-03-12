import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CreateEventInput = {
  name: Scalars['String']['input'];
};

export type CreateGameInput = {
  logoUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateTournamentInput = {
  eventId: Scalars['Int']['input'];
  gameId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type CreateUserInput = {
  isGlobalAdmin?: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  seat: Scalars['String']['input'];
};

export type EventModel = {
  __typename?: 'EventModel';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  tournaments: Array<TournamentModel>;
};

export type GameModel = {
  __typename?: 'GameModel';
  id: Scalars['Int']['output'];
  logoUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  tournaments: Array<TournamentModel>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addTournamentAdmin: TournamentAdminModel;
  createEvent: EventModel;
  createGame: GameModel;
  createTournament: TournamentModel;
  createUser: UserModel;
  deleteEvent: Scalars['Boolean']['output'];
  deleteGame: Scalars['Boolean']['output'];
  deleteTournament: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  deregisterTeam: Scalars['Boolean']['output'];
  deregisterUserParticipant: Scalars['Boolean']['output'];
  registerTeam: RegisterTeamOutput;
  registerUserParticipant: TournamentParticipantModel;
  removeTournamentAdmin: Scalars['Boolean']['output'];
  updateEvent: EventModel;
  updateGame: GameModel;
  updateTeam: TeamModel;
  updateTournament: TournamentModel;
  updateUser: UserModel;
};


export type MutationAddTournamentAdminArgs = {
  tournamentId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationCreateEventArgs = {
  data: CreateEventInput;
};


export type MutationCreateGameArgs = {
  data: CreateGameInput;
};


export type MutationCreateTournamentArgs = {
  data: CreateTournamentInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteEventArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteGameArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteTournamentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeregisterTeamArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeregisterUserParticipantArgs = {
  tournamentId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationRegisterTeamArgs = {
  data: RegisterTeamInput;
};


export type MutationRegisterUserParticipantArgs = {
  tournamentId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationRemoveTournamentAdminArgs = {
  tournamentId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationUpdateEventArgs = {
  data: UpdateEventInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateGameArgs = {
  data: UpdateGameInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateTeamArgs = {
  data: UpdateTeamInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateTournamentArgs = {
  data: UpdateTournamentInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  id: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  event?: Maybe<EventModel>;
  events: Array<EventModel>;
  game?: Maybe<GameModel>;
  games: Array<GameModel>;
  team: TeamModel;
  teams: Array<TeamModel>;
  tournament?: Maybe<TournamentModel>;
  tournaments: Array<TournamentModel>;
  user: UserModel;
  users: Array<UserModel>;
};


export type QueryEventArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGameArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTeamArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTournamentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTournamentsArgs = {
  eventId?: InputMaybe<Scalars['Int']['input']>;
  publishedOnly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export type RegisterTeamInput = {
  /** The name of the team. */
  name: Scalars['String']['input'];
  /** The tag or short identifier for the team. */
  tag: Scalars['String']['input'];
  /** The ID of the tournament for which the team is being registered. */
  tournamentId: Scalars['Int']['input'];
  /** The ID of the user creating the team, who will be set as the team captain. */
  userId: Scalars['Int']['input'];
};

export type RegisterTeamOutput = {
  __typename?: 'RegisterTeamOutput';
  /** A message providing additional information or error details. */
  message?: Maybe<Scalars['String']['output']>;
  /** Indicates whether the team registration was successful. */
  success: Scalars['Boolean']['output'];
  /** The newly registered team if the registration was successful; otherwise null. */
  team?: Maybe<TeamModel>;
};

export type TeamMemberModel = {
  __typename?: 'TeamMemberModel';
  isTeamCaptain: Scalars['Boolean']['output'];
  team: TeamModel;
  user: UserModel;
};

export type TeamModel = {
  __typename?: 'TeamModel';
  id: Scalars['Int']['output'];
  members: Array<TeamMemberModel>;
  name: Scalars['String']['output'];
  tag: Scalars['String']['output'];
  tournaments: Array<TournamentParticipantModel>;
};

export type TournamentAdminModel = {
  __typename?: 'TournamentAdminModel';
  id: Scalars['Int']['output'];
  tournament: TournamentModel;
  user: UserModel;
};

export type TournamentModel = {
  __typename?: 'TournamentModel';
  admins: Array<TournamentAdminModel>;
  /** Date and time of the tournament briefing. */
  briefingTime?: Maybe<Scalars['DateTime']['output']>;
  /** Tournaments are grouped by this category when displayed in the tournament overview. */
  category?: Maybe<Scalars['String']['output']>;
  event: EventModel;
  game: GameModel;
  /** Unique identifier of the tournament. */
  id: Scalars['Int']['output'];
  /** Flag indicating whether the tournament is publicly displayed. */
  isPublished: Scalars['Boolean']['output'];
  /** Maximum number of participants that can register for the tournament. Null if there is no upper limit. */
  maxParticipants?: Maybe<Scalars['Int']['output']>;
  /** Maximum number of substitutes a team may have. */
  maxSubstitutes: Scalars['Int']['output'];
  /** Minimum number of participants required for the tournament to take place. */
  minParticipants: Scalars['Int']['output'];
  /** Name of the tournament. */
  name: Scalars['String']['output'];
  /** Number of players per team (1 means solo tournaments). */
  numPlayersPerTeam: Scalars['Int']['output'];
  /** List of participants registered for this tournament. */
  participants: Array<TournamentParticipantModel>;
  /** Prize for the first place. */
  prize1?: Maybe<Scalars['String']['output']>;
  /** Prize for the second place. */
  prize2?: Maybe<Scalars['String']['output']>;
  /** Prize for the third place. */
  prize3?: Maybe<Scalars['String']['output']>;
  /** Users can only participate in one tournament within the same registration group. */
  registrationGroup?: Maybe<Scalars['String']['output']>;
  /** Tournament rules. */
  rules?: Maybe<Scalars['String']['output']>;
};

export type TournamentParticipantModel = {
  __typename?: 'TournamentParticipantModel';
  finalRank?: Maybe<Scalars['Int']['output']>;
  initialSeed?: Maybe<Scalars['Int']['output']>;
  team?: Maybe<TeamModel>;
  tournament: TournamentModel;
  user?: Maybe<UserModel>;
};

export type UpdateEventInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateGameInput = {
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTeamInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  tag?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTournamentInput = {
  briefingTime?: InputMaybe<Scalars['DateTime']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  maxParticipants?: InputMaybe<Scalars['Int']['input']>;
  maxSubstitutes?: InputMaybe<Scalars['Int']['input']>;
  minParticipants?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  numPlayersPerTeam?: InputMaybe<Scalars['Int']['input']>;
  prize1?: InputMaybe<Scalars['String']['input']>;
  prize2?: InputMaybe<Scalars['String']['input']>;
  prize3?: InputMaybe<Scalars['String']['input']>;
  registrationGroup?: InputMaybe<Scalars['String']['input']>;
  rules?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  isGlobalAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  seat?: InputMaybe<Scalars['String']['input']>;
};

export type UserModel = {
  __typename?: 'UserModel';
  adminTournaments: Array<TournamentAdminModel>;
  id: Scalars['Int']['output'];
  isGlobalAdmin: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  seat: Scalars['String']['output'];
  teams: Array<TeamMemberModel>;
  tournaments: Array<TournamentParticipantModel>;
};

export type AddTournamentAdminMutationVariables = Exact<{
  tournamentId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
}>;


export type AddTournamentAdminMutation = { __typename?: 'Mutation', addTournamentAdmin: { __typename?: 'TournamentAdminModel', id: number } };

export type CreateTournamentMutationVariables = Exact<{
  data: CreateTournamentInput;
}>;


export type CreateTournamentMutation = { __typename?: 'Mutation', createTournament: { __typename?: 'TournamentModel', id: number, name: string } };

export type DeleteTournamentMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteTournamentMutation = { __typename?: 'Mutation', deleteTournament: boolean };

export type DeregisterUserParticipantMutationVariables = Exact<{
  tournamentId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
}>;


export type DeregisterUserParticipantMutation = { __typename?: 'Mutation', deregisterUserParticipant: boolean };

export type RegisterUserParticipantMutationVariables = Exact<{
  tournamentId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
}>;


export type RegisterUserParticipantMutation = { __typename?: 'Mutation', registerUserParticipant: { __typename?: 'TournamentParticipantModel', initialSeed?: number | null, finalRank?: number | null, tournament: { __typename?: 'TournamentModel', id: number }, user?: { __typename?: 'UserModel', id: number } | null } };

export type RemoveTournamentAdminMutationVariables = Exact<{
  tournamentId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
}>;


export type RemoveTournamentAdminMutation = { __typename?: 'Mutation', removeTournamentAdmin: boolean };

export type UpdateTournamentMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: UpdateTournamentInput;
}>;


export type UpdateTournamentMutation = { __typename?: 'Mutation', updateTournament: { __typename?: 'TournamentModel', id: number, name: string, category?: string | null, rules?: string | null, prize1?: string | null, prize2?: string | null, prize3?: string | null, numPlayersPerTeam: number, minParticipants: number, maxParticipants?: number | null, isPublished: boolean } };

export type GetEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'EventModel', id: number, name: string }> };

export type GetEventTournamentCategoriesQueryVariables = Exact<{
  eventId: Scalars['Int']['input'];
}>;


export type GetEventTournamentCategoriesQuery = { __typename?: 'Query', tournaments: Array<{ __typename?: 'TournamentModel', category?: string | null }> };

export type GetTournamentQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetTournamentQuery = { __typename?: 'Query', tournament?: { __typename?: 'TournamentModel', rules?: string | null, prize1?: string | null, prize2?: string | null, prize3?: string | null, numPlayersPerTeam: number, minParticipants: number, maxParticipants?: number | null, briefingTime?: any | null, id: number, name: string, category?: string | null, isPublished: boolean, event: { __typename?: 'EventModel', id: number }, participants: Array<{ __typename?: 'TournamentParticipantModel', user?: { __typename?: 'UserModel', id: number, name: string } | null, team?: { __typename?: 'TeamModel', id: number, name: string, members: Array<{ __typename?: 'TeamMemberModel', isTeamCaptain: boolean, user: { __typename?: 'UserModel', id: number, name: string } }> } | null }>, admins: Array<{ __typename?: 'TournamentAdminModel', user: { __typename?: 'UserModel', id: number, name: string } }> } | null };

export type GetTournamentsQueryVariables = Exact<{
  publishedOnly?: InputMaybe<Scalars['Boolean']['input']>;
  eventId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTournamentsQuery = { __typename?: 'Query', tournaments: Array<{ __typename?: 'TournamentModel', id: number, name: string, category?: string | null, isPublished: boolean, admins: Array<{ __typename?: 'TournamentAdminModel', user: { __typename?: 'UserModel', id: number, name: string } }> }> };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'UserModel', id: number, name: string, seat: string, isGlobalAdmin: boolean }> };

export type TournamentAdminsFragment = { __typename?: 'TournamentModel', admins: Array<{ __typename?: 'TournamentAdminModel', user: { __typename?: 'UserModel', id: number, name: string } }> };

export type TournamentBasicFieldsFragment = { __typename?: 'TournamentModel', id: number, name: string, category?: string | null, isPublished: boolean };

export type TournamentParticipantsFragment = { __typename?: 'TournamentModel', participants: Array<{ __typename?: 'TournamentParticipantModel', user?: { __typename?: 'UserModel', id: number, name: string } | null, team?: { __typename?: 'TeamModel', id: number, name: string, members: Array<{ __typename?: 'TeamMemberModel', isTeamCaptain: boolean, user: { __typename?: 'UserModel', id: number, name: string } }> } | null }> };

export const TournamentAdminsFragmentDoc = gql`
    fragment TournamentAdmins on TournamentModel {
  admins {
    user {
      id
      name
    }
  }
}
    `;
export const TournamentBasicFieldsFragmentDoc = gql`
    fragment TournamentBasicFields on TournamentModel {
  id
  name
  category
  isPublished
}
    `;
export const TournamentParticipantsFragmentDoc = gql`
    fragment TournamentParticipants on TournamentModel {
  participants {
    user {
      id
      name
    }
    team {
      id
      name
      members {
        user {
          id
          name
        }
        isTeamCaptain
      }
    }
  }
}
    `;
export const AddTournamentAdminDocument = gql`
    mutation AddTournamentAdmin($tournamentId: Int!, $userId: Int!) {
  addTournamentAdmin(tournamentId: $tournamentId, userId: $userId) {
    id
  }
}
    `;
export type AddTournamentAdminMutationFn = Apollo.MutationFunction<AddTournamentAdminMutation, AddTournamentAdminMutationVariables>;

/**
 * __useAddTournamentAdminMutation__
 *
 * To run a mutation, you first call `useAddTournamentAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTournamentAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTournamentAdminMutation, { data, loading, error }] = useAddTournamentAdminMutation({
 *   variables: {
 *      tournamentId: // value for 'tournamentId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAddTournamentAdminMutation(baseOptions?: Apollo.MutationHookOptions<AddTournamentAdminMutation, AddTournamentAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTournamentAdminMutation, AddTournamentAdminMutationVariables>(AddTournamentAdminDocument, options);
      }
export type AddTournamentAdminMutationHookResult = ReturnType<typeof useAddTournamentAdminMutation>;
export type AddTournamentAdminMutationResult = Apollo.MutationResult<AddTournamentAdminMutation>;
export type AddTournamentAdminMutationOptions = Apollo.BaseMutationOptions<AddTournamentAdminMutation, AddTournamentAdminMutationVariables>;
export const CreateTournamentDocument = gql`
    mutation CreateTournament($data: CreateTournamentInput!) {
  createTournament(data: $data) {
    id
    name
  }
}
    `;
export type CreateTournamentMutationFn = Apollo.MutationFunction<CreateTournamentMutation, CreateTournamentMutationVariables>;

/**
 * __useCreateTournamentMutation__
 *
 * To run a mutation, you first call `useCreateTournamentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTournamentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTournamentMutation, { data, loading, error }] = useCreateTournamentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTournamentMutation(baseOptions?: Apollo.MutationHookOptions<CreateTournamentMutation, CreateTournamentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTournamentMutation, CreateTournamentMutationVariables>(CreateTournamentDocument, options);
      }
export type CreateTournamentMutationHookResult = ReturnType<typeof useCreateTournamentMutation>;
export type CreateTournamentMutationResult = Apollo.MutationResult<CreateTournamentMutation>;
export type CreateTournamentMutationOptions = Apollo.BaseMutationOptions<CreateTournamentMutation, CreateTournamentMutationVariables>;
export const DeleteTournamentDocument = gql`
    mutation DeleteTournament($id: Int!) {
  deleteTournament(id: $id)
}
    `;
export type DeleteTournamentMutationFn = Apollo.MutationFunction<DeleteTournamentMutation, DeleteTournamentMutationVariables>;

/**
 * __useDeleteTournamentMutation__
 *
 * To run a mutation, you first call `useDeleteTournamentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTournamentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTournamentMutation, { data, loading, error }] = useDeleteTournamentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTournamentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTournamentMutation, DeleteTournamentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTournamentMutation, DeleteTournamentMutationVariables>(DeleteTournamentDocument, options);
      }
export type DeleteTournamentMutationHookResult = ReturnType<typeof useDeleteTournamentMutation>;
export type DeleteTournamentMutationResult = Apollo.MutationResult<DeleteTournamentMutation>;
export type DeleteTournamentMutationOptions = Apollo.BaseMutationOptions<DeleteTournamentMutation, DeleteTournamentMutationVariables>;
export const DeregisterUserParticipantDocument = gql`
    mutation DeregisterUserParticipant($tournamentId: Int!, $userId: Int!) {
  deregisterUserParticipant(tournamentId: $tournamentId, userId: $userId)
}
    `;
export type DeregisterUserParticipantMutationFn = Apollo.MutationFunction<DeregisterUserParticipantMutation, DeregisterUserParticipantMutationVariables>;

/**
 * __useDeregisterUserParticipantMutation__
 *
 * To run a mutation, you first call `useDeregisterUserParticipantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeregisterUserParticipantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deregisterUserParticipantMutation, { data, loading, error }] = useDeregisterUserParticipantMutation({
 *   variables: {
 *      tournamentId: // value for 'tournamentId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeregisterUserParticipantMutation(baseOptions?: Apollo.MutationHookOptions<DeregisterUserParticipantMutation, DeregisterUserParticipantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeregisterUserParticipantMutation, DeregisterUserParticipantMutationVariables>(DeregisterUserParticipantDocument, options);
      }
export type DeregisterUserParticipantMutationHookResult = ReturnType<typeof useDeregisterUserParticipantMutation>;
export type DeregisterUserParticipantMutationResult = Apollo.MutationResult<DeregisterUserParticipantMutation>;
export type DeregisterUserParticipantMutationOptions = Apollo.BaseMutationOptions<DeregisterUserParticipantMutation, DeregisterUserParticipantMutationVariables>;
export const RegisterUserParticipantDocument = gql`
    mutation RegisterUserParticipant($tournamentId: Int!, $userId: Int!) {
  registerUserParticipant(tournamentId: $tournamentId, userId: $userId) {
    tournament {
      id
    }
    user {
      id
    }
    initialSeed
    finalRank
  }
}
    `;
export type RegisterUserParticipantMutationFn = Apollo.MutationFunction<RegisterUserParticipantMutation, RegisterUserParticipantMutationVariables>;

/**
 * __useRegisterUserParticipantMutation__
 *
 * To run a mutation, you first call `useRegisterUserParticipantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserParticipantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserParticipantMutation, { data, loading, error }] = useRegisterUserParticipantMutation({
 *   variables: {
 *      tournamentId: // value for 'tournamentId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRegisterUserParticipantMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserParticipantMutation, RegisterUserParticipantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserParticipantMutation, RegisterUserParticipantMutationVariables>(RegisterUserParticipantDocument, options);
      }
export type RegisterUserParticipantMutationHookResult = ReturnType<typeof useRegisterUserParticipantMutation>;
export type RegisterUserParticipantMutationResult = Apollo.MutationResult<RegisterUserParticipantMutation>;
export type RegisterUserParticipantMutationOptions = Apollo.BaseMutationOptions<RegisterUserParticipantMutation, RegisterUserParticipantMutationVariables>;
export const RemoveTournamentAdminDocument = gql`
    mutation RemoveTournamentAdmin($tournamentId: Int!, $userId: Int!) {
  removeTournamentAdmin(tournamentId: $tournamentId, userId: $userId)
}
    `;
export type RemoveTournamentAdminMutationFn = Apollo.MutationFunction<RemoveTournamentAdminMutation, RemoveTournamentAdminMutationVariables>;

/**
 * __useRemoveTournamentAdminMutation__
 *
 * To run a mutation, you first call `useRemoveTournamentAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTournamentAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTournamentAdminMutation, { data, loading, error }] = useRemoveTournamentAdminMutation({
 *   variables: {
 *      tournamentId: // value for 'tournamentId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRemoveTournamentAdminMutation(baseOptions?: Apollo.MutationHookOptions<RemoveTournamentAdminMutation, RemoveTournamentAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveTournamentAdminMutation, RemoveTournamentAdminMutationVariables>(RemoveTournamentAdminDocument, options);
      }
export type RemoveTournamentAdminMutationHookResult = ReturnType<typeof useRemoveTournamentAdminMutation>;
export type RemoveTournamentAdminMutationResult = Apollo.MutationResult<RemoveTournamentAdminMutation>;
export type RemoveTournamentAdminMutationOptions = Apollo.BaseMutationOptions<RemoveTournamentAdminMutation, RemoveTournamentAdminMutationVariables>;
export const UpdateTournamentDocument = gql`
    mutation UpdateTournament($id: Int!, $data: UpdateTournamentInput!) {
  updateTournament(id: $id, data: $data) {
    id
    name
    category
    rules
    prize1
    prize2
    prize3
    numPlayersPerTeam
    minParticipants
    maxParticipants
    isPublished
  }
}
    `;
export type UpdateTournamentMutationFn = Apollo.MutationFunction<UpdateTournamentMutation, UpdateTournamentMutationVariables>;

/**
 * __useUpdateTournamentMutation__
 *
 * To run a mutation, you first call `useUpdateTournamentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTournamentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTournamentMutation, { data, loading, error }] = useUpdateTournamentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTournamentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTournamentMutation, UpdateTournamentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTournamentMutation, UpdateTournamentMutationVariables>(UpdateTournamentDocument, options);
      }
export type UpdateTournamentMutationHookResult = ReturnType<typeof useUpdateTournamentMutation>;
export type UpdateTournamentMutationResult = Apollo.MutationResult<UpdateTournamentMutation>;
export type UpdateTournamentMutationOptions = Apollo.BaseMutationOptions<UpdateTournamentMutation, UpdateTournamentMutationVariables>;
export const GetEventsDocument = gql`
    query GetEvents {
  events {
    id
    name
  }
}
    `;

/**
 * __useGetEventsQuery__
 *
 * To run a query within a React component, call `useGetEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEventsQuery(baseOptions?: Apollo.QueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
      }
export function useGetEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
        }
export function useGetEventsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
        }
export type GetEventsQueryHookResult = ReturnType<typeof useGetEventsQuery>;
export type GetEventsLazyQueryHookResult = ReturnType<typeof useGetEventsLazyQuery>;
export type GetEventsSuspenseQueryHookResult = ReturnType<typeof useGetEventsSuspenseQuery>;
export type GetEventsQueryResult = Apollo.QueryResult<GetEventsQuery, GetEventsQueryVariables>;
export const GetEventTournamentCategoriesDocument = gql`
    query GetEventTournamentCategories($eventId: Int!) {
  tournaments(eventId: $eventId) {
    category
  }
}
    `;

/**
 * __useGetEventTournamentCategoriesQuery__
 *
 * To run a query within a React component, call `useGetEventTournamentCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventTournamentCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventTournamentCategoriesQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useGetEventTournamentCategoriesQuery(baseOptions: Apollo.QueryHookOptions<GetEventTournamentCategoriesQuery, GetEventTournamentCategoriesQueryVariables> & ({ variables: GetEventTournamentCategoriesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventTournamentCategoriesQuery, GetEventTournamentCategoriesQueryVariables>(GetEventTournamentCategoriesDocument, options);
      }
export function useGetEventTournamentCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventTournamentCategoriesQuery, GetEventTournamentCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventTournamentCategoriesQuery, GetEventTournamentCategoriesQueryVariables>(GetEventTournamentCategoriesDocument, options);
        }
export function useGetEventTournamentCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEventTournamentCategoriesQuery, GetEventTournamentCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventTournamentCategoriesQuery, GetEventTournamentCategoriesQueryVariables>(GetEventTournamentCategoriesDocument, options);
        }
export type GetEventTournamentCategoriesQueryHookResult = ReturnType<typeof useGetEventTournamentCategoriesQuery>;
export type GetEventTournamentCategoriesLazyQueryHookResult = ReturnType<typeof useGetEventTournamentCategoriesLazyQuery>;
export type GetEventTournamentCategoriesSuspenseQueryHookResult = ReturnType<typeof useGetEventTournamentCategoriesSuspenseQuery>;
export type GetEventTournamentCategoriesQueryResult = Apollo.QueryResult<GetEventTournamentCategoriesQuery, GetEventTournamentCategoriesQueryVariables>;
export const GetTournamentDocument = gql`
    query GetTournament($id: Int!) {
  tournament(id: $id) {
    ...TournamentBasicFields
    rules
    prize1
    prize2
    prize3
    numPlayersPerTeam
    minParticipants
    maxParticipants
    briefingTime
    event {
      id
    }
    ...TournamentParticipants
    ...TournamentAdmins
  }
}
    ${TournamentBasicFieldsFragmentDoc}
${TournamentParticipantsFragmentDoc}
${TournamentAdminsFragmentDoc}`;

/**
 * __useGetTournamentQuery__
 *
 * To run a query within a React component, call `useGetTournamentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTournamentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTournamentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTournamentQuery(baseOptions: Apollo.QueryHookOptions<GetTournamentQuery, GetTournamentQueryVariables> & ({ variables: GetTournamentQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTournamentQuery, GetTournamentQueryVariables>(GetTournamentDocument, options);
      }
export function useGetTournamentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTournamentQuery, GetTournamentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTournamentQuery, GetTournamentQueryVariables>(GetTournamentDocument, options);
        }
export function useGetTournamentSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTournamentQuery, GetTournamentQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTournamentQuery, GetTournamentQueryVariables>(GetTournamentDocument, options);
        }
export type GetTournamentQueryHookResult = ReturnType<typeof useGetTournamentQuery>;
export type GetTournamentLazyQueryHookResult = ReturnType<typeof useGetTournamentLazyQuery>;
export type GetTournamentSuspenseQueryHookResult = ReturnType<typeof useGetTournamentSuspenseQuery>;
export type GetTournamentQueryResult = Apollo.QueryResult<GetTournamentQuery, GetTournamentQueryVariables>;
export const GetTournamentsDocument = gql`
    query GetTournaments($publishedOnly: Boolean = true, $eventId: Int) {
  tournaments(publishedOnly: $publishedOnly, eventId: $eventId) {
    ...TournamentBasicFields
    ...TournamentAdmins
  }
}
    ${TournamentBasicFieldsFragmentDoc}
${TournamentAdminsFragmentDoc}`;

/**
 * __useGetTournamentsQuery__
 *
 * To run a query within a React component, call `useGetTournamentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTournamentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTournamentsQuery({
 *   variables: {
 *      publishedOnly: // value for 'publishedOnly'
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useGetTournamentsQuery(baseOptions?: Apollo.QueryHookOptions<GetTournamentsQuery, GetTournamentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTournamentsQuery, GetTournamentsQueryVariables>(GetTournamentsDocument, options);
      }
export function useGetTournamentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTournamentsQuery, GetTournamentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTournamentsQuery, GetTournamentsQueryVariables>(GetTournamentsDocument, options);
        }
export function useGetTournamentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTournamentsQuery, GetTournamentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTournamentsQuery, GetTournamentsQueryVariables>(GetTournamentsDocument, options);
        }
export type GetTournamentsQueryHookResult = ReturnType<typeof useGetTournamentsQuery>;
export type GetTournamentsLazyQueryHookResult = ReturnType<typeof useGetTournamentsLazyQuery>;
export type GetTournamentsSuspenseQueryHookResult = ReturnType<typeof useGetTournamentsSuspenseQuery>;
export type GetTournamentsQueryResult = Apollo.QueryResult<GetTournamentsQuery, GetTournamentsQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  users {
    id
    name
    seat
    isGlobalAdmin
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;