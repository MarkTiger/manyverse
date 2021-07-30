const bcrypt = require("bcrypt")
const salt = bcrypt.genSaltSync(10)

module.exports = {
  hashPassword(password) {
    return bcrypt.hashSync(password, salt)
  },
  checkPassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword)
  }
}