---
layout: post
title:  "Apache Camel: Getting Started"
date:   2020-05-22 17:03:02 +0100
categories: apache camel java integration
---
# Introduction
Apache Camel is an open-source software integration framework implementing the patterns described in the [Enterprise Integration Patterns](https://www.enterpriseintegrationpatterns.com/) book.

The detailed description of the framework can be found on its [official website](https://camel.apache.org/manual/latest/faq/what-is-camel.html).

In this tutorial we will have a look how to start a basic Camel project and what tools are available ... - what to add here????

# Creating a Basic Apache Camel Project
There are multiple ways of starting a new project using Apache Camel. We will first start with the simplest possible empty Java project and add Camel as a dependency. To do that, first we need to execute the following command:

```bash
mvn archetype:generate -DgroupId=org.camel.mypackage -DartifactId=CamelApp -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4 -DinteractiveMode=false
```

The above command will generate an empty Java application using the `maven-archetype-quickstart`  maven archetype.

First thing we need to do is adding the Apache Camel library to the `pom.xml` dependencies file. It should look as follows:

```xml
<dependency>
  <groupId>org.apache.camel</groupId>
  <artifactId>camel-core</artifactId>
  <version>${camel.version}</version>
</dependency>
```

I will also require a `camel.version` variable to be defined in the properties section of the pom.xml file, like so:

```xml
<camel.version>3.1.0</camel.version>
```

Altogether, the file should look like the following:
```xml
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>org.camel.mypackage</groupId>
  <artifactId>CamelApp</artifactId>
  <version>1.0-SNAPSHOT</version>

  <name>CamelApp</name>
  <!-- FIXME change it to the project's website -->
  <url>http://www.example.com</url>

  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>1.7</maven.compiler.source>
    <maven.compiler.target>1.7</maven.compiler.target>
    <camel.version>3.1.0</camel.version>
  </properties>

  <dependencies>
    <dependency>
      <groupId>org.apache.camel</groupId>
      <artifactId>camel-core</artifactId>
      <version>${camel.version}</version>
    </dependency>

    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.11</version>
      <scope>test</scope>
    </dependency>
  </dependencies>

  <build>
    <pluginManagement><!-- lock down plugins versions to avoid using Maven defaults (may be moved to parent pom) -->
      <plugins>
        <!-- clean lifecycle, see https://maven.apache.org/ref/current/maven-core/lifecycles.html#clean_Lifecycle -->
        <plugin>
          <artifactId>maven-clean-plugin</artifactId>
          <version>3.1.0</version>
        </plugin>
        <!-- default lifecycle, jar packaging: see https://maven.apache.org/ref/current/maven-core/default-bindings.html#Plugin_bindings_for_jar_packaging -->
        <plugin>
          <artifactId>maven-resources-plugin</artifactId>
          <version>3.0.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-compiler-plugin</artifactId>
          <version>3.8.0</version>
        </plugin>
        <plugin>
          <artifactId>maven-surefire-plugin</artifactId>
          <version>2.22.1</version>
        </plugin>
        <plugin>
          <artifactId>maven-jar-plugin</artifactId>
          <version>3.0.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-install-plugin</artifactId>
          <version>2.5.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-deploy-plugin</artifactId>
          <version>2.8.2</version>
        </plugin>
        <!-- site lifecycle, see https://maven.apache.org/ref/current/maven-core/lifecycles.html#site_Lifecycle -->
        <plugin>
          <artifactId>maven-site-plugin</artifactId>
          <version>3.7.1</version>
        </plugin>
        <plugin>
          <artifactId>maven-project-info-reports-plugin</artifactId>
          <version>3.0.0</version>
        </plugin>
      </plugins>
    </pluginManagement>
  </build>
</project>
```

At this point the directory structure should look like this:
```
CamelApp
├── pom.xml
└── src
    ├── main
    │   └── java
    │       └── org
    │           └── camel
    │               └── mypackage
    │                   └── App.java
    └── test
        └── java
            └── org
                └── camel
                    └── mypackage
                        └── AppTest.java

11 directories, 3 files
```

# Creating Camel Context
Camel context provides the runtime environment for the whole Apache Camel application. Usually, we will create one context per application and all Camel routes will be executed within the context.

We will set up a simple application where the context will be started when we run the application. After that we will let the context run for couple of seconds and then we will shut it down - this is not what you would do normally in the production environment, but we can have it as such to be able to play around with it.

We will open the App.jave file and modify it to look as follows:

```java
package org.camel.mypackage;

import org.apache.camel.CamelContext;
import org.apache.camel.impl.DefaultCamelContext;
import org.apache.camel.builder.RouteBuilder;

public class App {
  public static void main( String[] args ) throws Exception {
    CamelContext context = new DefaultCamelContext();

    context.addRoutes(new RouteBuilder() {
      @Override
      public void configure() {
        from("file://./?fileName=in.csv&noop=true")
          .to("file://./?fileName=out.csv")
          .end();
        }
    });

    context.start();

    System.out.println("Camel context started. Wating 2s...");

    Thread.sleep(2000);

    System.out.println("Done Wating. Exiting.");

    context.stop();
  }
}
```

Most notable thing happening above are:

1. Importing packages which will be used
```java
import org.apache.camel.CamelContext;
import org.apache.camel.impl.DefaultCamelContext;
import org.apache.camel.builder.RouteBuilder;
```

2. Creating a default Camel context:
```java
CamelContext context = new DefaultCamelContext();
```

3. Adding a route to the context:
```java
context.addRoutes(new RouteBuilder() {
  @Override
  public void configure() {
    from("file://./?fileName=in.csv&noop=true")
      .to("file://./?fileName=out.csv")
      .end();
    }
});
```

4. Starting and stopping the context:
```java
context.start();
System.out.println("Camel context started. Wating 2s...");
Thread.sleep(2000);
System.out.println("Done Wating. Exiting.");
context.stop();
```

Camel context implements a java [Service lifecycle interface](https://www.javadoc.io/doc/org.apache.camel/camel-api/latest/org/apache/camel/Service.html) so it has `start()` and `stop()` methods. In addition to that it implements `suspend()` and `resume()` methods so it is convenient and easy to manage the context lifecycle.
From the [Apache Camel official website](https://camel.apache.org/manual/latest/lifecycle.html):
>The operations is paired: start/stop and suspend/resume.
>
>Stop is performing a Graceful shutdown which means all its internal state, cache, etc is cleared. And the routes is being stopped in a graceful manner to ensure messages are given time to complete. If you start a CamelContext after a stop, then its performing a cold start, recreating all the state, cache etc. again.

Also, worth mentioning is the route itself. In the example above we have created a very simple route which will take the contents of the `in.csv` file from the current directory and copy all the contents for the `out.csv` file in the same directory. The `noop=true` parameter tells Camel not to do anything with the file. Without this option, Camel would move the the file into the `.camel` directory after processing it.

We can now build, and run the application to see it working. First we need to create some dummy data and put it in the `in.csv` file (the content of the file does not matter at this moment).

When that's done we can execute the application with the following maven command:
```mvn
mvn clean install compile exec:java -Dexec.mainClass="org.camel.mypackage.App"
```

We should see the standard maven output followed by the following:
```
Camel context started. Wating 2s...
Done Wating. Exiting.
```


Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
