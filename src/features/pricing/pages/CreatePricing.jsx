import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useCreatePricingRule } from '../hooks/useCreatePricingRule';
import PricingForm from '../components/PricingForm';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';

export default function CreatePricing() {
  const { createPricingRule } = useCreatePricingRule();
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    createPricingRule(data);
  }

  return (
    <>
      <Helmet>
        <title>Create Pricing Rule | Pricing Rules</title>
      </Helmet>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Pricing', href: '/pricing' },
          { label: 'Create Pricing Rule', href: '/pricing/create' },
        ]}
      />
      <PageHeading className="mb-5">Create Pricing Rule</PageHeading>
      <PricingForm onSubmit={handleSubmit(onSubmit)} register={register} />
    </>
  );
}
