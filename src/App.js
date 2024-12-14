import "./App.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import { useEffect, useState } from "react";
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";

import { useSelector, useDispatch } from "react-redux";
import { weaterfetch } from "./weather";

moment.locale("ar");

let theme = createTheme({
  typography: ["IBM"],
});

function App() {
  const { t, i18n } = useTranslation();
  const [locale, setLocale] = useState("ar");
  const [dateAndTime, setdateAndTime] = useState();

  const dispatch = useDispatch();

  const isLodar = useSelector((state) => {
    return state.weather.isLodar;
  });

  const weather = useSelector((state) => {
    return state.weather.weather;
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

    dispatch(weaterfetch());
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
                      {isLodar ? <CircularProgress /> : ""}

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
