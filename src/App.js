import "./App.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";

import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";
moment.locale("ar");

let theme = createTheme({
  typography: ["IBM"],
});

let cancelAxios = null;

function App() {
  const { t, i18n } = useTranslation();
  const [locale, setLocale] = useState("ar");
  const [dateAndTime, setdateAndTime] = useState();
  const [weather, setWeather] = useState({
    temp: null,
    tempMax: null,
    tempMin: null,
    description: "",
    imIcon: "",
  });

  const direction = locale == "ar" ? "rtl" : "ltr";

  function handelclick() {
    if (locale == "ar") {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    } else {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    }
    setdateAndTime(moment().format("lll"));
  }
  useEffect(() => {
    i18n.changeLanguage(locale);
    setdateAndTime(moment().format("lll"));

    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=24.77&lon=46.73&appid=642a8411c503d2b07b05b52ba21710f1",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then(function (response) {
        const temp = Math.round(response.data.main.temp - 272.15);
        const tempMax = Math.round(response.data.main.temp_max - 272.15);
        const tempMin = Math.round(response.data.main.temp_min - 272.15);
        const description = response.data.weather[0].description;
        const imIcon = response.data.weather[0].icon;

        setWeather({
          temp: temp,
          tempMax: tempMax,
          tempMin: tempMin,
          description: description,
          imIcon: `https://openweathermap.org/img/wn/${imIcon}@2x.png`,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    return () => {
      cancelAxios();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Container maxWidth="sm">
          <div
            style={{
              height: "100vh",
              alignContent: "center",
            }}
          >
            <div
              className="card"
              style={{
                backgroundColor: "rgb(28 52 91 /38%)",
                padding: "0 20px",
                color: "white",
                borderRadius: "15px",
              }}
              dir={direction}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "end",
                  }}
                  dir={direction}
                >
                  <Typography variant="h2">{t("Riyadh")}</Typography>
                  <Typography variant="h5" style={{ margin: "0 10px" }}>
                    {dateAndTime}
                  </Typography>
                </div>
                <hr />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {weather.temp}
                      </Typography>
                      <img src={weather.imIcon} />
                    </div>

                    <Typography variant="h6">
                      {t(weather.description)}
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "150px",
                      }}
                    >
                      <h5>
                        {t("L")}: {weather.tempMin}
                      </h5>
                      <h5>|</h5>
                      <h5>
                        {t("H")}: {weather.tempMax}
                      </h5>
                    </div>
                  </div>

                  <CloudIcon style={{ fontSize: "150px" }} />
                </div>
              </div>
            </div>
            <div
              dir={direction}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
                marginTop: "20px",
              }}
            >
              <Button
                variant="text"
                style={{ color: "white" }}
                onClick={handelclick}
              >
                {locale == "en" ? "Arabic" : "إنجليزي"}
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
