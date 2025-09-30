import { Helmet } from 'react-helmet-async';
import AvailabilityForm from '../components/AvailabilityForm';
import Breadcrumb from '../../../components/Breadcrumb';
import { useForm } from 'react-hook-form';
import { useCreateAvailabilityRule } from '../hooks/useCreateAvailabilityRule';

export default function CreateAvailabilityRule() {
  const { register, handleSubmit } = useForm();
  const { createAvailabilityRule, isCreatingAvailabilityRule } =
    useCreateAvailabilityRule();

  function onSubmit(data) {
    createAvailabilityRule(data);
  }

  return (
    <>
      <Helmet>
        <title>Create Availability Rule | Availability Rule</title>
      </Helmet>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Availability Rules', href: '/availability-rules' },
          {
            label: 'Create Availability Rule',
            href: '/availability-rules/create',
          },
        ]}
      />
      <AvailabilityForm onSubmit={handleSubmit(onSubmit)} register={register} />
    </>
  );
}
