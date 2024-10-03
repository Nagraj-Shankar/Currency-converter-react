import React, { useState } from 'react'

export const CurrencyContext = React.createContext()

const CurrencyProvider = ({children}) => {
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [firstAmmount, setFirstAmmount] = useState('');

  const value = {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmmount,
    setFirstAmmount
  }

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  )
}

export default CurrencyProvider
