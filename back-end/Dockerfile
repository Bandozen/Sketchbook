# nginx 이미지를 사용합니다. 뒤에 tag가 없으면 latest 를 사용합니다.
FROM nginx

# work dir 고정
WORKDIR /server

# host pc의 현재경로의 build 폴더를 workdir 의 build 폴더로 복사
ADD ./ ./

# 실행
RUN npm start

# 5000 포트 오픈
EXPOSE 5000
EXPOSE 80
EXPOSE 443

# container 실행 시 자동으로 실행할 command. nginx 시작함
CMD ["nginx", "-g", "daemon off;"]
