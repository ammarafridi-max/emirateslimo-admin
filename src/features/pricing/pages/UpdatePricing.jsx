import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { usePricingRule } from '../hooks/usePricingRule';
import { useUpdatePricingRule } from '../hooks/useUpdatePricingRule';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../../components/Breadcrumb';
import PricingForm from '../components/PricingForm';
import PageHeading from '../../../components/PageHeading';

export default function UpdatePricing() {
  const { id } = useParams();
  const { pricingRule } = usePricingRule(id);
  const { updatePricingRule, isUpdatingPricingRule } = useUpdatePricingRule();
  const { register, handleSubmit, reset } = useForm();

  function onSubmit(data) {
    updatePricingRule({ id, data });
  }

  useEffect(() => {
    if (pricingRule) {
      reset({
        name: pricingRule?.name,
        pickupZones: pricingRule?.pickupZones.map((zone) => zone._id),
        dropoffZones: pricingRule?.dropoffZones.map((zone) => zone._id),
        vehicles: pricingRule?.vehicles.map((vehicle) => vehicle._id),
        pricing: pricingRule?.pricing,
      });
    }
  }, [id, pricingRule]);

  return (
    <>
      <Helmet>
        <title>{`${pricingRule?.name}`}</title>
      </Helmet>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Pricing', href: '/pricing' },
          { label: 'Update Pricing Rule', href: `/pricing/${id}` },
        ]}
      />
      <PageHeading className="mb-5">Update Pricing Rule</PageHeading>
      <PricingForm onSubmit={handleSubmit(onSubmit)} register={register} />
    </>
  );
}
