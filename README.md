# tournament-administration-system

An administration tool for managing tournaments at LAN parties.

## Intent

This project aims to provide a tool for managing locally organised (video) game tournaments.
It allows for the following operations:

- Register events
- Create tournaments within events (e.g. League of Legends Pro)
- Create brackets within tournaments (e.g. Swiss Rounds into Single Elimination)
- Create matches within brackets (e.g. Match #1 in a Best of 3)
- Register users that attend events
- Create teams (consisting of users)
- Generate a ranking at the end of the tournament

All the recorded info will be saved to a relational database.
Therefore, you can later browse through past events and look up the results.

## Model, Entities and Attributes

Even though most entities have meaningful and descriptive names (see the database ERD further down), it
is not always clear what exactly their purpose is. Furthermore, there are many attributes whose meaning
cannot necessarily be derived from the name alone. That is why we have a comprehensive list of the entities
and their attributes here. Primary identifiers, resp. IDs or Primary Keys, will be omitted, but each
entity has one (as shown on the ERD).

### Event

An occasion, in our case it will mostly be a LAN party. Can and usually does last more than one day.

| Attribute | Description                                 |
|-----------|---------------------------------------------|
| name      | Name of the event, e.g. `Lock and Load 17`  |

### Game

The entity `Game` provides a store for a list of games and their logo URL. The logo is used on the tournament
details page.

| Attribute | Description                                |
|-----------|--------------------------------------------|
| name      | Name of the game, e.g. `League of Legends` |
| logo_url  | Link to where the game's logo is stored    |

### Tournament

This is the heart of the model, everything revolves around it. A `Tournament` is a competitive fight
between players (tournament participants) in a specific game and at a specific event. There can be multiple
tournaments for the same game at the same event, maybe with different rules or at different times. At the
end of the tournament, there will be a ranking over all the players that initially entered. A tournament
can have different parts (brackets), e.g. Swiss rounds that are later leading to a knockout stage for the
best `n` participants.

| Attribute            | Description                                                                                                                                    |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| event_id             | Identifier of the corresponding event                                                                                                          |
| game_id              | Identifier of the corresponding game                                                                                                           |
| name                 | Name of the tournament, e.g. `Rocket League 3v3`                                                                                               |
| is_published         | Flag whether the tournament is publicly visible or not                                                                                         |
| category             | Category that determines the prize pool, e.g. `Pro`                                                                                            |
| registration_group   | Group that restricts entering another tournament of the same group                                                                             |
| rules                | Detailed text about tournament rules that players must abide by                                                                                |
| prize_first          | Prize for the winning participant, e.g. `1000.-`                                                                                               |
| prize_second         | Prize for the second-placed participant, e.g. `750.-`                                                                                          |
| prize_third          | Prize for the third-placed participant, e.g. `500.-`                                                                                           |
| num_players_per_team | Number of players per team, e.g. `3`                                                                                                           |
| min_participants     | Minimum number of participants for the tournament to take place, e.g. `8`<br/>Refers to teams for team games and players for solo player games |
| max_participants     | Maximum number of participants that can take part, e.g. `64`<br/>Refers to teams for team games and players for solo player games              |
| max_substitutes      | Maximum number of substitutes allowed in a team, e.g. `1`                                                                                      |
| briefing_time        | Time at which the initial tournament briefing will be held                                                                                     |

### User

A `User` is a person attending an event. They can operate the application and therefore use the GUI to show available
tournaments and join them.

| Attribute       | Description                                                    |
|-----------------|----------------------------------------------------------------|
| name            | Name of the user (doesn't have to be the real name)            |
| seat            | Seat number, indicating where the user is sitting at the event |
| is_global_admin | Flag whether the user is a global admin or not                 |

### Team

A `Team` is a tournament-specific, ad hoc group of players planning to participate in a single tournament. Needs at
least as many players as needed to play the game and at most the allowed number of substitutes on top of it. Not to
be confused with _Clan_.

| Attribute | Description                                                                                               |
|-----------|-----------------------------------------------------------------------------------------------------------|
| name      | Name of the team, can be chosen by the team captain but shouldn't contain offensive language, slurs, etc. |
| tag       | Abbreviation of the team name, at most 3 characters, only letters and numbers allowed                     |

### Tournament_Admin

This is a connector entity between `Tournament` and `User`. Users that have an entry in here are administrators for
the corresponding tournament, meaning they are shown as persons to contact in regard to that tournament.

| Attribute     | Description                                |
|---------------|--------------------------------------------|
| tournament_id | Identifier of the corresponding tournament |
| user_id       | Identifier of the corresponding user       |

### Team_Member

This is a connector entity between `User` and `Team`. Users that have an entry in here are members of the corresponding
team(s).

| Attribute       | Description                                      |
|-----------------|--------------------------------------------------|
| team_id         | Identifier of the corresponding team             |
| user_id         | Identifier of the corresponding user             |
| is_team_captain | Flag whether the team member is the team captain |

### Tournament_Participant

This is basically a complex connector entity between `Tournament` and `User` **or** `Tournament` and `Team`, depending
on whether it is a team tournament or solo player tournament. Users, resp. teams, that have an entry in here are
registered for the corresponding tournament.

| Attribute     | Description                                                                                                                                       |
|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| tournament_id | Identifier of the corresponding tournament                                                                                                        |
| user_id       | Identifier of the corresponding user, will be empty for team tournaments                                                                          |
| team_id       | Identifier of the corresponding team, will be emtpy for solo player tournaments                                                                   |
| initial_seed  | Initial seed given to the player/team (manually done by tournament admins depending on the estimated strength compared to the other participants) |
| final_rank    | Final rank for the participant after the tournament has finished                                                                                  |

### Bracket

A `Bracket` is a part of the tournament where certain predefined rules apply. The number of rounds and the mode are
defined before the bracket starts. A tournament can have more than one bracket. Example: 7 Swiss rounds (bracket 1),
where the best 4 participants advance to a single elimination bracket (bracket 2) with 2 semifinals and a final.

| Attribute                     | Description                                                                                                                                    |
|-------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| tournament_id                 | Identifier of the corresponding tournament                                                                                                     |
| type                          | Bracket mode, e.g. `Swiss Rounds` or `Double Elimination`                                                                                      |
| state                         | State of the bracket, e.g. `Planned`, `Running`, `Finished`                                                                                    |
| num_participants              | Definite number of participants for this bracket, cannot be modified once the bracket starts                                                   |
| num_rounds                    | Number of rounds for this bracket, e.g. `7`                                                                                                    |
| is_draw_allowed               | Flag whether a draw/tie is allowed within this bracket                                                                                         |
| use_seeding_from_prev_bracket | Flag whether the seeding from the previous bracket should be used or ignored                                                                   |
| points_for_victory            | Points given to the winner of a bracket round                                                                                                  |
| points_for_draw               | Points given to each of the contestants of a bracket round that ends in a draw                                                                 |
| points_for_defeat             | Points given to the loser of a bracket round                                                                                                   |

### Bracket_Round

A single round of a bracket, consisting of one (Best of 1) or more (Best of 3, Best of 5, etc.) matches.

| Attribute                  | Description                                                                           |
|----------------------------|---------------------------------------------------------------------------------------|
| bracket_id                 | Identifier of the corresponding bracket                                               |
| index                      | Used to indicate the bracket round number within the bracket                          |
| format                     | Bracket round format, e.g. `Best of 3` resp. `Bo3`                                    |
| state                      | State of the bracket round, e.g. `Planned`, `Running`, `Finished`                     |
| num_participants_per_match | Number of participants per match (usually 2, but can be different for Battle Royales) |
| start_time                 | Planned start time of the bracket round                                               |

### Match

Represents a single match between 2 or more participants.

| Attribute        | Description                                                        |
|------------------|--------------------------------------------------------------------|
| bracket_round_id | Identifier of the corresponding bracket round                      |
| state            | State of the match, e.g. `Planned`, `Running`, `Finished`          |
| admin_notes      | Used for miscellaneous information about the match, e.g. `Forfait` |

### Match_Participant

A connector entity between `Tournament_Participant` and `Match`.

| Attribute                 | Description                                                    |
|---------------------------|----------------------------------------------------------------|
| match_id                  | Identifier of the corresponding match                          |
| tournament_participant_id | Identifier of the corresponding tournament participant         |
| in_game_name              | IGN of the player, often differs from the user name            |
| seed                      | May be relevant for generating the next round's match up       |
| score                     | Final score which determines the winner/leaderboard of a match |

## Tech Stack

The app consists of a **database**, a **backend** (server-side), and a **frontend** (client-side).
The frontend sends requests to the backend via API. The communication between these parts looks like so:
![Frontend_Backend_Communication](/common/documentation/Frontend_Backend_Communication.png)

### Frontend

The client-side code is written in [Typescript](https://www.typescriptlang.org/docs/), using
the [React](https://react.dev/) framework.
For a consistent look, we use [MaterialUI](https://mui.com/material-ui/getting-started/) or MUI.

### Backend

The backend is implemented with [Node.js](https://nodejs.org/docs/latest/api/), using
the [NestJS](https://docs.nestjs.com/) framework.
The server-side code is also written in [Typescript](https://www.typescriptlang.org/docs/).
Additionally, [TypeORM](https://typeorm.io/) is used to simplify the database modeling and communication.
For database queries and mutations, we use [GraphQL](https://graphql.org/).

### Database

The app uses a [MySQL](https://dev.mysql.com/doc/refman/8.4/en/) database.
The entity relationship diagram looks as follows:

![Database ERD](/common/documentation/Tournament_ERD.drawio.png)

## Additional Tools

To test API calls and build GraphQL queries, we use the tool [Bruno](https://www.usebruno.com/).
For development purposes, the backend together with the database runs on a
[VPS](https://en.wikipedia.org/wiki/Virtual_private_server) and is hosted on the following site:
[psvacha.net](https://psvacha.net/tournament-module).