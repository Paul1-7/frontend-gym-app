import { PropTypes } from 'prop-types';
import { Autocomplete, ButtonLink, Input, Select } from '@/components';
import { TYPES_CATEGORIES_ITEMS } from '@/constants';
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { ROUTES } from '@/routes/routes';

const CategoryForm = ({ isLoading, typeList = [], disabledType = false }) => {
  return (
    <>
      <Grid container sx={{ display: 'grid' }} spacing={2}>
        <Grid item xs={12} wrap="wrap" container spacing={2}>
          <Grid item xs={12} md={6}>
            <Select label="Tipo" name="tipo" items={TYPES_CATEGORIES_ITEMS} disabled={disabledType} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Input label="Nombre" name="nombre" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete label="Lista del tipo" name="tipoLista" items={typeList} multiple />
          </Grid>
        </Grid>
      </Grid>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2rem', gap: '1rem' }}>
        <ButtonLink variant="outlined" color="error" to={ROUTES.categories.default}>
          Cancelar
        </ButtonLink>
        <LoadingButton
          type="submit"
          loading={isLoading}
          loadingPosition="start"
          startIcon={<Save />}
          color="secondary"
          variant="outlined"
        >
          Guardar
        </LoadingButton>
      </div>
    </>
  );
};

CategoryForm.propTypes = {
  isLoading: PropTypes.bool,
  disabledType: PropTypes.bool,
  typeList: PropTypes.any,
};

export default CategoryForm;
