FROM fedora:latest

RUN apt-get update && apt-get install \
    -y --no-install-recommends python3 python3-virtualenv

RUN python3 -m virtualenv --python=/usr/bin/python3 /opt/venv

RUN . /opt/venv/bin/activate && pip install llnl-scraper

CMD ["echo", "Hello World"]
