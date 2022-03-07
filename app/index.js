const authRouter = require("./auth/router");
const usersRouter = require("./users/router");
const booksRouter = require("./books/route");
const passport = require('passport');
require('./middleware/authenticate')(passport);
module.exports = (app) => {
    app.use("/auth", authRouter);
    app.use("/users", passport.authenticate('jwt', {session: false}), usersRouter);
    app.use("/books", passport.authenticate('jwt', {session: false}), booksRouter);
};