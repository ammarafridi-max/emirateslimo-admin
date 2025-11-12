import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaPlus } from 'react-icons/fa6';
import { useUsers } from '../hooks/useUsers';
import { useDeleteUser } from '../hooks/useDeleteUser';
import DangerPill from '../../../components/DangerPill';
import SuccessPill from '../../../components/SuccessPill';
import Table from '../../../components/Table';
import PageHeading from '../../../components/PageHeading';
import Breadcrumb from '../../../components/Breadcrumb';
import Loading from '../../../components/Loading';
import PrimaryLink from '../../../components/PrimaryLink';

export default function Users() {
  const { users, isLoadingUsers } = useUsers();
  const { deleteUser, isDeleting } = useDeleteUser();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (jwtData?.role?.toLowerCase() !== 'admin') {
  //     toast.error('You are not allowed to access this page');
  //     navigate('/bookings');
  //   }
  // }, [navigate]);

  if (isLoadingUsers) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Users', href: '/users' },
        ]}
      />
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <PageHeading>Users</PageHeading>
        <PrimaryLink to="/users/create" size="small">
          + Create User
        </PrimaryLink>
      </div>

      <Table $columntemplate="1.5fr_1.5fr_2fr_2fr_1fr_1fr">
        <Table.Head>
          <Table.Heading textAlign="left">Name</Table.Heading>
          <Table.Heading textAlign="left">Username</Table.Heading>
          <Table.Heading textAlign="left">Email</Table.Heading>
          <Table.Heading textAlign="center">Role</Table.Heading>
          <Table.Heading textAlign="center">Active</Table.Heading>
        </Table.Head>
        {users?.map((user, i) => (
          <Table.Row key={i} href={`/users/${user._id}`}>
            <Table.Item textAlign="left">{`${user.firstName} ${user.lastName}`}</Table.Item>
            <Table.Item textAlign="left">{user.username}</Table.Item>
            <Table.Item textAlign="left">{user.email}</Table.Item>
            <Table.Item textAlign="center">{user.role}</Table.Item>
            <Table.Item textAlign="center">
              {user?.isActive ? (
                <SuccessPill>Active</SuccessPill>
              ) : (
                <DangerPill>Inactive</DangerPill>
              )}
            </Table.Item>
            <Table.Item>
              <Table.DeleteLink onClick={() => deleteUser(user._id)}>
                Delete User
              </Table.DeleteLink>
            </Table.Item>
          </Table.Row>
        ))}
      </Table>
      <button
        className="absolute bottom-10 right-10 bg-primary-600 hover:bg-primary-700 cursor-pointer duration-300 p-4 text-white text-2xl rounded-full"
        onClick={() => navigate('/users/create')}
      >
        <FaPlus />
      </button>
    </>
  );
}
