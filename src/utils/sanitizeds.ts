export const sanitizedStringToNumber = (input: string): number => {
  const sanitizedInput = input.replace(/[^\d.,]/g, '').replace(/,/g, '');
  return parseFloat(sanitizedInput);
};
