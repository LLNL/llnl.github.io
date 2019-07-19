FROM fedora:latest

LABEL "com.github.actions.name"="Run Data Update"

LABEL "repository"="https://github.com/LLNL/llnl.github.io"

# RUN apt-get update && apt-get install \
#     -y --no-install-recommends python3 python3-virtualenv

# RUN python3 -m virtualenv --python=/usr/bin/python3 /opt/venv

# RUN . /opt/venv/bin/activate && pip install llnl-scraper

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
