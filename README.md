# Automatic Formatting [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
Building a nodejs javascript formatting service build on prettier, that can handle github webhooks and the github api to provide formatting during pullrequests.

This is currently not using as many promises as desired, but on the other hand the formatting is pretty quick.

## How does it work?

It reacts to three different eventgroups send via webhook:
- push: if the branch is within a pullrequest it'll be checked and if required formatted
- pull_request: changes the flag for formatting purposes
- delete: if a branch is deleted will also delete the checkout of it

## NPM
NPM is avaible as well, see https://www.npmjs.com/package/@idrinth/automatic-formatting.
Installation works as usual, so
```
npm install @idrinth/automatic-formatting
```
just remember to adjust the configuration afterwards, that user does not exist.
