const dateFormatter = (date) => {
  const fecha = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  return fecha;
};
export default dateFormatter;
