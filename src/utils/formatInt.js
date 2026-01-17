export const formatInt = (num) => {
  if (!num) return 0;

  const lookup = [
    { value: 1e12, symbol: 'трлн.' }, // триллионы
    { value: 1e9, symbol: 'млрд.' }, // миллиарды
    { value: 1e6, symbol: 'млн.' }, // миллионы
    { value: 1e3, symbol: 'тыс.' }, // тысячи
  ];

  const item = lookup.find((x) => num >= x.value);

  if (!item) return Number(num).toFixed(2);

  const formatted = (num / item.value).toFixed(2);
  return formatted + item.symbol;
};
