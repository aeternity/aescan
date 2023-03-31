# Aescan Contributing Guide

Thank you for your interest in contributing to the Aescan project. Before submitting your contribution, please make sure to take a moment and read through the following guidelines:

- [Code of Conduct](https://github.com/aeternity/aescan/blob/develop/CODE_OF_CONDUCT.md)
- [Issue Reporting Guidelines](#issue-reporting-guidelines)
- [Git and Pull Request Guidelines](#git-and-pull-request-guidelines)
- [Development Environment Setup](https://github.com/aeternity/aescan#getting-started)
- [Project Structure](#project-structure)

## Issue Reporting Guidelines

### Where to Find Known Issues

We will be using GitHub Issues for our public bug reports. We will keep a close eye on this and try to make it clear when we have an internal fix in progress. Before filing a new issue, try to make sure your problem doesn't already exist.

### Reporting New Issues

All bug reports should be reported through Github issues and contain the following information:

* Release version of the application
* Expected behavior
* Current behavior

Additional images and/or videos presenting the issues, as well as known workarounds are much welcome.

### Feature submission

All future requests should be reported through Github issues and contain the following information:

* What problem does this feature solve?
* Are there already available any alternative ways to achieve similar results? If yes, please, describe them 

## Git and Pull Request Guidelines

If you are planning to fix an issue present in our latest release or implement a new feature, please follow the simplified flow described below:

* Create your own fork of the repository (maintainers may use the main repository).
* Originate your new branch that will contain the changes from the `develop` branch.
* Implement the changes. Respect currently implemented coding restrictions and guidelines.
* Run code linting through `npm run lint:fix` command and correct any issues that couldn't be automatically fixed.
* Push the new branch to your forked repository and open a Pull Request against the `develop` branch. Use the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) pattern for the PR name.
* Wait until your Pull Request is approved by the required number of maintainers and all automated checks are green
* Merge the pull request

Note: It's OK to have multiple small commits as you work on the PR - GitHub will automatically squash it before merging.

* Requirements for adding a new feature:
  * If you resolving a specific issue, add `feat(xxxx): [description]` (xxxx is the issue id) in your PR title for a better release log, e.g. `feat(360): add contract icons in Contracts view`.
  * Provide a convincing reason to add this feature. Ideally, you should open a suggestion issue first and have it approved before working on it.

* Requirements for fix of a bug:
  * In case you are resolving a specific issue, add `fix(xxxx): [description]` (xxxx is the issue id) in your PR title for a better release log, e.g. `fix(420): filtering dropdown doesn't work on Safari`.
  * Provide a detailed description of the bug in the PR. Live demo preferred.

For detailed information about our branching strategy or instructions on dealing with other scenarios, please read our [Branching Strategy](./docs/BRANCHING_STRATEGY.md) guidelines.

## Project Structure

* **`dist`**: contains built files that will be used for hosting the application using express.js webserver. The content of this directory is generated automatically during building process. Do not put there any files manually.

* **`docs`**: contains basic project documentation in a form of markdown files. 

* **`public`**: contains static assets that are meant to be publically available with guaranteed path. As opposed to the assets stored in src directory, during building process the name of these files will stay unchanged.

* **`src`**: contains the source code of the application. The codebase is written in ES2020.

  * **`assets`**: contains static assets that are meant to be publically available but the exact path will change with every build by adding an additional unique suffix to the name. 

  * **`components`**: contains (mostly) reusable Vue components.

  * **`plugins`**: contains code for implementing third-party services, mostly related to tracking.

  * **`router`**: contains the definition of all routes available in the application and informs which views are associated to these routes.  

  * **`stores`**: contains global data obtaining and storage structures implemented using Pinia

  * **`styles`**: contains global css snippets that are applied across the entire application.

  * **`utils`**: contains reusable helpers not directly tied to any specific business logic, and data adapters.

  * **`views`**: contains Vue components that represent all pages (known as views) of the application.
  
  * `App.vue`: is the root Vue component of the application.

  * `main.js`: is the entry point of the application where the critical subsystems are initialized.

  * `server.js`: is a simple express.js application used to serve the static data intended to use until the Server-side Rendering is fully implemented.

## Credits
Thank you to all the people who already contributed to the aeScan! You can find the complete list of them on [this page](https://github.com/aeternity/aescan/graphs/contributors).
