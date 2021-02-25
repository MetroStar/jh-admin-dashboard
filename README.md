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
- `yarn snap`: Updates the stored jest snapshot of the components
- `yarn lint`: Lints the Javascript src directory with eslint and prettier
- `{ yarn lint:fix || yarn lint --fix }`: Lints the Javascript src directory, fixing any possible issues

### Build Commands (pip package)  
- `pip install -e .`: Installs the package locally, directly from the source, for development  

### What to add to your Jupyterhub config:  
```python
from jhadmin.app import JH_ADMIN_TEMPLATE_PATHS
from jhadmin.hubextension import jhadmin_extra_handlers
c.JupyterHub.template_paths = JH_ADMIN_TEMPLATE_PATHS
c.JupyterHub.extra_handlers = jhadmin_extra_handlers
```

## React UI Views:

### Server Dashboard Page:  
Main dashboard component allowing an admin to start/stop the hub's servers as well as perform user moderation.  

![serverdashboard](https://github.com/MetroStar/jh-admin-dashboard/blob/master/documentation/screenshots/Dashboard-Home.png?raw=true)

### Add User Page:  
React view for adding users and selecting their privilege level.  

![addusers](https://github.com/MetroStar/jh-admin-dashboard/blob/master/documentation/screenshots/AddUsers.png?raw=true)


### Edit User Page:
React view for delegating or revoking admin privilege as well as updating user names.  

![edituser](https://github.com/MetroStar/jh-admin-dashboard/blob/master/documentation/screenshots/EditUser.png?raw=true)


### Group List Page:
React view for listing available groups of users.  

![grouplist](https://github.com/MetroStar/jh-admin-dashboard/blob/master/documentation/screenshots/GroupList.png?raw=true)


### Group Edit Page:
React view for adding or removing users from a group.  

![GroupEdit](https://github.com/MetroStar/jh-admin-dashboard/blob/master/documentation/screenshots/GroupEdit.png?raw=true)

