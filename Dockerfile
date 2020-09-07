FROM node:13-alpine AS buildEnv
# Work dir building the app
RUN mkdir -p /usr/projects/dpp
RUN echo $(ls -1 /usr/projects/dpp)
WORKDIR /usr/projects/dpp
RUN echo $(node -v)
RUN npm cache clean -f
RUN npm install -g npm@latest
RUN npm install -g @angular/cli
RUN npm install -g @ionic/cli
#COPY package*.json ./
COPY package.json ./
RUN echo $(ls -1 /usr/projects/dpp)
RUN npm install
# If you are building your code for production
#RUN npm install --only=production

#Copy source code to build
COPY . .
#RUN npm run-script build:prod
RUN ionic build --prod

FROM centos8-base as prodEnv
RUN yum -y install httpd; yum clean all; systemctl enable httpd.service
WORKDIR /var/www/html
RUN rm -rf /var/www/html/*
COPY --from=buildEnv /usr/projects/dpp/www/ ./
EXPOSE 80
CMD ["/usr/sbin/init"]