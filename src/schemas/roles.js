import { msg, regex } from '@/constants/validaciones';
import * as yup from 'yup';

const roles = yup
  .object()
  .shape({
    nombre: yup.string().matches(regex.alphaNumeric, msg.alphaNumeric).required(),
    idMenus: yup.array().of(yup.string()).min(1, 'Tienes que elegir al menos un menú'),
    menus: yup.array(),
  })
  .when('idMenus', {
    is: (idMenus) => idMenus && idMenus.length > 0,
    then: () =>
      yup
        .array()
        .test(
          'is-main-selected',
          'Debes seleccionar un submenu con isMain=true para cada submenu con isMain=false',
          function (value) {
            console.log('TCL: value', value);
            const { idMenus } = this.parent;
            console.log('TCL: idMenus', idMenus);
            const submenusWithIsMainFalse = value.filter((submenu) => submenu.isMain === false);
            const submenusWithIsMainTrue = value.filter((submenu) => submenu.isMain === true);

            const isValid = submenusWithIsMainFalse.every((submenu) => {
              return submenusWithIsMainTrue.some((mainSubmenu) => mainSubmenu.id === submenu.id);
            });

            return isValid;
          }
        ),
  });

export default roles;
