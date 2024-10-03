import React, { useContext } from 'react'
import { CurrencyContext } from '../context/CurrencyContext';

const InputAmount = () => {
  const { firstAmmount, setFirstAmmount } = useContext(CurrencyContext);

  return (
    <div className="relative">
      <input
        value={firstAmmount}
        onChange={(e) => setFirstAmmount(e.target.value)}
        className='outline-none dark:bg-neutral-900 pl-7 p-3 rounded-lg dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 w-full'
        type="number"
        placeholder='Amount'
      />
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 pointer-events-none">$</span>
    </div>
  )
}

export default InputAmount
