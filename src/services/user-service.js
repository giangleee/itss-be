const jwt = require('jsonwebtoken');

const userService = {
    comparePassword: (passwordRequest, currentUserPassword) => {
        // return bcrypt.compareSync(password, this.password)
        return passwordRequest === currentUserPassword;
    },
    genToken: (userId) => {
        return jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
            expiresIn: '7d',
          });
    }
}

module.exports = userService
