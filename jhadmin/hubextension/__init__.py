import os
from jupyterhub.handlers.static import CacheControlStaticFilesHandler
from tornado.web import StaticFileHandler
from .main import AdminHandler
# from .core import OurHomeHandler
from .._data import DATA_FILES_PATH

jhadmin_extra_handlers = [
    (r'admin-react', AdminHandler),
    (r'custom-static/(.*)', StaticFileHandler, dict(path=os.path.join(DATA_FILES_PATH, "static")))
]