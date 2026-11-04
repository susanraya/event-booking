FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app
COPY pom.xml checkstyle.xml ./
RUN mvn -B -ntp dependency:go-offline
COPY src ./src
RUN mvn -B -ntp -DskipTests package
COPY docker/HealthCheck.java /opt/health/
RUN javac -d /opt/health /opt/health/HealthCheck.java

FROM eclipse-temurin:21-jre

WORKDIR /app
COPY --from=build /opt/health /opt/health
COPY --from=build /app/target/app.jar app.jar
# The platform's deploy probe runs this; the image has no curl, wget or Python.
RUN printf '#!/bin/sh\nexec java -cp /opt/health HealthCheck\n' > /usr/local/bin/aisdlc-health \
  && chmod +x /usr/local/bin/aisdlc-health \
  && groupadd --system app && useradd --system --gid app app

# Run as an unprivileged user: the service never needs root, and a container that drops it
# limits what a compromise of the app can do to the host.
USER app

EXPOSE 8000

# A minute and a half to start: Spring Boot on a share of one CPU takes most of a minute.
HEALTHCHECK --interval=30s --timeout=10s --start-period=90s --retries=3 CMD aisdlc-health

# Half the container for the heap: the rest is Tomcat's threads, class metadata and the
# JVM's own, which at 512 MB need about that much under load.
CMD ["java", "-XX:MaxRAMPercentage=50", "-jar", "app.jar"]
