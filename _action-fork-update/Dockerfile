FROM debian:stable-slim

LABEL "com.github.actions.name"="Run Forked Data Update From"
LABEL "com.github.actions.description"="Run the complete MASTER data update from a forked repo."
LABEL "com.github.actions.icon"="refresh-cw"
LABEL "com.github.actions.color"="blue"

LABEL "repository"="https://github.com/LLNL/llnl.github.io"
LABEL "homepage"="https://software.llnl.gov"

RUN apt-get update && apt-get install \
    -y --no-install-recommends curl git python3 python3-virtualenv

COPY hub-linux-amd64-2.12.4.tgz /hub-linux-amd64-2.12.4.tgz
RUN tar -zxf /hub-linux-amd64-2.12.4.tgz -C / && rm /hub-linux-amd64-2.12.4.tgz
RUN /hub-linux-amd64-2.12.4/install

RUN python3 -m virtualenv --python=/usr/bin/python3 /opt/venv
RUN . /opt/venv/bin/activate && pip install llnl-scraper

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
