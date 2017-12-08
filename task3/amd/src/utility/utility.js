// Add format function to Data type.
function customFormateDate (date, format = 'YYYY-MM-DD hh:mm') {
  const zeropad = (number, length) => {

    // Minimum amount of character in date and time. For example const = 1 then 8 hour; const = 2 then 08 hour;
    const minNumOfCharacter = 2;
    number = number.toString();
    length = length || minNumOfCharacter;
    while (number.length < length)
      number = '0' + number;
    return number;
  };

  // here you can define your formats
  const formats = {
    YYYY: date.getFullYear(),
    MM: zeropad(date.getMonth() + 1),
    DD: zeropad(date.getDate()),
    hh: zeropad(date.getHours()),
    mm: zeropad(date.getMinutes())
  };
  const pattern = '(' + Object.keys(formats).join(')|(') + ')';

  return format.replace(new RegExp(pattern, 'g'), (match) => {
      return formats[match];
    }
  );
}

export {customFormateDate};
