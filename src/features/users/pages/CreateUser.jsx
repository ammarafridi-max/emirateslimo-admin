import { Helmet } from 'react-helmet-async';
import UserForm from '../components/UserForm';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import { useForm } from 'react-hook-form';
import { useCreateUser } from '../hooks/useCreateUser';

export default function CreateUser() {
  const { createUser, isCreating } = useCreateUser();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      role: 'admin',
      isActive: true,
    },
  });

  function onSubmit(data) {
    data.isActive = data.isActive === 'true';
    createUser(data);
  }

  return (
    <>
      <Helmet>
        <title>Create User | Emirates Limo</title>
      </Helmet>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Users', href: '/users' },
          { label: 'Create User', href: '/users/create' },
        ]}
      />
      <PageHeading>Create User</PageHeading>
      <UserForm register={register} onSubmit={handleSubmit(onSubmit)} />
    </>
  );
}
