import os
pjoin = os.path.join

from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))

exec(open(pjoin(here,'jhadmin/version.py')).read()) # Load __version__

install_requires = [
    'tornado>=6.0.4',
    'traitlets',
    'jupyterhub>=1.0.0',
    'alembic',
    'pluggy'
]

extras_require = {
    'user': [
        'jhsingle-native-proxy>=0.6.0',
        'plotlydash-tornado-cmd>=0.0.6',
        'bokeh-root-cmd>=0.0.5',
        'rshiny-server-cmd>=0.0.2',
    ]
}

setup_metadata=dict(
    version=__version__,
    python_requires='>=3.6',
    author='Metrostar Systems',
    author_email='nbarber@metrostarsystems.com',
    license='BSD',
    url='',
    # this should be a whitespace separated string of keywords, not a list
    keywords="jupyterhub admin react",
    classifiers=[
        'Intended Audience :: Developers',
        'Intended Audience :: System Administrators',
        'Intended Audience :: Science/Research',
        'License :: OSI Approved :: BSD License',
        'Programming Language :: Python',
        'Programming Language :: Python :: 3',
    ],
    project_urls={
        'Source': 'https://github.com/MSS-AI/jh-admin-dashboard',
        'Tracker': 'https://github.com/MSS-AI/jh-admin-dashboard/issues'
    },
    platforms="Linux, Mac OS X",
    description="React variant of JupyterHub admin page"
    )

# Data files e.g. templates and static js

share_admin_dashboard = pjoin(here, 'share', 'jhadmin')

def get_data_files():
    """Get data files in share/jhadmin"""

    data_files = []
    ntrim = len(here + os.path.sep)

    for (d, _, filenames) in os.walk(share_admin_dashboard):
        data_files.append((d[ntrim:], [pjoin(d, f)[ntrim:] for f in filenames]))
    return data_files

def get_package_data():
    """
    Get package data
    """
    package_data = {}
    return package_data


setup_metadata.update(dict(
    name='jhadmin',
    packages=find_packages(),
    package_data=get_package_data(),
    data_files=get_data_files(),
    install_requires=install_requires,
    extras_require=extras_require
))

setup(
    **setup_metadata
)
