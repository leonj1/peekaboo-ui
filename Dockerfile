FROM anapsix/alpine-java

MAINTAINER Jose Leon <leonj1@gmail.com>

RUN apk update && \
    apk add bash bash-doc bash-completion mysql-client nginx supervisor vim lsof less

ADD build /var/www/html
ADD default /etc/nginx/sites-available/default
ADD supervisord.conf /etc/supervisor/supervisord.conf
ADD nginx_supervisor.conf /etc/supervisor/conf.d/nginx_supervisor.conf
ADD peekaboo_api.conf /etc/supervisor/conf.d/peekaboo_api.conf

ENTRYPOINT ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]

