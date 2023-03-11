# Personal Website
This repository contains the source code for the Express.js backend server and React.js frontend
client hosted at [lawrences.tech](https://www.lawrences.tech). The website is hosted on an AWS EC2 instance 
running Ubuntu 18.04 LTS and is served using NGINX with a reverse proxy to the Express.js server. 

This project started out as a way for me to learn the MERN stack (and learn JavaScript) and learn more about 
Single Page Applications, OAuth, web security, etc. and also to learn more about the DevOps side of things, 
like buying a domain name, setting up a server, configuring NGINX, setting up SSL certificates and so on. I am also 
hoping to use the site as a way to showcase various projects I'm working on in such a way that non-technical people can
interact with them. 

## Future Plans/Improvements
There are a number of things I would like to add/change to the project in the future, some of which are
listed below:
 - [x] Increase security by adding various security headers to all responses (CSP for XSS, cross-origin embedder and 
   frame policies for clickjacking, etc.)
   - [ ] Use latest CSP script-src directive to allow inline scripts to be executed using a nonce.
 - [ ] Setup a CI/CD pipeline which builds and tests the project on every push, and deploys the project
   to the server on every merge to master.
 - [ ] Use Redux to manage state on the frontend instead of React's Context API.
   - [ ] And Redux-Saga for async requests.
 - [ ] Aggregate logs from the server and client so they can be viewed and indexed in a single place (e.g. Kibana).
 - [ ] Setup "forgot password" functionality to allow users to reset their password by receiving a reset token/link via email.
 - [ ] Look into converting the backend (and maybe frontend) to TypeScript (again).

## Running the Project Locally
To run the project locally, you will need to have Node.js and NPM installed. You will also need to
have a MongoDB instance running locally. Once you have those installed, you'll need to create a `.env` file in the root directory
and set the following environment variables:

```bash
PORT={port to run the server on}
HOST={host to run the server on}
MONGO_URL={url to connect to MongoDB instance}
NODE_ENV={environment (development, production, etc.)}
SESSION_SECRET={secret used to sign session cookies}
```

You should then be able to run the following
commands to start the server and client:

#### Start the server and client using `concurrently`

```bash
npm run start
```

#### Build and serve the client

```bash
cd client
npx webpack build
npx serve -s dist
```


