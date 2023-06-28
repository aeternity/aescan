<a href="https://aescan.io">
    <p align="center">
        <img src="https://user-images.githubusercontent.com/46789227/220656060-996be170-90b6-4f4d-99d2-0b0083c09fe3.png" width="200px" />
    </p>
</a>

<a href="https://aescan.io">æScan</a> is a blockchain explorer, analytics platform, and decentralized smart contract navigation platform based on æternity.
</p>

## Table of contents

- [Introduction](#Introduction)
- [Getting started](#Getting-started)
- [Deployment stages](#Deployment-stages)
- [Browser compatibility](#Browser-compatibility)
- [Contribution](#Contribution)
- [Stay in touch](#Stay-in-touch)
- [Resources](#Resources)

## Introduction

With æScan you can easily navigate between different features and live statistics of æternity blockchain: keyblocks,
microblocks, accounts, transactions, smart contracts, names and tokens.

Blockchain data is retrieved from [æternity middleware](https://github.com/aeternity/ae_mdw)
and [æternity node](https://github.com/aeternity/aeternity).

Nuxt 3, Vue.js, Vite and Pinia provide the foundation for the project, enabling us to create a seamless and intuitive
user experience with Server Side Rendering enabled.

## Getting started

First, download an install [Node.js](https://nodejs.org/en/download). Version 16.10 or higher is required.

Clone æScan repository

```
git clone https://github.com/aeternity/aescan.git
```

Install required dependencies with yarn

```
yarn install
```

Copy content of `.env.example` file to `.env`

Run æScan in development mode with hot reload

```
yarn dev
```

A local instance of æScan will be available at http://localhost:8080.

### Other commands

Build and minify for production

```
yarn build
```

Lint js and css files

```
yarn lint
```

### Build docker image

Docker is used to run æScan in different deployment stages.

To build a docker image of æScan [Docker](https://www.docker.com) is required.

```
yarn install
docker build -t aescan .
docker run -p 80:80 aescan
```

## Deployment Stages

Three different deployment stages are available to test or use æScan:

<table>
    <tr>
        <th>Stage name</th>
        <th>URL</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>Production</td>
        <td>https://aescan.io</td>
        <td>Production environment deployed manually from the main branch by creating a release branch and merging an automatically created Release Pull Request.</td>
    </tr>
    <tr>
        <td>Development</td>
        <td>https://aescan.dev.aepps.com</td>
        <td>Development environment deployed automatically after every push to the develop branch.</td>
    </tr>
    <tr>
        <td>PR preview</td>
        <td>https://pr-[PR-id]-aescan.stg.aepps.com</td>
        <td>Pull Request preview deployed automatically after every commit to an open pull request.</td>
    </tr>
</table>

## Browser compatibility

Supports [evergreen](https://nuxt.com/blog/v3#the-browser-and-nodejs-support) browsers only.

The core browser set targets the 2 most recent major versions of Chrome, Firefox, and Edge on a monthly basis and Safari
on a yearly basis.

## Tooling

This project uses [Applitools Visual AI](https://applitools.com/) as part of its automated testing.

## Contribution

We welcome contributions to our repository! If you have an idea for a new feature or a fix for a bug, please feel free
to open an issue and/or a pull request. We encourage you to read the full [Contribution Guidelines](./CONTRIBUTING.md)
to learn more about the project structure, good practices and rules to follow.

## Stay in touch

Join [æternity forum](https://forum.aeternity.com) and participate in discussions. Share your ideas, ask questions, and
get involved!

Stay up-to-date on the latest developments in the æternity ecosystem by following us on social media.

- [Forum](https://forum.aeternity.com/)
- [Twitter](https://twitter.com/aeternity)
- [Youtube](https://www.youtube.com/@aeternityblockchain)
- [Reddit](https://www.reddit.com/r/Aeternity/)
- [Linkedin](https://www.linkedin.com/company/aeternity)
- [Telegram](https://telegram.me/aeternity)

## Resources

Want to learn more about æternity and how it's revolutionizing the world of blockchain technology? Check out our
website, Github repositories and blog for more information.

- [æternity homepage](https://www.aeternity.com)
- [æternity blog](https://blog.aeternity.com)
- [æternity middleware](https://github.com/aeternity/ae_mdw)
- [æternity node](https://github.com/aeternity/aeternity)
- [æternity node API](https://api-docs.aeternity.io)
