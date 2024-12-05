<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

Album Gallery
This is a simple React-based application that allows users to view albums and their corresponding images in a carousel. The app fetches album data for a user and displays a carousel of images for each album. It uses the react-responsive-carousel component to show the images in a smooth, swipeable carousel format.

Features
Fetches users from a backend API.
Allows selecting a user to view their albums.
Displays albums and images fetched from the backend.
Uses a carousel component to display images for each album.
Responsive layout for viewing images on both desktop and mobile devices.

Technologies Used
React: JavaScript library for building user interfaces.
TypeScript: Superset of JavaScript for type safety.
Material-UI: React component library for building UI components.
react-responsive-carousel: Carousel component for displaying images.
CSS: Styling for layout and design.
Mongoose: ODM (Object Data Modeling) library for MongoDB, used to interact with the database.
MongoDB: Database used to store users, albums, and images data.

Setup and Installation
Clone the repository to your local machine.

Install the required dependencies.
  npm install
To run frontend the application locally, use the following command:
  npm start from /elementor-photo-album folder

Backend Setup (Using Mongoose with MongoDB)
Install dependencies for the backend.
run npm install in root project folder
This will start the React app and open it in your browser at http://localhost:3000.

If you don't have the backend API for fetching users, albums, and images, you will need to create a mock API or replace the API calls with static data for testing.

Folder Structure

album-carousel-app/
├── public/               # Public assets
├── src/                  # Source code
│   ├── components/       # React components
│   ├── services/         # API functions
│   ├── App.tsx           # Main App component
│   ├── AlbumCarousel.tsx # Carousel component for displaying albums and images
│   └── index.tsx         # Entry point for React app
├── .gitignore            # Git ignore file
├── package.json          # Project dependencies and scripts
└── README.md             # This file

How it Works
App Component (App.tsx):

Fetches a list of users from the backend.
When a user is selected, their albums are fetched using the getAlbumsByUserId API call.
Each album is displayed with a title and a button to view the images.
AlbumCarousel Component (AlbumCarousel.tsx):

Fetches the images for a specific album using the getImagesByAlbumId API call.
Displays the images in a carousel using the react-responsive-carousel component.
API Service (services/api.ts):

Contains functions to interact with the backend API to fetch users, albums, and images:
getUsers(): Fetches a list of users.
getAlbumsByUserId(userId: string): Fetches the albums of a specific user.
getImagesByAlbumId(albumId: string): Fetches the images of a specific album.

API Example
1. Get Users
Endpoint: GET /api/users

Response:

json
Copy code
[
  {
    "_id": "1",
    "name": "John Doe"
  },
  {
    "_id": "2",
    "name": "Jane Smith"
  }
]
2. Get Albums by User ID
Endpoint: GET /api/users/{userId}/albums

Response:

json
Copy code
[
  {
    "_id": "101",
    "title": "Vacation 2023"
  },
  {
    "_id": "102",
    "title": "Family Photos"
  }
]
3. Get Images by Album ID
Endpoint: GET /api/albums/{albumId}/images

Response:

[
  {
    "url": "https://example.com/images/vacation1.jpg"
  },
  {
    "url": "https://example.com/images/vacation2.jpg"
  }
]

Usage
After the app loads, select a user by clicking the "View Albums" button next to their name.
Once a user is selected, their albums will be displayed.
Click on an album to view the images associated with it in a carousel.
Navigate through the images in the carousel using swipe gestures or arrows.

Customization
You can modify the getImagesByAlbumId, getAlbumsByUserId, and getUsers API calls to point to your own backend or use mock data for testing.
The carousel styling and layout can be customized by modifying the CSS or overriding the react-responsive-carousel component's styles.
Future Improvements
Implement a backend API for real data.
Add error handling for API requests (e.g., showing loading indicators or error messages).
Enhance accessibility (e.g., keyboard navigation for carousel).
Implement pagination for albums and images if there are many records.