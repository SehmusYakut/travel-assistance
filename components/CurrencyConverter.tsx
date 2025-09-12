'use client';

import { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import CurrencyService from '../services/currencyService';

interface CurrencyConverterProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const CurrencyConverter = ({ isOpen, onClose }: CurrencyConverterProps = {}) => {
  const { language } = useAppContext();
  const [fromCurrency, setFromCurrency] = useState('TRY');
  const [toCurrency, setToCurrency] = useState('MYR');
  const [amount, setAmount] = useState<string>('100');
  const [result, setResult] = useState<{
    amount: number;
    rate: number;
    formattedAmount: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Tip calculator states
  const [billAmount, setBillAmount] = useState<string>('');
  const [tipPercentage, setTipPercentage] = useState<number>(10);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);

  const currencyService = CurrencyService.getInstance();
  const currencies = currencyService.getPopularCurrencies();

  // Para birimi dönüştürme
  const convertCurrency = async () => {
    if (!amount || isNaN(Number(amount))) return;
    
    setLoading(true);
    setError('');
    
    try {
      const conversion = await currencyService.convertCurrency(
        Number(amount),
        fromCurrency,
        toCurrency
      );
      setResult(conversion);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Dönüştürme hatası');
    } finally {
      setLoading(false);
    }
  };

  // Para birimlerini değiştir
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };

  // Tip hesaplama
  const calculateTip = () => {
    if (!billAmount || isNaN(Number(billAmount))) return null;
    
    const bill = Number(billAmount);
    const tipCalc = currencyService.calculateTip(bill, tipPercentage);
    const splitBill = currencyService.splitBill(bill, numberOfPeople, tipPercentage);
    
    return { tipCalc, splitBill };
  };

  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency]);

  const tipResult = calculateTip();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            💰 {language === 'tr' ? 'Para Birimi' : 'Currency'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <span className="text-xl">✕</span>
          </button>
        </div>

        {/* Currency Converter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            🔄 {language === 'tr' ? 'Döviz Çevirici' : 'Currency Converter'}
          </h3>
          
          {/* Amount Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              {language === 'tr' ? 'Miktar' : 'Amount'}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="100"
            />
          </div>

          {/* Currency Selectors */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {language === 'tr' ? 'Kimden' : 'From'}
              </label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.code}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {language === 'tr' ? 'Kime' : 'To'}
              </label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center mb-4">
            <button
              onClick={swapCurrencies}
              className="p-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 rounded-lg transition-colors"
              title={language === 'tr' ? 'Değiştir' : 'Swap'}
            >
              <span className="text-xl">🔄</span>
            </button>
          </div>

          {/* Result */}
          {loading && (
            <div className="text-center text-blue-600 dark:text-blue-400">
              {language === 'tr' ? 'Hesaplanıyor... 💱' : 'Calculating... 💱'}
            </div>
          )}
          
          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg mb-4">
              {error}
            </div>
          )}
          
          {result && !loading && (
            <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-800 dark:text-green-200">
                  {result.formattedAmount}
                </div>
                <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                  1 {fromCurrency} = {result.rate.toFixed(4)} {toCurrency}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tip Calculator */}
        <div className="border-t border-gray-200 dark:border-slate-600 pt-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            🧾 {language === 'tr' ? 'Bahşiş Hesaplayıcı' : 'Tip Calculator'}
          </h3>

          {/* Bill Amount */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              {language === 'tr' ? 'Hesap Tutarı' : 'Bill Amount'}
            </label>
            <input
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              placeholder="50"
            />
          </div>

          {/* Tip Percentage */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              {language === 'tr' ? 'Bahşiş Oranı' : 'Tip Percentage'}: {tipPercentage}%
            </label>
            <div className="flex gap-2 mb-2">
              {[5, 10, 15, 20].map((percent) => (
                <button
                  key={percent}
                  onClick={() => setTipPercentage(percent)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    tipPercentage === percent
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {percent}%
                </button>
              ))}
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={tipPercentage}
              onChange={(e) => setTipPercentage(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Number of People */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              {language === 'tr' ? 'Kişi Sayısı' : 'Number of People'}
            </label>
            <input
              type="number"
              min="1"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(Math.max(1, Number(e.target.value)))}
              className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tip Results */}
          {tipResult && billAmount && (
            <div className="space-y-3">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-yellow-800 dark:text-yellow-200">
                    {language === 'tr' ? 'Bahşiş' : 'Tip'}:
                  </span>
                  <span className="font-bold text-yellow-800 dark:text-yellow-200">
                    {tipResult.tipCalc.formattedTip}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-800 dark:text-yellow-200">
                    {language === 'tr' ? 'Toplam' : 'Total'}:
                  </span>
                  <span className="font-bold text-yellow-800 dark:text-yellow-200">
                    {tipResult.tipCalc.formattedTotal}
                  </span>
                </div>
              </div>

              {numberOfPeople > 1 && (
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-purple-800 dark:text-purple-200">
                      {language === 'tr' ? 'Kişi Başı' : 'Per Person'}:
                    </span>
                    <span className="font-bold text-purple-800 dark:text-purple-200">
                      {tipResult.splitBill.formattedWithTip}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};