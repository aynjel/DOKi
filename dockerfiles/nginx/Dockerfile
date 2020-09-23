FROM nginx:latest
LABEL maintainer="Kristoffer Dominic Amora, IT - Systems Solution & Business Intelligence"
# ENV Variables
ENV NGINX_CONFIG_DEST="/etc/nginx/conf.d/default.conf"

# Copy Doctors' Portal Reverse Proxy Config
COPY dpp-nginx.conf ${NGINX_CONFIG_DEST}
