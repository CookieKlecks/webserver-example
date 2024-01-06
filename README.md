# Webserver-Example to Teach HTTP Requests

A simple web server to teach and visualize HTTP requests.

# 1. Using This Project

This section explains how to run this project.
If you want to modify this project, please check the next section.

## Running with Docker (locally)

The simplest solution to run this project locally is to use [Docker](https://www.docker.com/):

1. Install [Docker](https://www.docker.com/) on your machine.
2. Run `docker compose up --build` in the root of this project
3. The server should now be available under `localhost:10000` and the frontend under `localhost:80`

## Running with Docker (on server)

To run this service on a server, you have to first build and publish the docker images of the server and frontend to any
docker repository of your choice.

#### Build and Push Docker Images

```shell
# currently at root of project

# 1. build and push server image
cd server
# build the server image. You have to set the name according to the desired name of this image in your docker repository
docker build -t SERVER_IMAGE_NAME:[TAG] .
docker push SERVER_IMAGE_NAME:[TAG]

# 2. build an push frontend image
cd ../frontend
# build the server image. You have to set the name according to the desired name of this image in your docker repository
# WARNING: make sure that the .env file is correct
docker build -t FRONTEND_IMAGE_NAME:[TAG] .
docker push FRONTEND_IMAGE_NAME:[TAG]
```

#### Start Service on Server with Docker Compose

In the root of this project is a `docker-compose.yml` file.
This can be used to start both the front- and backend on the server:

1. Copy `docker-compose.yml` to the server.
2. Uncomment the `image` subsection in the `server` and `frontend` block.
   Make sure to update the image names to the names of your docker repository as in the previous step.
3. Comment the `build` subsection in the `server` and `frontend` block.
   Otherwise, the docker compose command will try to build the images on the server and fail.
4. **Optional**: Update the port mappings (e.g., `80:80`) to avoid port conflicts on the server.
   If you want to expose the frontend on the server on port `1337`, update the port mapping in the `frontend` block
   to `1337:80`.
5. Start this docker compose file with:
```shell
docker compose up -d
```

Both services are now locally available on the server:
- Frontend: `localhost:80` or the port you specified in step 4
- Server.: `localhost:10000` or the port you specified in step 4

To make the services **publicly available**, you can now use a reverse proxy as **NGINX**.

## Running with Node (locally)
If you can not or don't want to install docker, you can also start this service locally with [Node.js](https://nodejs.org/en).

See section [2.1 Installation (Development Mode)](#21-installation--development-mode-) for this option.

# 2. For Developers of This Project

The section introduces new developers of this project to the installation and running in the development mode.
We further present the project structure and give simple examples on how to further develop this project.

## 2.1 Installation (Development Mode)

### 2.1.1 Prerequisites

The following software must be installed on your machine to run this project in the development mode:

* [Node.js](https://nodejs.org/en) (version 16 or higher)
* (optional) [Docker](https://www.docker.com/) (only if you want to update/develop the docker images!)

### 2.1.2 First Installation

After installing node, you have to install all packages of the server and frontend service.

#### First Installation (Server)

Navigate to the `./server` folder and run `npm install`.

```bash
# currently at root level of this project
cd server
npm install
```

#### First Installation (Frontend)

Navigate to the `./frontend` folder and run `npm install`.

```bash
# currently at root level of this project
cd frontend
npm install
```

### 2.1.3 Setting up .env-Files

This project uses `.env` files to handle user specific values.
Currently **only the frontend** uses `.env` files.
**Before starting the app** you have to do the following steps:

1. Create the file `.env` in the folder `./frontend`.
2. Copy the content of `.env.example` into the new `.env` file.
3. Update the values of the specified variables as needed in your specific case

Following environmental variables are required for the frontend:

| Variable name         | Example                | Description                                                                                                                                                                                                                                                                                               |
|-----------------------|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `REACT_APP_WEBSOCKET` | `ws://localhost:10000` | Set this to the URL of the server component of this project. Pay attention that you specify the correct port. If you run it locally, you can check the port of the server component in the file `server/src/index.ts` in the constant `USED_PORT`. Or check the console output after starting the server. |

**WARNING:** After editing the `.env` file, you have to completely restart the frontend service.
This is because React does not load the `.env` files dynamically, only at start up!

### 2.1.4 Running the Services in Development Mode

After installing all packages via npm and setting up the `.env` files, you can start the services locally.

#### Starting the Server (Dev Mode)

Navigate to the `server` folder and run `npm run start:dev`:

```shell
# currently at root level of this project
cd server
npm run start:dev
```

Note: You can also start the server with `npm run start`, but the `start:dev` command has the advantage that server
automatically restarts after making changes in the code.

#### Starting the Frontend (Dev Mode)

Navigate to the `frontend` folder and run `npm run start`:

```shell
# currently at root level of this project
cd frontend
npm run start
```

### 2.1.5 Updating the Local Version

If a new version was published and you want to update your local version, you have to do the following:

1. Update git repository (`git pull --rebase`)
2. Update npm packages:
    ```shell
    # currently at root level of this project
   cd server
   npm install
   cd ../frontend
   npm install
   ```

Now you can start the new version as in subsection [2.1.4](#214-running-the-services-in-development-mode) explained.

## 2.1 Project Structure
This section explains the general structure of the project and where you can update what parts.

The project is separated in two folders:
- `./frontend`: Contains all code for the frontend, i.e., the visualization of the server.
- `./server`: Contains all code for the backend, i.e., the server to which the HTTP requests are being made.

### 2.1.1 Project Structure - Frontend
The frontend is a Typescript [React](https://react.dev/) project create with [Create React App](https://create-react-app.dev/), 
hence it has the default folder structure of:
- `public`: Main HTML-file, logos, fonts
- `src`: the actual source code

The `src` folder is structured as follows (paths relative to the `src` folder):
- `./index.tsx`: the main entrypoint of the React app
- `./App.tsx`: The main component
- `jun-styling.scss`: general styling file that controls global colors and other styling.
- `./pages`: Folder containing the components representing a single page in the app. E.g., the homepage or one page for each example.
- `./components`: Contains all reusable components.
- `./hooks`: Contains all custom hooks

Conventions in `components` folder:
- Each component should be in **its own folder** with the **same name** (**UpperCamelCase**).
  - In this folder should be a `.css` or `.scss` file with the same name as the component.
- If you want to organize **several components** in a folder, create a folder with a **lowerCamelCase** name.
  - Each component in this folder should again be in its own folder (UpperCamelCase)
  - Further nesting is allowed (if the naming conventions are met)

**TL;DR:** Components in folder with **UpperCamelCase**. Collection of component folders in folder with **lowerCamelCase** name.

### 2.1.2 Project Structure - Server
The server contains a single folder `./src`, that contains all source code in the following files:
- `index.ts`: main entrypoint of the server. Here is the websocket connection handled and the individual routes.
- `handleCORS.ts`: middleware to avoid CORS errors when sending HTTP request to the server from a browser.
- `startScreen.ts`: Helper function to generate the start screen in the command line for the server
- `facts.ts`: Contains the facts that are available via the facts endpoint

# 3. Troubleshooting

## No packages are shown in the frontend even after a successful request to the server

You can try the following steps:

1. Make sure that the `REACT_APP_WEBSOCKET` environmental variable for the frontend is set to the same URL as your
   successful request. **NOTE:** You must **restart/rebuild** the frontend after changing environmental files.
2. Check the console output of the frontend to see if there was an error with the websocket connection.
3. Check the logs of the server for any errors.

## `Error: Unexpected Token` or any other error of `tsc` (Typescript) when starting one of the services

Make sure that your node version is `es2022` compatible.
You can check your node version with `node --version`. If it is below `16.x.x` please update node and retry.