export const formatPrice = (num) => {
  const value = parseFloat(num);

  // Обработка отрицательных чисел и нуля
  if (isNaN(value) || value === 0) return '0';

  const isNegative = value < 0;
  const absValue = Math.abs(value);

  // Если абсолютное значение >= 1: 2 знака после точки
  if (absValue >= 1) {
    const formatted = absValue.toLocaleString('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return isNegative ? `-${formatted}` : formatted;
  }

  // Если абсолютное значение < 0.0001: показываем до 8 знаков
  if (absValue < 0.0001) {
    const formatted = absValue.toFixed(8).replace(/\.?0+$/, '');
    return isNegative ? `-${formatted}` : formatted;
  }

  // Если абсолютное значение < 0.01: показываем до 6 знаков
  if (absValue < 0.01) {
    const formatted = absValue.toFixed(6).replace(/\.?0+$/, '');
    return isNegative ? `-${formatted}` : formatted;
  }

  // Иначе: 4 знака после точки
  const formatted = absValue.toFixed(4).replace(/\.?0+$/, '');
  return isNegative ? `-${formatted}` : formatted;
};
