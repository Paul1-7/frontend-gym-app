export const getActivesRegisters = (list = []) => {
  return list.filter(({ estado }) => estado === 1);
};

export const addIndexListAdapter = (list = []) => {
  return list.map((item, idx) => ({ ...item, index: idx + 1 }));
};
