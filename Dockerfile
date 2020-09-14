#  ______     __  __     __     __         _____   
# /\  == \   /\ \/\ \   /\ \   /\ \       /\  __-. 
# \ \  __<   \ \ \_\ \  \ \ \  \ \ \____  \ \ \/\ \
#  \ \_____\  \ \_____\  \ \_\  \ \_____\  \ \____-
#   \/_____/   \/_____/   \/_/   \/_____/   \/____/
#
# Pre-requisites: 
#   (1) Pull the target version (using tags or SHA) of the front-end source code from Bitbucket repo.
#   (2) Pull the target version (using tags or SHA) of the back-end source code from Bitbucket repo.
#   (3) Pull the Docker images used to build the front-end and back-end source build environments.
                                                 
FROM node:13-alpine AS buildEnv
LABEL maintainer="Kristoffer Dominic Amora, IT - Systems Solution & Business Intelligence"

# ENV Variables
ENV BUILD_APP_SOURCE_DIR="/usr/projects/dpp" \
    BUILD_APP_OUTPUT_DIR="/usr/projects/dpp/www/"

# Work directory building the app
RUN mkdir -p ${BUILD_APP_SOURCE_DIR}
WORKDIR ${BUILD_APP_SOURCE_DIR}
# -- The following commands are not needed because the Node base image already has npm installed.
# -- Installing angular CLI is done already on RUN npm install below as it includes building
# -- the dev dependencies in which angular CLI is listed already in package.json.
    # RUN npm cache clean -f
    # RUN npm install -g npm@latest
    # RUN npm install -g @angular/cli 
RUN npm install -g @ionic/cli
COPY package*.json ./             
# -- If building our code for production
# RUN npm ci --only=production  
#   -- Running npm ci production resulted to a build error if there's no package lock JSON file. 
#   -- There were also build errors on dev dependencies installation step. 
#   -- Thus, RUN npm install is used.
RUN npm install

# Copy source code from host to build env
COPY . .
# RUN npm run-script build:prod
#   -- ionic build --prod is used which calls angular production build under the hood.
RUN ionic build --prod

#  ______   ______     ______     _____     __  __     ______     ______   __     ______     __   __   
# /\  == \ /\  == \   /\  __ \   /\  __-.  /\ \/\ \   /\  ___\   /\__  _\ /\ \   /\  __ \   /\ "-.\ \  
# \ \  _-/ \ \  __<   \ \ \/\ \  \ \ \/\ \ \ \ \_\ \  \ \ \____  \/_/\ \/ \ \ \  \ \ \/\ \  \ \ \-.  \ 
#  \ \_\    \ \_\ \_\  \ \_____\  \ \____-  \ \_____\  \ \_____\    \ \_\  \ \_\  \ \_____\  \ \_\\"\_\
#   \/_/     \/_/ /_/   \/_____/   \/____/   \/_____/   \/_____/     \/_/   \/_/   \/_____/   \/_/ \/_/
#
# Pre-requisites: 
#   - Build a CentOS 8 base image from official Docker Hub registry and enable systemd 
#        or 
#   - Pull a prepped image from CHH SSBI Org/Team in Docker Hub.

FROM coolnumber9/dpp:c8-systemd-base-img as prodEnv
LABEL maintainer="Kristoffer Dominic Amora, IT - Systems Solution & Business Intelligence"
# ENV Variables
ENV BUILD_APP_OUTPUT_DIR="/usr/projects/dpp/www/" \
    PROD_DEST_DIR="/var/www/html" \
    PROD_DEST_DIR_AND_SUB="/var/www/html/*" 

# Making port changeable during build through --build-arg
ARG PORT_TO_EXPOSE="80/tcp"

RUN yum -y install httpd; yum clean all; systemctl enable httpd.service
WORKDIR ${PROD_DEST_DIR}
RUN rm -rf ${PROD_DEST_DIR_AND_SUB}
COPY --from=buildEnv ${BUILD_APP_OUTPUT_DIR} ./
EXPOSE ${PORT_TO_EXPOSE}
# Removed ENV variables in CMD because for some reason Docker can't find it when running the container.
CMD ["/usr/sbin/init"]