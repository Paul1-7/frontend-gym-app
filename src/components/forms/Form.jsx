import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { FormProvider } from 'react-hook-form';

const Form = forwardRef(({ methods, onSubmit, children, ...props }, ref) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} {...props} ref={ref}>
        {children}
      </form>
    </FormProvider>
  );
});

Form.displayName = 'Form';

Form.propTypes = {
  methods: PropTypes.object,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
};

export default Form;
