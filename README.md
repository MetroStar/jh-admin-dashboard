# Jupyterhub Admin Dashboard - React Variant  
This repository contains current updates to the Jupyterhub Admin Dashboard service, 
reducing the complexity from a mass of templated HTML to a simple React web application.
This will integrate with Jupyterhub, speeding up client interactions while simplifying the 
admin dashboard codebase.  

This service relies heavily on front-end web services, leaving little to be expected from the python/tornado server 
side template rendering system JupyterHub is accustomed to. Therefore, most of the heavy lifting is done on the React end.

### Build Commands (react)   
First, `cp react-fe` then:  
- `yarn build`: Installs all dependencies and bundles the application  
- `yarn hot`: Bundles the application and runs a mock (serverless) version on port 8000  
- `yarn place`: Copies bundle into the hubextension's static javascript directory
- `yarn test`: Runs Jest/Enzyme unit tests on all the presentational components

### Build Commands (pip package)  
- `pip install -e .`: Installs the package locally, directly from the source, for development  

### What to add to your Jupyterhub config:  
```python
from jhadmin.app import JH_ADMIN_TEMPLATE_PATHS
from jhadmin.hubextension import jhadmin_extra_handlers
c.JupyterHub.template_paths = JH_ADMIN_TEMPLATE_PATHS
c.JupyterHub.extra_handlers = jhadmin_extra_handlers
```
