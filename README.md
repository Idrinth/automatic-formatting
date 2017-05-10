# Automatic Formatting

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![Build Status](https://travis-ci.org/Idrinth/automatic-formatting.svg?branch=master)](https://travis-ci.org/Idrinth/automatic-formatting) [![Code Climate](https://codeclimate.com/github/Idrinth/automatic-formatting/badges/gpa.svg)](https://codeclimate.com/github/Idrinth/automatic-formatting) [![Test Coverage](https://codeclimate.com/github/Idrinth/automatic-formatting/badges/coverage.svg)](https://codeclimate.com/github/Idrinth/automatic-formatting/coverage) [![Issue Count](https://codeclimate.com/github/Idrinth/automatic-formatting/badges/issue_count.svg)](https://codeclimate.com/github/Idrinth/automatic-formatting)

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

## Configuration

There are two relevant configurations. For one there is a configuration for the service, see config.json for example.
There is also a per-project option of configuring prettier and the include/exclude lists by using a .idrinth.automatic-formatting.json file in the root of your project.
Other keys in this file will be ignored.
