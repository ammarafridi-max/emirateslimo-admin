import { capitalCase } from 'change-case';
import FormRow from '../../../components/FormElements/FormRow';
import Input from '../../../components/FormElements/Input';
import Label from '../../../components/FormElements/Label';
import Select from '../../../components/FormElements/Select';
import PrimaryButton from '../../../components/PrimaryButton';

export default function UserForm({ register, onSubmit, user, isLoading }) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-7 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 mt-6"
    >
      <FormRow>
        <Label>First Name</Label>
        <Input
          type="text"
          {...register('firstName', { required: 'First name is required' })}
        />
      </FormRow>

      <FormRow>
        <Label>Last Name</Label>
        <Input
          type="text"
          {...register('lastName', { required: 'Last name is required' })}
        />
      </FormRow>

      <FormRow>
        <Label>Username</Label>
        <Input
          type="text"
          {...register('username', { required: 'Username is required' })}
        />
      </FormRow>

      <FormRow>
        <Label>Email</Label>
        <Input
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email',
            },
          })}
        />
      </FormRow>

      <FormRow>
        <Label>Role</Label>
        <Select {...register('role', { required: 'Role is required' })}>
          {[
            { label: 'Admin', value: 'admin' },
            { label: 'Agent', value: 'agent' },
          ].map((el) => (
            <option value={el.value} key={el.value}>
              {el.label}
            </option>
          ))}
        </Select>
      </FormRow>

      <FormRow>
        <Label>Active</Label>
        <Select
          {...register('isActive', { required: 'Active state is required' })}
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </Select>
      </FormRow>

      <FormRow>
        {user?._id ? (
          ''
        ) : (
          <>
            <Label>Password</Label>
            <Input
              type="password"
              autoComplete="new-password"
              {...register('password')}
            />
          </>
        )}
      </FormRow>

      <div className="flex items-center gap-2.5 mt-5">
        {user?._id ? (
          <PrimaryButton type="submit" size="small" disabled={isLoading}>
            {isLoading ? 'Updating' : 'Update User'}
          </PrimaryButton>
        ) : (
          <PrimaryButton type="submit" size="small" disabled={isLoading}>
            {isLoading ? 'Creating' : 'Create User'}
          </PrimaryButton>
        )}
      </div>
    </form>
  );
}
