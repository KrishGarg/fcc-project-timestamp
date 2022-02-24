const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

function getDateFromParam(paramDate) {
  if (!paramDate) {
    return new Date();
  }
  let date;
  const numericalDate = Number(paramDate);
  if (!numericalDate) {
    date = new Date(paramDate);
  } else {
    date = new Date(numericalDate);
  }
  if (date.toString() === "Invalid Date") {
    return null;
  }
  return date;
}

app.get("/api/:date?", (req, res) => {
  const date = getDateFromParam(req.params.date);

  if (!date) {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({
    unix: date.valueOf(),
    utc: date.toUTCString(),
  });
});

if (!process.env.DETA_RUNTIME) {
  const listener = app.listen(process.env.PORT ?? 3000, function () {
    console.log(
      "Your app is listening on port http://localhost:" +
        listener.address().port
    );
  });
}

module.exports = app;
