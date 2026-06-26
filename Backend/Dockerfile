FROM eclipse-temurin:25-jdk AS build
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# 1. Copy POM and download dependencies to leverage Docker cache
COPY pom.xml .
RUN mvn dependency:go-offline -B

# 2. Copy source code and build package (only run when src changes)
COPY src ./src
RUN mvn package -DskipTests


FROM eclipse-temurin:25-jre-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-Dio.netty.resolver.dns.defaultAddressTypes=IPV4_ONLY", "-jar", "app.jar"]