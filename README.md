# Jupyterhub Admin Dashboard - React Variant  
This repository contains current updates to the Jupyterhub Admin Dashboard service, 
reducing the complexity from a mass of templated HTML to a simple React web application.
This will integrate with Jupyterhub, speeding up client interactions while simplifying the 
admin dashboard codebase.  

### Build Commands  
First, `cp react-fe` then:  
- `yarn build`: Installs all dependencies and bundles the application  
- `yarn hot`: Bundles the application and runs a mock (serverless) version on port 8000  
- `yarn place`: Copies bundle into the hubextension's static javascript directory

