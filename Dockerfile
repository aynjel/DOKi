#  ______     __  __     __     __         _____   
# /\  == \   /\ \/\ \   /\ \   /\ \       /\  __-. 
# \ \  __<   \ \ \_\ \  \ \ \  \ \ \____  \ \ \/\ \
#  \ \_____\  \ \_____\  \ \_\  \ \_____\  \ \____-
#   \/_____/   \/_____/   \/_/   \/_____/   \/____/
                                                 
FROM node:13-alpine AS buildEnv
LABEL maintainer="Kristoffer Dominic Amora, IT - Systems Solution & Business Intelligence"

# ENV Variables
ENV BUILD_SOURCE_DIR="/usr/projects/dpp"
ENV BUILD_OUTPUT_DIR="/usr/projects/dpp/www/"

# Work directory building the app
RUN mkdir -p ${BUILD_SOURCE_DIR}
RUN echo $(ls -1 ${BUILD_SOURCE_DIR})
WORKDIR ${BUILD_SOURCE_DIR}
RUN echo $(node -v)
# -- The following commands are not needed because the Node base image already has npm installed.
# -- Installing angular CLI is done already on RUN npm install below as it includes building
# -- the dev dependencies in which angular CLI is listed already in package.json.
    # RUN npm cache clean -f
    # RUN npm install -g npm@latest
    # RUN npm install -g @angular/cli 
RUN npm install -g @ionic/cli
COPY package*.json ./             
RUN echo $(ls -1 ${BUILD_SOURCE_DIR})
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
RUN echo $(ls -1 ${BUILD_OUTPUT_DIR})

#  ______   ______     ______     _____     __  __     ______     ______   __     ______     __   __   
# /\  == \ /\  == \   /\  __ \   /\  __-.  /\ \/\ \   /\  ___\   /\__  _\ /\ \   /\  __ \   /\ "-.\ \  
# \ \  _-/ \ \  __<   \ \ \/\ \  \ \ \/\ \ \ \ \_\ \  \ \ \____  \/_/\ \/ \ \ \  \ \ \/\ \  \ \ \-.  \ 
#  \ \_\    \ \_\ \_\  \ \_____\  \ \____-  \ \_____\  \ \_____\    \ \_\  \ \_\  \ \_____\  \ \_\\"\_\
#   \/_/     \/_/ /_/   \/_____/   \/____/   \/_____/   \/_____/     \/_/   \/_/   \/_____/   \/_/ \/_/
#
# Pre-requisite: Make a CentOS 8 base image from official Docker Hub registry 
# Enable systemd and httpd

FROM centos8-base as prodEnv
LABEL maintainer="Kristoffer Dominic Amora, IT - Systems Solution & Business Intelligence"
# ENV Variables
ENV BUILD_OUTPUT_DIR="/usr/projects/dpp/www/" \
    PROD_DEST_DIR="/var/www/html" \
    PROD_DEST_DIR_AND_SUB="/var/www/html/*" \
    PORT_TO_EXPOSE="80/tcp"

RUN yum -y install httpd; yum clean all; systemctl enable httpd.service
WORKDIR ${PROD_DEST_DIR}
RUN rm -rf ${PROD_DEST_DIR_AND_SUB}
COPY --from=buildEnv ${BUILD_OUTPUT_DIR} ./
EXPOSE ${PORT_TO_EXPOSE}
# Removed ENV variables in CMD because for some reason Docker can't find it when running the container.
CMD ["/usr/sbin/init"]