import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Search } from "@mui/icons-material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useState, useEffect } from "react";
import axios from "axios";

export function WeatherApp() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [condition, setCondition] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [lastUpdate, setLastUpdate] = useState("");
  const [name, setName] = useState("");
  const [countyname, setCountryName] = useState("");
  const [icon, setIcon] = useState("");
  const [noDataFound, setNodataFound] = useState(false);
  const [dibounceTimer, setDibounceTimer] = useState(0);

  useEffect(() => {
    debounceSearch(city, dibounceTimer);
  }, [city]);

  async function performAPIcall(city) {
    const url = "https://api.openweathermap.org/data/2.5/";
    const key = "cb43963453ff4dd14a2240919854bbe0";
    try {
      let response = await axios.get(`${url}weather?q=${city}&appid=${key}`);
      console.log(response.data);
      setNodataFound(false);
      setTemp(response.data.main.temp);
      setHumidity(response.data.main.humidity);
      setCondition(response.data.weather[0].description);
      setWindSpeed(response.data.wind.speed);
      setLastUpdate(response.data.dt);
      setName(response.data.name);
      setCountryName(response.data.sys.country);
      setIcon(response.data.weather[0].icon);
    } catch (e) {
      console.log("no data found");
      setNodataFound(true);
    }
  }

  const debounceSearch = (city, debounceTimeout) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    let updatedTimerValue = setTimeout(() => performAPIcall(city), 1000);
    setDibounceTimer(updatedTimerValue);
  };

  // const date = new Date(lastUpdate * 1000);
  // const hours = date.getHours();
  // const minutes = "0" + date.getMinutes();
  // const seconds = "0" + date.getSeconds();
  // const min = date.getMinutes();
  // const sec = date.getSeconds();
  // const formattedTime =
  //   hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

  const date = new Date(lastUpdate * 1000)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  return (
    <div>
      <TopAppBar />
      <Grid container>
        <Stack spacing={5} sx={{ maxWidth: 500, minWidth: 300 }}>
          <TextField
            size="small"
            InputProps={{
              sx: { Width: 345, marginTop: "100px" },
              endAdornment: (
                <InputAdornment position="end">
                  <Search color="primary" />
                </InputAdornment>
              )
            }}
            placeholder="Search City"
            name="search"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Stack>
      </Grid>
      <br />
      {city === "" ? null : noDataFound === true ? (
        <NoDataMessage />
      ) : (
        <>
          <CityCounrtyName name={name} countyname={countyname} />
          <br />
          <Card sx={{ maxWidth: 500, minWidth: 300 }}>
            <CardContent>
              <Image icon={icon} name={name} />
              <WeatherData data={Math.floor(temp - 273.15)} unit={"°C"}>
                Temperature
              </WeatherData>
              <WeatherData data={condition}>Condition</WeatherData>
              <WeatherData data={Math.floor(windSpeed * 3.6)} unit={"km/h"}>
                Wind Speed
              </WeatherData>
              <WeatherData data={humidity} unit={"%"}>
                Humidity
              </WeatherData>
              <WeatherData data={date}>Last Updated</WeatherData>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

function TopAppBar() {
  return (
    <AppBar
      color="secondary"
      position="fixed"
      sx={{ display: "flex", alignItems: "center" }}
    >
      <Toolbar>
        <Typography align="center" variant="h6" component="div">
          Weather App
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

function CityCounrtyName({ name, countyname }) {
  return (
    <h1 style={{ textAlign: "center" }}>
      {name}, {countyname}
    </h1>
  );
}

function NoDataMessage() {
  return (
    <h5 style={{ color: "red", textAlign: "center" }}>
      No matching loacation found!
    </h5>
  );
}

function WeatherData({ children, data, unit }) {
  return (
    <Grid container>
      <Grid item xs={4}>
        <Typography align="left" gutterBottom variant="body2" component="div">
          {children}
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography align="right" variant="body2" color="text.primary">
          {data} {unit}
        </Typography>
      </Grid>
    </Grid>
  );
}

function Image({ icon, name }) {
  const imageurl = "http://openweathermap.org/img/wn/" + icon + ".png";
  return <img alt={name} src={imageurl} />;
}
