import os
from jupyterhub.handlers.static import CacheControlStaticFilesHandler
from .main import AdminHandler
# from .core import OurHomeHandler
from .._data import DATA_FILES_PATH

jh_admin_extra_handlers = [
    (r'admin-react', AdminHandler),
    (r'admin-react-static/(.*)', CacheControlStaticFilesHandler, dict(path=os.path.join(DATA_FILES_PATH, 'static')))
]