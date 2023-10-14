export const usePlan = ({ formMethods }) => {
  const { watch } = formMethods;

  const hasExpiration = Number(watch('esRecurrente')) === 1 ? false : true;

  return {
    hasExpiration,
  };
};
