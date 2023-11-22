import { msg, regex } from '@/constants/validaciones';
import * as yup from 'yup';
const roles = yup.object().shape({
  nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
  idMenus: yup.array().of(yup.string()).min(1, 'Tienes que elegir al menos un menú'),
  menus: yup.array().test({
    test: (menus, { parent }) => {
      const { idMenus } = parent;
      let hasMainSubmenu = true;

      menus.forEach(({ submenus }) => {
        if (!hasMainSubmenu) return;

        const filteredSubmenus = submenus.filter(({ value }) => idMenus.includes(value));

        if (!filteredSubmenus.length) {
          return;
        }

        hasMainSubmenu = filteredSubmenus.some(({ others }) => others.isMain);
      });

      return hasMainSubmenu;
    },
    message: `Tiene que seleccionar la lista del módulo si selecciona agregar, modificar, eliminar o detalle`,
  }),
});

export default roles;
