# FROM centos8-base
# RUN yum -y install httpd; yum clean all; systemctl enable httpd.service
# WORKDIR /var/www/html
# COPY /www/ ./
# EXPOSE 80
# CMD ["/usr/sbin/init"]

FROM node:13-alpine AS buildEnv
# Work dir building the app
#RUN mkdir /app
#WORKDIR /app 
RUN mkdir -p /usr/projects/dpp
RUN echo $(ls -1 /usr/projects/dpp)
WORKDIR /usr/projects/dpp

RUN npm install -g @ionic/cli
COPY package*.json ./
WORKDIR /usr/projects/dpp
RUN echo $(ls -1 /usr/projects/dpp)
RUN npm install
# If you are building your code for production
# RUN npm install --only=production

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


# FROM centos:8
# ENV container docker
# RUN (cd /lib/systemd/system/sysinit.target.wants/; for i in *; do [ $i == \
# systemd-tmpfiles-setup.service ] || rm -f $i; done); \
# rm -f /lib/systemd/system/multi-user.target.wants/*;\
# rm -f /etc/systemd/system/*.wants/*;\
# rm -f /lib/systemd/system/local-fs.target.wants/*; \
# rm -f /lib/systemd/system/sockets.target.wants/*udev*; \
# rm -f /lib/systemd/system/sockets.target.wants/*initctl*; \
# rm -f /lib/systemd/system/basic.target.wants/*;\
# rm -f /lib/systemd/system/anaconda.target.wants/*;
# VOLUME [ "/sys/fs/cgroup" ]
# CMD ["/usr/sbin/init"]

# FROM centos:8
# ENV container docker
# RUN (cd /lib/systemd/system/sysinit.target.wants/; for i in *; do [ $i == \
# systemd-tmpfiles-setup.service ] || rm -f $i; done); \
# rm -f /lib/systemd/system/multi-user.target.wants/*;\
# rm -f /etc/systemd/system/*.wants/*;\
# rm -f /lib/systemd/system/local-fs.target.wants/*; \
# rm -f /lib/systemd/system/sockets.target.wants/*udev*; \
# rm -f /lib/systemd/system/sockets.target.wants/*initctl*; \
# rm -f /lib/systemd/system/basic.target.wants/*;\
# rm -f /lib/systemd/system/anaconda.target.wants/*;
# RUN yum -y install httpd; yum clean all; systemctl enable httpd.service
# COPY /www/ /var/www/html/
# EXPOSE 80
# VOLUME [ "/sys/fs/cgroup" ]
# CMD ["/usr/sbin/init"]


# FROM centos:8 as baseImageDpp
# ENV container docker
# RUN (cd /lib/systemd/system/sysinit.target.wants/; for i in *; do [ $i == \
# systemd-tmpfiles-setup.service ] || rm -f $i; done); \
# rm -f /lib/systemd/system/multi-user.target.wants/*;\
# rm -f /etc/systemd/system/*.wants/*;\
# rm -f /lib/systemd/system/local-fs.target.wants/*; \
# rm -f /lib/systemd/system/sockets.target.wants/*udev*; \
# rm -f /lib/systemd/system/sockets.target.wants/*initctl*; \
# rm -f /lib/systemd/system/basic.target.wants/*;\
# rm -f /lib/systemd/system/anaconda.target.wants/*;
# VOLUME [ "/sys/fs/cgroup" ]
# # CMD ["/usr/sbin/init"]

# FROM baseImageDpp as appCopyDpp
# RUN yum -y install httpd; yum clean all; systemctl enable httpd.service
# WORKDIR /var/www/html/
# COPY /www .
# EXPOSE 80
# CMD ["/usr/sbin/init"]