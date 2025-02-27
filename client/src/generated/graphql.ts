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

export type CreateTournamentInput = {
  eventId: Scalars['Int']['input'];
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

export type Mutation = {
  __typename?: 'Mutation';
  createEvent: EventModel;
  createTournament: TournamentModel;
  createUser: UserModel;
  deleteEvent: Scalars['Boolean']['output'];
  deleteTournament: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  deregisterParticipant: Scalars['Boolean']['output'];
  registerParticipant: TournamentParticipantModel;
  updateEvent: EventModel;
  updateTournament: TournamentModel;
  updateUser: UserModel;
};


export type MutationCreateEventArgs = {
  data: CreateEventInput;
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


export type MutationDeleteTournamentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeregisterParticipantArgs = {
  data: RegisterTournamentParticipantInput;
};


export type MutationRegisterParticipantArgs = {
  data: RegisterTournamentParticipantInput;
};


export type MutationUpdateEventArgs = {
  data: UpdateEventInput;
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
  tournament?: Maybe<TournamentModel>;
  tournaments: Array<TournamentModel>;
  user: UserModel;
  users: Array<UserModel>;
};


export type QueryEventArgs = {
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

export type RegisterTournamentParticipantInput = {
  tournamentId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type TournamentModel = {
  __typename?: 'TournamentModel';
  /** Date and time of the tournament briefing. */
  briefingTime?: Maybe<Scalars['DateTime']['output']>;
  /** Tournaments are grouped by this category when displayed in the tournament overview. */
  category?: Maybe<Scalars['String']['output']>;
  /** Unique identifier of the tournament. */
  id: Scalars['Int']['output'];
  /** Flag indicating whether the tournament is publicly displayed. */
  isPublished: Scalars['Boolean']['output'];
  /** Maximum number of participants that can register for the tournament (0 means there is no upper limit). */
  maxParticipants?: Maybe<Scalars['Int']['output']>;
  /** Minimum number of participants required for the tournament to take place. */
  minParticipants?: Maybe<Scalars['Int']['output']>;
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
  tournament: TournamentModel;
  user: UserModel;
};

export type UpdateEventInput = {
  isGlobalAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  seat?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTournamentInput = {
  briefingTime?: InputMaybe<Scalars['DateTime']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  maxParticipants?: InputMaybe<Scalars['Int']['input']>;
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
  id: Scalars['Int']['output'];
  isGlobalAdmin: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  seat: Scalars['String']['output'];
  tournaments: Array<TournamentParticipantModel>;
};

export type CreateTournamentMutationVariables = Exact<{
  data: CreateTournamentInput;
}>;


export type CreateTournamentMutation = { __typename?: 'Mutation', createTournament: { __typename?: 'TournamentModel', id: number, name: string } };

export type DeleteTournamentMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteTournamentMutation = { __typename?: 'Mutation', deleteTournament: boolean };

export type DeregisterParticipantMutationVariables = Exact<{
  data: RegisterTournamentParticipantInput;
}>;


export type DeregisterParticipantMutation = { __typename?: 'Mutation', deregisterParticipant: boolean };

export type GetEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'EventModel', id: number, name: string }> };

export type GetTournamentQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetTournamentQuery = { __typename?: 'Query', tournament?: { __typename?: 'TournamentModel', id: number, name: string, category?: string | null, rules?: string | null, prize1?: string | null, prize2?: string | null, prize3?: string | null, numPlayersPerTeam: number, minParticipants?: number | null, maxParticipants?: number | null, isPublished: boolean, briefingTime?: any | null, participants: Array<{ __typename?: 'TournamentParticipantModel', initialSeed?: number | null, finalRank?: number | null, user: { __typename?: 'UserModel', id: number, name: string, seat: string, isGlobalAdmin: boolean } }> } | null };

export type GetTournamentsQueryVariables = Exact<{
  publishedOnly?: InputMaybe<Scalars['Boolean']['input']>;
  eventId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTournamentsQuery = { __typename?: 'Query', tournaments: Array<{ __typename?: 'TournamentModel', id: number, name: string, isPublished: boolean }> };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'UserModel', id: number, name: string, seat: string, isGlobalAdmin: boolean }> };

export type RegisterParticipantMutationVariables = Exact<{
  data: RegisterTournamentParticipantInput;
}>;


export type RegisterParticipantMutation = { __typename?: 'Mutation', registerParticipant: { __typename?: 'TournamentParticipantModel', initialSeed?: number | null, finalRank?: number | null, tournament: { __typename?: 'TournamentModel', id: number }, user: { __typename?: 'UserModel', id: number } } };

export type UpdateTournamentMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  data: UpdateTournamentInput;
}>;


export type UpdateTournamentMutation = { __typename?: 'Mutation', updateTournament: { __typename?: 'TournamentModel', id: number, name: string, category?: string | null, rules?: string | null, prize1?: string | null, prize2?: string | null, prize3?: string | null, numPlayersPerTeam: number, minParticipants?: number | null, maxParticipants?: number | null, isPublished: boolean } };


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
export const DeregisterParticipantDocument = gql`
    mutation DeregisterParticipant($data: RegisterTournamentParticipantInput!) {
  deregisterParticipant(data: $data)
}
    `;
export type DeregisterParticipantMutationFn = Apollo.MutationFunction<DeregisterParticipantMutation, DeregisterParticipantMutationVariables>;

/**
 * __useDeregisterParticipantMutation__
 *
 * To run a mutation, you first call `useDeregisterParticipantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeregisterParticipantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deregisterParticipantMutation, { data, loading, error }] = useDeregisterParticipantMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeregisterParticipantMutation(baseOptions?: Apollo.MutationHookOptions<DeregisterParticipantMutation, DeregisterParticipantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeregisterParticipantMutation, DeregisterParticipantMutationVariables>(DeregisterParticipantDocument, options);
      }
export type DeregisterParticipantMutationHookResult = ReturnType<typeof useDeregisterParticipantMutation>;
export type DeregisterParticipantMutationResult = Apollo.MutationResult<DeregisterParticipantMutation>;
export type DeregisterParticipantMutationOptions = Apollo.BaseMutationOptions<DeregisterParticipantMutation, DeregisterParticipantMutationVariables>;
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
export const GetTournamentDocument = gql`
    query GetTournament($id: Int!) {
  tournament(id: $id) {
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
    briefingTime
    participants {
      initialSeed
      finalRank
      user {
        id
        name
        seat
        isGlobalAdmin
      }
    }
  }
}
    `;

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
    id
    name
    isPublished
  }
}
    `;

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
export const RegisterParticipantDocument = gql`
    mutation RegisterParticipant($data: RegisterTournamentParticipantInput!) {
  registerParticipant(data: $data) {
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
export type RegisterParticipantMutationFn = Apollo.MutationFunction<RegisterParticipantMutation, RegisterParticipantMutationVariables>;

/**
 * __useRegisterParticipantMutation__
 *
 * To run a mutation, you first call `useRegisterParticipantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterParticipantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerParticipantMutation, { data, loading, error }] = useRegisterParticipantMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterParticipantMutation(baseOptions?: Apollo.MutationHookOptions<RegisterParticipantMutation, RegisterParticipantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterParticipantMutation, RegisterParticipantMutationVariables>(RegisterParticipantDocument, options);
      }
export type RegisterParticipantMutationHookResult = ReturnType<typeof useRegisterParticipantMutation>;
export type RegisterParticipantMutationResult = Apollo.MutationResult<RegisterParticipantMutation>;
export type RegisterParticipantMutationOptions = Apollo.BaseMutationOptions<RegisterParticipantMutation, RegisterParticipantMutationVariables>;
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