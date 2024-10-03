import React, { useContext } from 'react'
import { FaRightLeft } from 'react-icons/fa6'
import { CurrencyContext } from '../context/CurrencyContext';

const SwitchCurrency = () => {
  const {
    fromCurrency, setFromCurrency, toCurrency, setToCurrency
  } = useContext(CurrencyContext);

  const handeleSwitch = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  return (
    <button onClick={handeleSwitch}>
      <FaRightLeft className="text-xl text-neutral-900 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300" />
    </button>
  )
}

export default SwitchCurrency
