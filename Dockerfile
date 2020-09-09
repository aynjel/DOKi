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

# Work dir building the app
RUN mkdir -p ${BUILD_SOURCE_DIR}
RUN echo $(ls -1 ${BUILD_SOURCE_DIR})
WORKDIR ${BUILD_SOURCE_DIR}
RUN echo $(node -v)
    # RUN npm cache clean -f
    # RUN npm install -g npm@latest
    # RUN npm install -g @angular/cli 
RUN npm install -g @ionic/cli
#<-- TODO: Need to revisit. Since this is generated during build (npm install), I think this is OK to omit. - Kristoffer
COPY package*.json ./         
#COPY package.json ./    
RUN echo $(ls -1 ${BUILD_SOURCE_DIR})
# If you are building your code for production
# RUN npm ci --only=production  <-- Build error if no package lock. Build error on dev dependencies.
#<-- Include Dev Dependencies
RUN npm install

# Copy source code from host to build env
COPY . .
#RUN npm run-script build:prod
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
    PORT_TO_EXPOSE="80/tcp" \
    PROD_SYSTEM_INIT_CMD="/usr/sbin/init"

RUN yum -y install httpd; yum clean all; systemctl enable httpd.service
WORKDIR ${PROD_DEST_DIR}
RUN rm -rf ${PROD_DEST_DIR_AND_SUB}
COPY --from=buildEnv ${BUILD_OUTPUT_DIR} ./
EXPOSE ${PORT_TO_EXPOSE}
CMD ["/usr/sbin/init"]