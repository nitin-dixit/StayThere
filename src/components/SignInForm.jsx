import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import api from '@/api';
import { useAuth } from '@/components/AuthProvider';
import Form from '@/components/Form';
import TextInput from '@/components/TextInput';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Separator,
} from '@/components/ui';
import useSignInMutation from '@/hooks/mutations/useSignInMutation';

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const SignInForm = () => {
  const { setToken, setUser } = useAuth();

  const signInMutation = useSignInMutation();

  const form = useForm({
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await signInMutation.mutateAsync(data);
      setToken(response.data.accessToken);
      setUser(response.data.user);
    } catch (e) {
      form.setError('root', {
        message: e.response.data.message,
      });
    }
  };

  return (
    <Card className='mx-auto w-[500px]'>
      <CardHeader>
        <h2 className='text-center text-2xl'>Sign In</h2>
        <p className='text-center text-muted-foreground'>
          Sign in using your email and password
        </p>
        <Separator />
      </CardHeader>
      <CardContent>
        <Form form={form}>
          <TextInput
            control={form.control}
            name='email'
            placeholder='name@example.com'
          />
          <TextInput control={form.control} type='password' name='password' />
          <Button
            disabled={signInMutation.isPending}
            onClick={form.handleSubmit(onSubmit)}
          >
            {signInMutation.isPending ? 'Loading...' : 'Sign In'}
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
