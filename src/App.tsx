import Search from "./components/Search";
import Forecast from "./components/Forecast";
import useForecast from "./hooks/useForecast";

function App(): JSX.Element {
  const { term, options, forecast, onInputChange, onOptionSelect, onSearch } =
    useForecast();

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-300 via-sky-600 to-blue-600 h-[100vh] w-full">
      {forecast ? (
        <Forecast forecast={forecast} />
      ) : (
        <Search
          term={term}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          onSearch={onSearch}
        />
      )}
    </main>
  );
}

export default App;
