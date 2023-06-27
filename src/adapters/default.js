export const getActivesRegisters = (list = []) => {
  return list.filter(({ estado }) => estado === 1);
};
