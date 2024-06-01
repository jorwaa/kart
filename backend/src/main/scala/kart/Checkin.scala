package kart

import zio.json.internal.RetractReader
import zio.json.*
import zio.json.ast.Json

import java.time.LocalDateTime
import scala.util.control.Exception.Catch

case class Coordinates(lat: BigDecimal, lon: BigDecimal)
object Coordinates:
  implicit val codec: JsonCodec[Coordinates] = DeriveJsonCodec.gen[Coordinates]

case class Checkin(lat: BigDecimal, lon: BigDecimal, timestamp: LocalDateTime)
object Checkin:
  given JsonCodec[Checkin] = DeriveJsonCodec.gen[Checkin]
