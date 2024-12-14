import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const weaterfetch = createAsyncThunk("myfetch", async () => {
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather?lat=24.77&lon=46.73&appid=642a8411c503d2b07b05b52ba21710f1"
  );

  const temp = Math.round(response.data.main.temp - 272.15);
  const tempMax = Math.round(response.data.main.temp_max - 272.15);
  const tempMin = Math.round(response.data.main.temp_min - 272.15);
  const description = response.data.weather[0].description;
  const imIcon = response.data.weather[0].icon;

  return {
    temp,
    tempMax,
    tempMin,
    description,
    imIcon: `https://openweathermap.org/img/wn/${imIcon}@2x.png`,
  };
});

export const weatherslice = createSlice({
  name: "weatherApi",
  initialState: {
    result: "",
    weather: {
      temp: null,
      tempMax: null,
      tempMin: null,
      description: "",
      imIcon: "",
    },
    isLodar: false,
  },
  reducers: {},

  extraReducers(build) {
    build.addCase(weaterfetch.pending, (state, actions) => {
      state.isLodar = true;
    });
    build.addCase(weaterfetch.fulfilled, (state, actions) => {
      state.isLodar = false;
      state.weather = actions.payload;
    });
    build.addCase(weaterfetch.rejected, (state, actions) => {
      state.isLodar = true;
    });
  },
});
export const {} = weatherslice.actions;
export default weatherslice.reducer;
