package kart

import doobie.implicits.*
import doobie.implicits.javatimedrivernative.*
import doobie.postgres.implicits.*
import io.github.gaelrenoux.tranzactio.*
import doobie.*
import zio.interop.catz.*
import zio.{Task, ZIO}

import java.util.UUID

object CheckinRepo {

//  def insert(ci: Checkin): ZIO[Connection, DbException, Int] = {
//    insertInner(ci)
//  }

  def insert(ci: Checkin)(using connection: Connection): ZIO[Connection, DbException, Checkin] = tzio {
    sql"""
          INSERT INTO public.checkin (id, user_id, latitude, longitude, timestamp)
         VALUES (${UUID.randomUUID}, 1, ${ci.lat}, ${ci.lon}, ${ci.timestamp})""".update
      .withUniqueGeneratedKeys[Checkin]("latitude", "longitude", "timestamp")
  }

  def readAll: ZIO[Connection, DbException, List[Checkin]] = tzio {
    sql"select latitude, longitude, timestamp from public.checkin ORDER BY timestamp DESC ".query[Checkin].to[List]
  }

}
