import sys
from os.path import join, abspath, dirname, exists, split

def get_data_files():
    path = abspath(dirname(__file__))
    starting_points = [path]
    if not path.startswith(sys.prefix):
        starting_points.append(sys.prefix)
    for path in starting_points:
        while path != '/':
            share_jhadmin = join(path, 'share', 'jhadmin')
            static = join(share_jhadmin, 'static')
            if all(exists(join(static, f)) for f in ['js']):
                return share_jhadmin
            path, _ = split(path)
    return ''


# Package managers can just override this with the appropriate constant
DATA_FILES_PATH = get_data_files()