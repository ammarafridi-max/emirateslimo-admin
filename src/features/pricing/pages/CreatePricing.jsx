import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useCreatePricingRule } from '../hooks/useCreatePricingRule';
import PricingForm from '../components/PricingForm';
import PageHeading from '../../../components/PageHeading';
import Breadcrumb from '../../../components/Breadcrumb';

export default function CreatePricing() {
  const { createPricingRule } = useCreatePricingRule();
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    createPricingRule(data);
  }

  return (
    <>
      <Helmet>
        <title>Create Pricing Rule</title>
      </Helmet>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Pricing', href: '/pricing' },
          { label: 'Create Pricing Rule', href: '/pricing/create' },
        ]}
      />
      <PricingForm onSubmit={handleSubmit(onSubmit)} register={register} />
    </>
  );
}
