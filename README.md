# Yeoman

This repository contains the [Yeoman generators][yo-generators] used for our projects/apps.

Before you get started using any of these, be sure to [install Yeoman][yo-install] on your machine.




## Usage

Usage should be baked into whichever project is being worked on (see [Creating a new generator](#creating-a-new-generator-for-lonely-planet) below on how to do this) so the working directory for each of the following examples will be relative to the root directory of that project.

Be sure to run `npm install` within each project's root directory so the generators get installed.




### Rizzo

There is currently only one (sub)generator configured for Rizzo and that is to create a new styleguide component (including all the styleguide templates you'll need).

*NOTE:* Having said that, the `yo rizzo` generator does nothing at the moment (*cough* dev day *cough*).

Let's assume you want to create a new component called "Foo Bar" (original, I know), here is how you would do it:

    ~/projects/rizzo $ yo rizzo:styleguide-component "Foo Bar"

Yeoman will now proceed to ask you a few questions and prompt you about overwriting a few files (you can type `d` at this point to view the diff if you want to be sure).

Here is the basics of what this generator will do for you:

+ Update the styleguide controller by adding:
    
        def foo_bar
          render '/styleguide/foo_bar'
        end

+ Update the left nav in the styleguide helper. How it updates depends on whether you choose a new nav group or not, supposing you add this item to the default "Components" section, it will add:

        {
          name: "Foo Bar",
          path: "/styleguide/foo_bar",
          extra_style: "nav__item--delimited"
        }

+ Update the routes file by adding:

        get 'styleguide/foo_bar' => 'styleguide#foo_bar'

+ Create a new view file for you at `app/views/components/_foo_bar.html.haml`.
+ Create a new *styleguide* view file for you at `app/views/styleguide/foo_bar.html.haml`.
+ Create a stylesheet file for you at `app/assets/stylesheets/_common-ui/_foo_bar.sass`.
+ *Optionally* create a data stub file (which will automatically get included in the styleguide view) at `app/data/styleguide/foo_bar_stubs.yml`.




## Creating a new generator for Lonely Planet

The generators for each app need to be defined within their own branch in this repository - the branch name preferably being the name of the app in question. The reason for this is that in order to include this within the app, we need to add a dependency to the app's `package.json` file.

Taking the example of Rizzo, we would add the following to the list of dependencies in Rizzo's `package.json`:

  "yeoman-generators": "git+ssh://git@github.com:lonelyplanet/yeoman#rizzo"

This will install the rizzo generators from the `rizzo` branch on this repo locally to the `node_modules` folder in your rizzo project folder.




## IMPORTANT

Do NOT under any circumstance merge any of these branches into master... you *are* going to have a bad time!

[yo-generators]:http://yeoman.io/generators.html
[yo-install]:http://yeoman.io/gettingstarted.html