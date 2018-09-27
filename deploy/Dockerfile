FROM nginx:1.13-alpine

COPY ./dist/ /dist/
COPY ./nginx.conf.template /etc/nginx/nginx.conf.template
VOLUME /var/log/nginx
ENV TZ=Asia/Hong_Kong \
    VERSION=3.0.0-dev
RUN echo "https://mirrors.aliyun.com/alpine/v3.7/main" >/etc/apk/repositories \
        && echo "https://mirrors.aliyun.com/alpine/v3.5/community" >>/etc/apk/repositories \
        && apk add --update tzdata \
        && rm -rf /var/cache/apk/* \
        && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
        && echo $TZ > /etc/timezone
CMD ["/bin/sh", "-c", "envsubst '${VERSION}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]
