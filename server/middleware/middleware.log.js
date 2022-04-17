const fs = require("fs");

module.exports = {
  log: (request, response, next) => {
    try {
      let data;
      fs.open("./log/log.txt", "r+", () => {});
      const headers = {
        host: request.headers.host,
        method: request.method,
        requestUrl: request.originalUrl,
        connection: request.headers.connection,
        "content-type": request.headers["content-type"],
        "user-agent": request.headers["user-agent"],
      };
      if (request.originalUrl === "/api/login") {
        data = JSON.stringify(
          { headers: headers, data: new Date() },
          null,
          "\t"
        );
      } else {
        data = JSON.stringify(
          { headers: headers, body: request.body, data: new Date() },
          null,
          "\t"
        );
      }
      fs.appendFile("./log/log.txt", data, () => {});
      next();
    } catch (e) {
      console.log(e);
      next();
    }
  },
  errorLog: (errorType, errorMessage) => {
    fs.open("./log/log.txt", "r+", () => {});
    const error = {
      "errorType": errorType,
      "errorMessage": errorMessage,
    }
    let data = JSON.stringify(
      { error: error, data: new Date() },
      null,
      "\t"
    );
    fs.appendFile("./log/log.txt", data, () => {});
  }
};
