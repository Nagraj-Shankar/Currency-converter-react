import { useContext, useEffect, useState } from "react";
import InputAmount from "./components/InputAmount";
import SelectCountry from "./components/SelectCountry";
import SwitchCurrency from "./components/SwitchCurrency";
import { CurrencyContext } from "./context/CurrencyContext";
import axios from "axios";

function App() {
  const {
    fromCurrency, setFromCurrency, toCurrency, setToCurrency, firstAmmount, setFirstAmmount
  } = useContext(CurrencyContext);

  const codeFromCurrency = fromCurrency.split(" ")[1];
  const codeToCurrency = toCurrency.split(" ")[1];
  const [resultCurrency, setResultCurrency] = useState(null);

  useEffect(() => {
    if (firstAmmount && codeFromCurrency && codeToCurrency) {
      console.log("API call with:", {
        base_currency: codeFromCurrency,
        currencies: codeToCurrency
      });

      axios.get('https://api.freecurrencyapi.com/v1/latest', {
        params: {
          base_currency: codeFromCurrency,
          currencies: codeToCurrency,
          apikey: 'fca_live_No7y60zeWcxOeNT9w4AFSZ2XxaGxOb337jHwQolR'
        }
      })
      .then(res => {
        if (res.data && res.data.data) {
          setResultCurrency(res.data.data[codeToCurrency]);
        } else {
          console.error("Unexpected API response format:", res);
        }
      })
      .catch(error => {
        console.error("API error:", error.response ? error.response.data : error.message);
      });
    }
  }, [firstAmmount, fromCurrency, toCurrency]);

  return (
    <div className="mx-8">
      <div className="flex flex-col max-w-4xl shadow-xl dark:shadow-neutral-950 bg-neutral-100/20 dark:bg-neutral-800/20 rounded-lg mx-auto p-8 mt-48">
        <h2 className="text-4xl font-bold mb-10 text-center leading-snug text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500">Currency Converter</h2>
        <div className="flex lg:flex-row flex-col gap-8 lg:gap-0 justify-between items-center">
          <InputAmount />
          <div className="flex sm:flex-row flex-col gap-8 items-center">
            <SelectCountry label={"From"} value={fromCurrency} setValue={setFromCurrency} />
            <SwitchCurrency />
            <SelectCountry label={"To"} value={toCurrency} setValue={setToCurrency} />
          </div>
        </div>
         {firstAmmount ? (
          <div className="mt-8">
            <p className="text-lg text-center">
              {firstAmmount} {codeFromCurrency ? codeFromCurrency : '...'} =
            </p>
            <p className="text-xl font-bold text-center mt-2">{codeToCurrency ? resultCurrency * firstAmmount : ''} {codeToCurrency ? codeToCurrency : '...'}</p>
          </div>
        ) : ''}
      </div>
    </div>
  );
}

export default App;
