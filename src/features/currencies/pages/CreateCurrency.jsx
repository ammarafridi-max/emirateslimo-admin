import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import Breadcrumb from '../../../components/Breadcrumb';
import CurrencyForm from '../components/CurrencyForm';

export default function CreateCurrency() {
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <>
      <Helmet>
        <title>Create Currency | Currencies | Emirates Limo Admin</title>
      </Helmet>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Currencies', href: '/currencies' },
          { label: 'Create Currency', href: '/currencies/create' },
        ]}
      />
      <CurrencyForm register={register} onSubmit={handleSubmit(onSubmit)} />
    </>
  );
}
