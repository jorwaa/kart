import doobie.util.transactor
import doobie.util.transactor.Transactor
import io.github.gaelrenoux.tranzactio.doobie.Connection
import kart.{Checkin, CheckinService, Coordinates}
import zio.*
import zio.config.typesafe.TypesafeConfigProvider
import zio.json.*
import zio.schema.codec.JsonCodec.*
import zio.http.*
import zio.http.Middleware.{CorsConfig, cors}

import java.io.File

object Main extends ZIOAppDefault {
  private val corsConfig = CorsConfig()
  private val routes = cors(
    Routes(
      Method.GET / Root -> {
        handler {
          for {
            file <- Handler.getResourceAsFile("http/index.html")
            http <- Handler.fromFile(file)
          } yield http
        }.mapError(err => Response.text(s"Error: $err"))
      },
      Method.GET / Root / "checkin" -> {
        val bar = handler { (req: Request) =>
          println(req)
          CheckinService.readAll
            .map { checkins => Response.json(checkins.toJson) }
            .mapError { err =>
              Response
                .text("Henting av innsjekkinger feilet. Vennligst prøv igjen senere: " + err.getMessage)
                .status(Status.InternalServerError)
            }
        }
        bar
      },
      Method.POST / Root / "checkin" -> handler { (req: Request) =>
        val body = req.body
        (for {
          coordinates <- body.to[Coordinates]
          connection <- ZIO.service[Connection]
          checkin <- CheckinService.insert(coordinates)(using connection)
        } yield checkin)
          .mapBoth(
            err => Response.text(s"Error: $err"),
            success => Response.text(success.toJson)
          )
      }
    ) @@ Middleware.serveDirectory(Path.empty / "_next", new File("resouces/http/_next"))
  )

  override def run = Server
    .serve(routes)
    .provide(
      Server.defaultWithPort(9090),
      ZLayer.succeed(Db.transactor)
    )
}
