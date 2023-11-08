export const getMenusListAdapter = (items) => {
  return items.map((item) => ({
    ...item,
    submenus: item.submenus.map((submenu) => ({
      label: submenu.nombre,
      value: submenu.id,
      others: submenu,
    })),
  }));
};
