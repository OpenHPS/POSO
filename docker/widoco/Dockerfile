FROM openjdk:17-slim
WORKDIR /var/build/widoco
RUN apt-get update && apt-get install -y wget
RUN mkdir ./JAR
RUN wget https://github.com/dgarijo/Widoco/releases/download/v1.4.15/widoco-1.4.15-jar-with-dependencies.jar -O ./JAR/widoco.jar
ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar ./JAR/widoco.jar -rewriteAll -oops -webVowl -licensius -ontFile ${ontFile} -outFolder ${outFolder}"]