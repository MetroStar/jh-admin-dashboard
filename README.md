# Jupyterhub Admin Dashboard - React Variant  
This repository contains current updates to the Jupyterhub Admin Dashboard service, 
reducing the complexity from a mass of templated HTML to a simple React web application.
This will integrate with Jupyterhub, speeding up client interactions while simplifying the 
admin dashboard codebase.  

### Build Commands  
- `yarn build`: Installs all dependencies and bundles the application  
- `yarn hot`: Bundles the application and runs a mock (serverless) version on port 8000  

### Directory Tree 
<!-- ```
jh-admin-dashboard
|   .gitignore
|   README.md
|
|___admin-react-fe
    |   package.json
    |   webpack.config.json
    |   yarn.lock
    |
    |___build
    |   |   admin.fe.js
    |   |   index.html    
    |
    |___src
        |   App.jsx    

``` -->

.
+-- _config.yml
+-- _drafts
|   +-- begin-with-the-crazy-ideas.textile
|   +-- on-simplicity-in-technology.markdown
+-- _includes
|   +-- footer.html
|   +-- header.html
+-- _layouts
|   +-- default.html
|   +-- post.html
+-- _posts
|   +-- 2007-10-29-why-every-programmer-should-play-nethack.textile
|   +-- 2009-04-26-barcamp-boston-4-roundup.textile
+-- _data
|   +-- members.yml
+-- _site
+-- index.html