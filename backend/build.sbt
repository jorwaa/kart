import com.typesafe.sbt.packager.MappingsHelper.directory

ThisBuild / version := "0.1.0-SNAPSHOT"

ThisBuild / scalaVersion := "3.3.0"

lazy val circeVersion = "0.14.1"
lazy val zioHttpVersion = "3.0.0-RC7"
lazy val zioJsonVersion = "0.6.2"
lazy val scalaSqlVersion = "0.1.2"

enablePlugins(DockerPlugin)
enablePlugins(UniversalPlugin)
enablePlugins(JavaAppPackaging)

mappings.in(Universal) ++= directory("src/main/resources")

maintainer := "joran@wigen.dev"

lazy val root = project
  .in(file("."))
  .settings(
    name := "backend",
    libraryDependencies := Seq(
      "dev.zio" %% "zio-logging" % "2.2.2",
      "dev.zio" %% "zio-config" % "4.0.2",
      "dev.zio" %% "zio-config-typesafe" % "4.0.2",
      "dev.zio" %% "zio-http" % zioHttpVersion,
      "dev.zio" %% "zio-json" % zioJsonVersion,
      "dev.zio" %% "zio-interop-cats" % "23.1.0.2",
      "org.postgresql" % "postgresql" % "42.7.3",
      "org.tpolecat" %% "doobie-core" % "1.0.0-RC5",
      "org.tpolecat" %% "doobie-postgres" % "1.0.0-RC5",
      "io.github.gaelrenoux" %% "tranzactio-core" % "5.2.0",
      "io.github.gaelrenoux" %% "tranzactio-doobie" % "5.2.0"
    ),
    javaOptions += "-Duser.timezone=europe/oslo"
  )
