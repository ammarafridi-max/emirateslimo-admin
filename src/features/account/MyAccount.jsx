import { Helmet } from 'react-helmet-async';
import AccountForm from './AccountForm';
import Breadcrumb from '../../components/Breadcrumb';

export default function MyAccount() {
  return (
    <>
      <Helmet>
        <title>My Account</title>
      </Helmet>

      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'My Account', href: '/account' },
        ]}
      />

      <div className="max-w-3xl mx-auto">
        <AccountForm />
      </div>
    </>
  );
}
