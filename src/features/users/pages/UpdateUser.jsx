import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { useUpdateUser } from '../hooks/useUpdateUser';
import UserForm from '../components/UserForm';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import Loading from '../../../components/Loading';

export default function UpdateUser() {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const { user, isLoadingUser } = useUser(id);
  const { updateUser, isUpdating } = useUpdateUser();

  useEffect(() => {
    if (user) {
      reset({
        firstName: user?.firstName,
        lastName: user?.lastName,
        username: user?.username,
        email: user?.email,
        role: user?.role,
        isActive: user?.isActive,
      });
    }
  }, [user, reset]);

  function onSubmit(data) {
    data.isActive = data.isActive === 'true';
    updateUser({ id, data });
  }

  if (isLoadingUser) return <Loading />;

  return (
    <>
      <Helmet>
        <title>{`Update User ${user?.firstName} | Emirates Limo`}</title>
      </Helmet>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Users', href: '/users' },
          { label: 'Update User', href: '/users/update' },
        ]}
      />
      <PageHeading>Update User {user?.firstName}</PageHeading>
      <UserForm
        register={register}
        onSubmit={handleSubmit(onSubmit)}
        user={user}
        isLoading={isLoadingUser || isUpdating}
      />
    </>
  );
}
