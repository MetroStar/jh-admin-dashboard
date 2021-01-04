import sys, re
from tornado.web import authenticated
from jupyterhub.handlers.base import BaseHandler

class AdminHandler(BaseHandler):
    @authenticated
    async def get(self):

        current_user = await self.get_current_user()

        html = self.render_template(
            "admin.html",
            base_url=self.settings['base_url'],
            current_user=current_user,
        )
        self.write(html)