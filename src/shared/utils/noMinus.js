const noMinus = (numberStr) => {
  if (numberStr === "-0.0") {
    return "0.0";
  }
  return numberStr;
};

export default noMinus;
