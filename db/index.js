require("dotenv").config()
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const { Client } = require("pg")
const client = new Client(
  process.env.DATABASE_URL || "postgres://clubhouse_joae_user:vUUlKPxojYql0jM6399GzRe0IrvA5Jbr@dpg-cp1o99uct0pc73d58p0g-a.ohio-postgres.render.com/clubhouse_joae"
)

module.exports = {
  client
}