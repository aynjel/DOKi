#  ______     __  __     __     __         _____   
# /\  == \   /\ \/\ \   /\ \   /\ \       /\  __-. 
# \ \  __<   \ \ \_\ \  \ \ \  \ \ \____  \ \ \/\ \
#  \ \_____\  \ \_____\  \ \_\  \ \_____\  \ \____-
#   \/_____/   \/_____/   \/_/   \/_____/   \/____/
#

# Build and Test environment prerequisites for Doctors' Portal PWA
# - Node.js (Already provided by the base node:13-alpine image)
# - Angular CLI
# - Ionic CLI
# - Cypress

FROM node:13-alpine AS buildEnv
LABEL maintainer="Kristoffer Dominic Amora, IT - Systems Solution & Business Intelligence"

# Install Angular CLI and build dev dependencies
RUN npm install -g @angular/cli
# RUN npm install -g @angular/cli@9.1.12 <- if specific version is desired
RUN npm install -g @angular-devkit/build-angular

# Intall Ionic CLI
RUN npm install -g @ionic/cli
# RUN npm install @ionic/cli@6.1.0 <- if specific version is desired

# Install Cypress
# RUN npm install -g cypress
# RUN npm install cypress@5.3.0 <- if specific version is desired
# RUN npm install -g cypress --unsafe-perm --silent
#   Workaround: sudo npm install --unsafe-perm=true --allow-root cypress
# Cypress cannot write to the cache directory due to file permissions (Even as root)
# - https://github.com/cypress-io/cypress/issues/3081
# - https://github.com/cypress-io/cypress/issues/1281

# Making port changeable during build through --build-arg
ARG PORT_TO_EXPOSE="80/tcp"

# HOW TO BUILD THE IMAGE
# cd to the directory where this file is stored
# docker build -t coolnumber9/node-ionic-angular:nov2020-v1.0.2 .
#
# If rebuilding without cache
# docker build --no-cache -t coolnumber9/node-ionic-angular:nov2020-v1.0.2 . 

# HOW TO RUN THE CONTAINER
# docker run --rm -it -dp 9000:80 --name chh-it-dpp-ci-cd-v1.0.2 coolnumber9/node-ionic-angular:nov2020-v1.0.2

# HOW TO EXECUTE BASH inside the container
# docker exec -it chh-it-dpp-ci-cd-v1.0.2 bash  <- If base image used has bash installed
# docker exec -it chh-it-dpp-ci-cd-v1.0.2 sh    <- Alpine doesn't have bash shell

# HOW TO TAG ANG PUSH to remote repo
# docker tag coolnumber9/node-ionic-angular:nov2020-v1.0.2 coolnumber9/node-ionic-angular:nov2020-v1.0.2 
# docker push coolnumber9/node-ionic-angular:nov2020-v1.0.2
