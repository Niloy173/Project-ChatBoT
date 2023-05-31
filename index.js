/* external packages */
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

/* internal packages */


/* env configuration */
dotenv.config();

/* app object */
const app = express();

/* express middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

/* database configuration */


/* variable section */
const staticDir = path.join(__dirname, 'public', 'static');
const port = process.env.PORT || 8080;

/* include all route files */
const homeRouter = require("./routes/web.route");
const botRouter = require("./routes/chatbot.route");

/* middleware */
app.enable('case sensitive routing');
app.use(express.static(staticDir));


/* view engine configuration */
app.set('view engine', 'ejs');

/* confgure all routes */
app.use("/",homeRouter.router);
app.use("/bot",botRouter.router);

/* error handler middleware */
app.use((err, req, res, next) => {

  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  res.status(status).json({
    success: false,
    status: status,
    message: message,
    stack: err.stack || null
  });

})

/* listening to the server */
app.listen(port,() => {
  console.log('listening on port ' + port);
});