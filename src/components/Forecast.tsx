import { ForecastType } from "../types";
import { getHumidityValue, getPop, getSunTime, getVisibilityValue, getWindDirection } from "../utils";
import Tile from "./Tile";
import Sunrise from "./icons/Sunrise";
import Sunset from "./icons/Sunset";

type ForecastPropType = {
  forecast: ForecastType;
};

const Degree = ({ temp }: { temp: number }): JSX.Element => (
  <span>
    {temp}
    <sup>o</sup>C
  </span>
);

const Forecast = ({ forecast }: ForecastPropType): JSX.Element => {
  const today = forecast.list[0];
  return (
    <section className="w-full md:max-w-[500px] py-4 md:py-4 md:px-10 lg:px-24 h-full bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
      <div className="mx-auto w-[300px] h-full flex flex-col justify-evenly">
        <section className="text-center">
          <h2 className="text-2xl font-black">
            {forecast.name}
            <span className="font-thin">, {forecast.country}</span>
          </h2>
          <h1 className="text-4xl font-extrabold">
            <Degree temp={Math.round(today.main.temp)} />
          </h1>
          <p className="text-sm">
            {today.weather[0].main}: {today.weather[0].description}
          </p>
          <p className="text-sm">
            H: <Degree temp={Math.ceil(today.main.temp_max)} />
            &nbsp;
            L: <Degree temp={Math.floor(today.main.temp_min)} />
          </p>
        </section>

        <section className="flex overflow-x-scroll scrollbar scrollbar-thumb-rounded-full scrollbar-thumb-blue-600 pb-2 mb-5">
          {forecast.list.map((item, i) => (
            <div key={i} className="inline-block text-center w-[50px] flex-shrink-0">
              <p className="text-sm">
                {i === 0 ? 'Now': new Date(item.dt*1000).getHours()}
              </p>
              <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={`weather-icon-${item.weather[0].description}`} />
              <p className="text-sm font-bold"><Degree temp={Math.round(item.main.temp)} /></p>
          </div>
          ))}
        </section>

        <section className="flex flex-wrap justify-between text-zinc-700 h-[340px] overflow-y-scroll scrollbar scrollbar-w-2 scrollbar-thumb-rounded-full scrollbar-thumb-blue-600">
          <div className="w-[120px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5">
            <Sunrise /><span className="mt-2">{ getSunTime(forecast.sunrise)}</span>
          </div>
          <div className="w-[120px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5">
            <Sunset /><span className="mt-2">{ getSunTime(forecast.sunset)}</span>
          </div>

          <Tile icon="wind" info={`${Math.round(today.wind.speed)} km/h`} title='Wind' description={`${getWindDirection(Math.round(today.wind.deg))}, gust ${today.wind.gust.toFixed(1)} km/h`} />
          
          <Tile icon="feels" info={<Degree temp={Math.round(today.main.feels_like)} /> } title="Feels Like" description={`Feels ${Math.round(today.main.feels_like) < Math.round(today.main.temp) ? 'colder' : 'warmer'}`} />
          
          <Tile icon="humidity" info={`${today.main.humidity}%`} title="Humidity" description={getHumidityValue(today.main.humidity)} />
          
          <Tile icon="pop" info={`${Math.round(today.pop * 100)}%`} title="Precipitation" description={`${getPop(today.pop)}, clouds at ${today.clouds.all}%`} />
          
          <Tile icon="pressure" info={`${today.main.pressure} hPa` } title="Pressure" description={`${Math.round(today.main.pressure) < 1013 ? 'Lower' : 'Higher'} than standard` } />
          
          <Tile icon="visibility" info={`${(today.visibility/1000).toFixed()} km`} title="Visibility" description={getVisibilityValue(today.visibility)}/>
        </section>
      </div>
    </section>
  );
};

export default Forecast;
