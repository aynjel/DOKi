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
ENV BUILD_APP_SOURCE_DIR="/usr/projects/dpp"

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
COPY package.json ./             
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
#   - Build a CentOS 8 base image from official Docker Hub registry and enable systemd OR 
#   - Pull a prepped image from CHH SSBI Org/Team in Docker Hub.
#
# ------------------------------------------------------------------------------
# Use this if CentOS is preferred as base image. However, there are problems with this
# image when being run with Docker Compose.
#   - FROM coolnumber9/dpp:c8-systemd-base-img as prodEnv
#   - ENV PROD_DEST_DIR="/var/www/html" \
#       PROD_DEST_DIR_AND_SUB="/var/www/html/*" 
#
# ------------------------------------------------------------------------------
# Use this if Apache HTTP Web Server is preferred. Use the Chong Hua Hospital configured
# image to make sure proxy settings is set.
#   - FROM httpd:2.4 as prodEnv
#   - ENV PROD_DEST_DIR_HTTPD="/usr/local/apache2/htdocs/" \
#       PROD_DEST_DIR_HTTPD_AND_SUB="/usr/local/apache2/htdocs/*" 

FROM nginx as prodEnv
# FROM coolnumber9/dpp:dpp-nginx-reverse-proxy as prodEnv

LABEL maintainer="Kristoffer Dominic Amora, IT - Systems Solution & Business Intelligence"
# ENV Variables
ENV PROD_DEST_DIR_NGINX="/usr/share/nginx/html" \
    PROD_DEST_DIR_NGINX_AND_SUB="/usr/share/nginx/html/*" \
    NGINX_CONFIG_SOURCE="./dockerfiles/nginx/dpp-nginx.conf" \
    NGINX_CONFIG_DEST="/etc/nginx/conf.d/default.conf" \
    BUILD_APP_OUTPUT_DIR="/usr/projects/dpp/www/"

# Copy Doctors Portal Reverse Proxy Config
COPY dpp-nginx.conf ${NGINX_CONFIG_DEST}

# Making port changeable during build through --build-arg
ARG PORT_TO_EXPOSE="80/tcp"

# Uncomment if using CentOS 
#   - RUN yum -y install httpd; yum clean all; systemctl enable httpd.service

WORKDIR ${PROD_DEST_DIR_NGINX}
# RUN rm -rf ${PROD_DEST_DIR_NGINX_AND_SUB}
COPY --from=buildEnv ${BUILD_APP_OUTPUT_DIR} ./
EXPOSE ${PORT_TO_EXPOSE}

# Uncomment if using CentOS
#   Removed ENV variables in CMD because for some reason Docker can't find it when running the container.
#   - CMD ["/usr/sbin/init"]