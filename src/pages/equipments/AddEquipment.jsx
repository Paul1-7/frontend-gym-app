import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DASHBOARD, initialFormEquipment } from '@/constants';
import { useMutation } from '@tanstack/react-query';
import schema from '@/schemas';
import { Navigate } from 'react-router-dom';
import { DashboardContainer, Form } from '@/components';
import { addEquipment } from '@/services';
import { ROUTES } from '@/routes';
import EquipmentForm from './EquipmentForm';

const AddEquipment = () => {
  const methods = useForm({
    resolver: yupResolver(schema.equipments),
    defaultValues: initialFormEquipment,
    mode: 'all',
    criteriaMode: 'all',
  });

  const equipment = useMutation({
    mutationFn: (data) => {
      return addEquipment({ data });
    },
  });

  return (
    <DashboardContainer data={DASHBOARD.equipments.add}>
      <Form methods={methods} onSubmit={equipment.mutate}>
        <EquipmentForm isLoading={equipment.isLoading} />
      </Form>
      {!equipment.isLoading && !equipment.isError && equipment.isSuccess && <Navigate to={ROUTES.equipment.default} />}
    </DashboardContainer>
  );
};

export default AddEquipment;
