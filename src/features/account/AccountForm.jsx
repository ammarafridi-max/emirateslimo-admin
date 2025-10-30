import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetMyAccount } from './useGetMyAccount';
import { useUpdateMyAccount } from './useUpdateMyAccount';
import Input from '../../components/FormElements/Input';
import Label from '../../components/FormElements/Label';
import PrimaryButton from '../../components/PrimaryButton';
import PageHeading from '../../components/PageHeading';
import Loading from '../../components/Loading';

export default function AccountForm() {
  const [updateMode, setUpdateMode] = useState(false);
  const { account, isLoading } = useGetMyAccount();
  const { updateAccount, isUpdating } = useUpdateMyAccount();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { name: '', email: '', username: '' },
  });

  async function onSubmit(data) {
    try {
      await updateAccount(data);
      setUpdateMode(false);
    } catch {}
  }

  useEffect(() => {
    if (account) {
      reset({
        name: account?.name || '',
        email: account?.email || '',
        username: account?.username || '',
      });
    }
  }, [account, reset]);

  if (isLoading) return <Loading />;

  return (
    <>
      <PageHeading className="mb-6">My Account</PageHeading>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border border-gray-200 rounded-xl shadow-sm px-10 py-8 space-y-5"
      >
        {/* Name */}
        <div>
          <Label className="mb-1">Full Name</Label>
          <Input
            type="text"
            placeholder="Enter your full name"
            disabled={!updateMode || isUpdating}
            {...register('name', { required: 'Name is required' })}
            className="mt-1 border-gray-300 focus:border-[#FF6B00] focus:ring-[#FF6B00]"
          />
          {errors?.name && (
            <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <Label className="mb-1">Email</Label>
          <Input
            type="email"
            placeholder="Enter your email"
            disabled={!updateMode || isUpdating}
            {...register('email', { required: 'Email is required' })}
            className="mt-1 border-gray-300 focus:border-[#FF6B00] focus:ring-[#FF6B00]"
          />
          {errors?.email && (
            <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Username */}
        <div>
          <Label className="mb-1">Username</Label>
          <Input
            type="text"
            placeholder="Enter your username"
            disabled={!updateMode || isUpdating}
            {...register('username', { required: 'Username is required' })}
            className="mt-1 border-gray-300 focus:border-[#FF6B00] focus:ring-[#FF6B00]"
          />
          {errors?.username && (
            <p className="text-red-600 text-xs mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-3">
          {!updateMode && (
            <PrimaryButton
              type="button"
              onClick={() => setUpdateMode(true)}
              className="bg-[#FF6B00] hover:bg-[#e66000] text-white"
            >
              Edit
            </PrimaryButton>
          )}
          {updateMode && (
            <>
              <PrimaryButton
                type="submit"
                disabled={isUpdating}
                className="bg-[#FF6B00] hover:bg-[#e66000] text-white"
              >
                {isUpdating ? 'Updating...' : 'Update'}
              </PrimaryButton>
              <button
                type="button"
                onClick={() => {
                  reset({
                    name: account?.name,
                    email: account?.email,
                    username: account?.username,
                  });
                  setUpdateMode(false);
                }}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
}
