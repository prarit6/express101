import moment from "moment";

const logger = (req, res, next) => {
  console.log(`Request: ${req.protocol}://${req.get("host")}${req.originalUrl} - ${moment().format("YYYY-MM-DD HH:mm:ss")}`)
  next();
};

export default logger;