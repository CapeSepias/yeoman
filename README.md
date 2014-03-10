# Yeoman

This repository contains the [Yeoman generators][yo-generators] used for our projects/apps.

Before you get started using any of these, be sure to [install Yeoman][yo-install] on your machine.



## Usage

Usage should be baked into whichever project is being worked on (see [Creating a new generator](#creating-a-new-generator-for-lonely-planet) below on how to do this) so the working directory for each of the following examples will be relative to the root directory of that project.

Be sure to run `npm install` within each project's root directory so the generators get installed.



## Creating a new generator for Lonely Planet

The generators for each app need to be defined within their own branch in this repository - the branch name preferably being the name of the app in question. The reason for this is that in order to include this within the app, we need to add a dependency to the app's `package.json` file.

Taking the example of Rizzo, we would add the following to the list of dependencies in Rizzo's `package.json`:

    "yeoman-generators": "git+ssh://git@github.com:lonelyplanet/yeoman#rizzo"

This will install the rizzo generators from the `rizzo` branch on this repo locally to the `node_modules` folder in your rizzo project folder.



## IMPORTANT

Do NOT under any circumstance merge any of these branches into master... you *are* going to have a bad time!

[yo-generators]:http://yeoman.io/generators.html
[yo-install]:http://yeoman.io/gettingstarted.html
