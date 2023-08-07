# nginx, node 이미지를 사용합니다.
FROM nginx 
FROM node:14.21.3

# work dir 고정
WORKDIR /server

# host pc의 현재경로의 폴더를 workdir의 폴더로 복사
ADD ./ ./
ADD ./ /use/bin/env

RUN node server.js

# nginx 의 default.conf 를 삭제
#RUN rm /etc/nginx/conf.d/default.conf

# host pc 의 nginx.conf 를 아래 경로에 복사
#COPY ./nginx.conf /etc/nginx/conf.d

# 5000 포트 오픈
EXPOSE 5000
EXPOSE 80
EXPOSE 443

# container 실행 시 자동으로 실행할 command. nginx 시작함
CMD ["nginx", "-g", "daemon off;"]
