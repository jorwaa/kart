package kart

import doobie.util.transactor
import io.github.gaelrenoux.tranzactio.doobie.Connection
import zio.{Task, ZIO}

import java.time.LocalDateTime

object CheckinService {
  def insert(coordinates: Coordinates)(using Connection): ZIO[Connection, Throwable, Checkin] = {
    val checkin = Checkin(coordinates.lat, coordinates.lon, LocalDateTime.now())
    CheckinRepo.insert(checkin)
  }

  def readAll: ZIO[Connection, Throwable, List[Checkin]] = {
    CheckinRepo.readAll
  }
}
