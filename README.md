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

## Tech Stack
The app consists of a **database**, a **backend** (server-side), and a **frontend** (client-side).
The frontend sends requests to the backend via API.

### Frontend
The client-side code is written in [Typescript](https://www.typescriptlang.org/docs/), using the [React](https://react.dev/) framework.
For a consistent look, we use [MaterialUI](https://mui.com/material-ui/getting-started/) or MUI.

### Backend
The backend is implemented with [Node.js](https://nodejs.org/docs/latest/api/), using the [NestJS](https://docs.nestjs.com/) framework.
The server-side code is also written in [Typescript](https://www.typescriptlang.org/docs/).
Additionally, [TypeORM](https://typeorm.io/) is used to simplify the database modeling and communication.
For database queries and mutations, we use [GraphQL](https://graphql.org/).

### Database
The app uses a [MySQL](https://dev.mysql.com/doc/refman/8.4/en/) database.
The entity relationship diagram looks as follows:

![Database ERD](/common/documentation/Tournament_ERD.drawio.png)

## Additional Tools
To test API calls and build GraphQL queries, we use the tool [Bruno](https://www.usebruno.com/).
The backend together with the database runs on a [VPS](https://en.wikipedia.org/wiki/Virtual_private_server).