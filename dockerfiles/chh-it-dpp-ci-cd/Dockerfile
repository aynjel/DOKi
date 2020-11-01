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

# Install Angular CLI
RUN npm install -g @angular/cli
# RUN npm install -g @angular/cli@9.1.12

# Intall Ionic CLI
RUN npm install -g @ionic/cli
# RUN npm install @ionic/cli@6.1.0

# Install Cypress
# RUN npm install -g cypress
# RUN npm install cypress@5.3.0
RUN npm install -g cypress --unsafe-perm --silent
# Cypress cannot write to the cache directory due to file permissions (Even as root)
# - https://github.com/cypress-io/cypress/issues/3081
# - https://github.com/cypress-io/cypress/issues/1281

# Making port changeable during build through --build-arg
ARG PORT_TO_EXPOSE="80/tcp"

# HOW TO BUILD THE IMAGE
# cd to the directory where this file is stored
# docker build -t coolnumber9/node-ionic-angular-cypress:nov2020-v1.0.0 .
#
# If rebuilding without cache
# docker build --no-cache -t coolnumber9/node-ionic-angular-cypress:nov2020-v1.0.0 . 

# HOW TO RUN THE CONTAINER
# docker run --rm -it -dp 9000:80 --name chh-it-dpp-ci-cd-v1.0.0 coolnumber9/node-ionic-angular-cypress:nov2020-v1.0.0

# HOW TO EXECUTE BASH inside the container
# docker exec -it chh-it-dpp-ci-cd-v1.0.0 bash
# docker exec -it chh-it-dpp-ci-cd-v1.0.0 sh <-- Alpine doesn't have bash shell

# HOW TO TAG ANG PUSH to remote repo
# docker tag coolnumber9/node-ionic-angular-cypress:v1.0.0 coolnumber9/node-ionic-angular-cypress:nov2020-v1.0.0 
# docker push coolnumber9/node-ionic-angular-cypress:nov2020-v1.0.0 
