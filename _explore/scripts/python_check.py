from sys import version_info
from sys import version

MIN_PYTHON = (3, 7)

if version_info < MIN_PYTHON:
    raise Exception(
        "Python %s.%s or later is required.\nRunning Python %s\n"
        % (*MIN_PYTHON, version)
    )
