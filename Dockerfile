FROM artprod.dev.bloomberg.com/bb/java:20161107_155000

MAINTAINER Jose Leon <jleon43@bloomberg.net>

RUN apt-get update
RUN apt-get install -y nginx supervisor vim lsof telnet
RUN apt-get install -y less

ADD build /var/www/html
ADD default /etc/nginx/sites-available/default
ADD supervisord.conf /etc/supervisor/supervisord.conf
ADD nginx_supervisor.conf /etc/supervisor/conf.d/nginx_supervisor.conf
ADD peekaboo_api.conf /etc/supervisor/conf.d/peekaboo_api.conf
ADD peekaboo-1.0-SNAPSHOT.jar /peekaboo.jar

RUN env --unset=http_proxy
RUN env --unset=https_proxy
RUN env --unset=HTTP_PROXY
RUN env --unset=HTTPS_PROXY

ENTRYPOINT ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]

