install jekyll 
    -(Installation via Bash on Windows 10)
    https://jekyllrb.com/docs/windows/
    - then add gem support for github pages to jekyll
    - follow "Nokogiri gem installation for ubuntu" refer same jekyll page for nokagiri version
    - sudo gem install nokogiri -v '1.8.2'
    https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/

UPDATE PKGs (avoid IPv6)
    - bash
    - jekyll -v
    -- use -o Acquire::ForceIPv4=true
    -sudo apt-get update -y && sudo apt-get upgrade -y -o Acquire::ForceIPv4=true
    - sudo bundle update
    - sudo gem update jekyll

To RUN:
    -run in VScode: 
    - bash
    - bundle exec jekyll serve --host 0.0.0.0
    - website: http://127.0.0.1:4000/
    - in mobile open local ip of laptop http://192.168.1.109:4000

Bugs:
    - add top padding to apps & software on hp when # scroll

To-do:
    - bottom border of navbar
    # - jerrygoyal icon
    - minified css
    - SEO
    - 404 page redirection
    - hire me when console open