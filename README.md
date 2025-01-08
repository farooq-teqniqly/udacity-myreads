# Project MyReads - A Book Tracking App

This repository contains the code for the MyReads Project which is part of the [Udacity React nanodegree](https://www.udacity.com/course/react-nanodegree--nd019?ranMID=53187&ranEAID=/jZHTpnCvx8&ranSiteID=_jZHTpnCvx8-lXPc4UmXB85ph7Gkz69thQ&utm_source=affiliates).

The template is configured with Husky, providing the following benefits:

- **Pre-commit checks on staged files**: When files are committed locally, Husky will:
    - Format the files using [Prettier](https://prettier.io/).
    - Lint the files using [ESLint](https://eslint.org/).
    - Run end-to-end tests.
      If any step fails, the commit is blocked to maintain a high level of code quality.
- **Commit message standardization**: Ensures commit messages adhere to a [standard format](https://commitlint.js.org/concepts/commit-conventions.html) with the help of [commitlint](https://commitlint.js.org/). The default configuration can be customized by editing `commitlint.config.js` in the repository root.

## Running the Application

### Prerequisites
- **Node.js**: Ensure Node.js (version 20 or later) is installed.
- **npm**: Ensure npm (version 10 or later) is installed.

### Install Husky Dependencies
Run the following command in the **repository root** to install Husky and its dependencies:

```bash
npm install
```
> Note: Do not install any React app-related packages in the root folder.

## Install React Application Dependencies
The React application files are located in the `fe` (frontend) directory. Navigate to the `fe` directory and run:
```bash
npm install
```
This will install the application's dependencies, including Cypress.

> Rationale: The root folder contains only dependencies related to Husky, allowing for potential future additions like a backend folder that can also utilize Husky's features.

## Run the Application

To start the application, navigate to the `fe` directory and run:

```bash
npm run dev
```
By default, Vite hosts the application at http://localhost:5173.

## Run the End-to-End Tests
There are two ways to run Cypress end-to-end tests: using the Cypress UI or in headless mode.

### Run End-to-End Tests in the Cypress UI

> Note: Ensure the application is running using npm run dev and is accessible at http://localhost:5173.

In the `fe` folder, run the following command to open the Cypress UI:
```bash
npm run e2e:ui
```

### Run End-to-End Tests in Headless Mode

> Note: Ensure the application is running using npm run dev and is accessible at http://localhost:5173.

In the `fe` folder, run the following command to execute the Cypress tests in headless mode:
```bash
npm run e2e:ci
```
