# This Dockerfile deletes a number of unit files which might cause issues. 
# From here, you are ready to build your base image.
#   Example: $ docker build --rm -t coolnumber9/dpp:c8-systemd-base-img .
FROM centos:8
ENV container docker
ENV HTTPD_CONF_DEST="/etc/httpd/conf/httpd.conf"

RUN (cd /lib/systemd/system/sysinit.target.wants/; for i in *; do [ $i == \
systemd-tmpfiles-setup.service ] || rm -f $i; done); \
rm -f /lib/systemd/system/multi-user.target.wants/*;\
rm -f /etc/systemd/system/*.wants/*;\
rm -f /lib/systemd/system/local-fs.target.wants/*; \
rm -f /lib/systemd/system/sockets.target.wants/*udev*; \
rm -f /lib/systemd/system/sockets.target.wants/*initctl*; \
rm -f /lib/systemd/system/basic.target.wants/*;\
rm -f /lib/systemd/system/anaconda.target.wants/*;
# Copy CHH DPP httpd conf to image
COPY ./httpd.conf ${HTTPD_CONF_DEST}
VOLUME [ "/sys/fs/cgroup" ]
CMD ["/usr/sbin/init"]