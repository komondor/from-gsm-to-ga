
ARG VARIANT=16-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:${VARIANT}

############################################################################
# INSTALL GO
############################################################################

RUN wget https://dl.google.com/go/go1.16.4.linux-amd64.tar.gz
RUN tar -C /usr/local -xzf go1.16.4.linux-amd64.tar.gz
RUN export PATH=$PATH:/usr/local/go/bin


############################################################################
# INSTALL ACT
############################################################################


RUN /usr/local/go/bin/go  install github.com/nektos/act@v0.2.23



