import doobie.util.transactor.Transactor
import doobie.util.transactor.Transactor.Aux
import zio.interop.catz.*
import zio.Task

object Db {
  val transactor: Transactor[Task] = Transactor.fromDriverManager[Task](
    driver = "org.postgresql.Driver",
    url = "jdbc:postgresql://localhost:5454/postgres",
    user = "postgres",
    password = "postgres",
    logHandler = None
  )

}
