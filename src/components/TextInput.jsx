import { useId } from 'react';
import { useController } from 'react-hook-form';

import { Input } from '@/components/ui';
import { TextArea } from '@/components/ui/TextArea';

const TextInput = ({ control, multiline, name, type = 'text', ...rest }) => {
  const form = useController({ control, name });

  const error = form.formState.errors[name];

  const Component = multiline ? TextArea : Input;

  return (
    <div className='flex flex-col gap-2'>
      <Component
        {...rest}
        type={type}
        name={name}
        onChange={form.field.onChange}
        onBlur={form.field.onBlur}
        value={form.field.value || ''}
      />
      {error?.message && (
        <div className='text-sm text-red-500'>{error.message}</div>
      )}
    </div>
  );
};

export default TextInput;
