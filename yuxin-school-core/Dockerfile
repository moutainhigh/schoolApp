FROM registry.aliyuncs.com/winshare/openjdk:8-jre-alpine
#set enviroments
ENV JAVA_TOOL_OPTIONS="-Xms512m -Xmx512m -Xmn128m -XX:NewRatio=4 -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=128m -XX:AutoBoxCacheMax=20000 -XX:+AlwaysPreTouch -Djava.security.egd=file:/dev/./urandom -XX:MaxTenuringThreshold=2"
ENV RMS_JDBC_URL="jdbc:mysql://172.16.7.27:3306/qa_ws_rms?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&failOverReadOnly=false&allowMultiQueries=true"
ENV RMS_JDBC_USER_NAME=qa \
RMS_JDBC_USER_PASSWORD=xw2wEDYIFCxesOco \
RMS_DUBBO_PORT=30001 \
RMS_CLIENT_LOGIN_URL="http://172.16.7.205:8082/school" \
RMS_SYS_DOMAIN=CSC-01 \
DUBBO_REGISTRY_ADDRESS="zk1:2181" \
REDIS_HOST=redisserver1 \
REDIS_PORT=6379 \
REDIS_PASSWORD=scpt123 \
REDIS_MAXTotal=10 \
REDIS_MINIDLE=2 \
MONGO_HOSTPORT="mongoserver1:27017"
WORKDIR /app
COPY target/yuxin-school-core-0.1-SNAPSHOT.jar /app/
COPY target/lib /app/lib/
CMD ["java", "-jar", "/app/yuxin-school-core-0.1-SNAPSHOT.jar"]