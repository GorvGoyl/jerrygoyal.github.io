# FIREBASE -------------------------------------------------------------

## DEPLOY

bundle exec jekyll build
firebase deploy --only hosting -m "added x feature"
gitacp "added x feature"

firebase deploy -m "added x feature"
shortcut for jk build,deply hosting, gitacp

- jkBuild_FbHost_GitAcp my_message

https://firebase.google.com/docs/cli#deploy_specific_functions
firebase deploy --only functions:function1,functions:function2

# JEKYLL ----------------------------------------------------------------------------

## UPDATE PKGs (avoid IPv6)

    - bash
    - jekyll -v
    -- use -o Acquire::ForceIPv4=true
    -sudo apt-get update -y && sudo apt-get upgrade -y -o Acquire::ForceIPv4=true
    - sudo bundle update
    - sudo gem update jekyll

## To RUN:

    - bundle exec jekyll serve --strict_front_matter
    - bundle exec jekyll serve --host 0.0.0.0
    - website: http://127.0.0.1:4000/
    - in mobile open local ip of laptop http://192.168.1.109:4000

## Build

    - bundle exec jekyll build

## Jekyll Cheatsheet:

    - https://devhints.io/jekyll
    - https://learn.cloudcannon.com/jekyll-cheat-sheet/

## Resources

- https://github.com/planetjekyll/awesome-jekyll-plugins
- https://github.com/digitalsparky/jekyll-minifier
- https://github.com/souldanger/jekyll-pwa-workbox
- https://github.com/gemfarmer/jekyll-debug
- https://github.com/jekyll/jekyll-seo-tag
- https://github.com/jekyll/jekyll-sitemap - done

## production env, deployment

- https://jekyllrb.com/docs/step-by-step/10-deployment/
- https://jekyllrb.com/docs/configuration/environments/

## Bugs:

## Test:

    - different browsers - mac safari, firefox, chrome
    - test in phone - android, iPhone

## To-do:

    - name of company as hyperlink... maybe icon also
    - dark theme toggle button
    - hire me when console open
    - minified css
    - SEO
    - 404 page redirection
    - analytics

## Could-Do:

    - scroll up button
    - font
    - bg color
    - blogs
    - additional skills buttons
    - hobbies/interest
    - share social buttons
    - jerrygoyal icon
