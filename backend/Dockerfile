# Start with a base image from Eclipse Temurin (a distribution of OpenJDK) with Alpine. 
FROM eclipse-temurin:21-jammy AS build
WORKDIR /workspace/app

# Copy necessary files for building the java project.
COPY gradlew .
COPY gradle.properties .
COPY gradle ./gradle
COPY config ./config
COPY build.gradle .

# Ensure the Gradle Wrapper script is executable.
RUN chmod +x ./gradlew

# We're running here before copying over any of the source files in order to just 
# get all the dependencies specified in gradle setup. By doing this here we can 
# cache these dependencies. Then, unless they are changed afterwards, 
# this step can be skipped on subsequent runs.
RUN ./gradlew clean build --no-daemon > /dev/null 2>&1 || true 

COPY src ./src

ARG ENVIRONMENT

ENV SPRING_PROFILES_ACTIVE=${ENVIRONMENT}

# Run the actual build for the source files.
RUN ./gradlew clean build -x test -x check --no-daemon

# need to add a command to run the app here.
ENTRYPOINT ["java","-jar","build/libs/ecolens-app-1.0.jar"]
