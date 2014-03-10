# Rizzo

## Create a new Javascript Component

    $ yo rizzo:javascript-component "newComponent"

This will create a new javascript file with some boilerplate code in it, as well as an accompanying spec and optional fixtures.


## Create a new Styleguide Component

Let's assume you want to create a new component called "Foo Bar" (original, I know), here is how you would do it:

    $ yo rizzo:styleguide-component "Foo Bar"

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

