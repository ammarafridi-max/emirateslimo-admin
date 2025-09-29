import { Helmet } from 'react-helmet-async';
import PageHeading from '../../components/PageHeading';
import PricingForm from './PricingForm';
import Breadcrumb from '../../components/Breadcrumb';
import { useForm } from 'react-hook-form';
import { useCreatePricingRule } from './useCreatePricingRule';

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
      <PageHeading className="mb-5 flex gap-6 items-center">
        Create Pricing Rule
      </PageHeading>
      <PricingForm onSubmit={handleSubmit(onSubmit)} register={register} />
    </>
  );
}
