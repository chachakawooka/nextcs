//Converts from Uint8 buffer to integer
function convert(buffer) {
  var result = 0;
  for (var i = 0; i < buffer.length; i++) {
    result += buffer[i] * Math.pow(256, buffer.length - i - 1);
  }
  return result;
}

export const convertFraction = (Uint8Arr) => {
  let fraction = convert(Uint8Arr);
  fraction = prependZeros(fraction);
  return fraction;
};

export const prependZeros = (fraction) => {
  if (fraction === 0) {
    fraction = "0.0";
  } else {
    if (fraction.toString().length != 18) {
      fraction = fraction.toString().padStart(18, "0");
    }
  }
  fraction = "0." + fraction;
  return parseFloat(fraction);
};
