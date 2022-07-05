import { AuthenticationError, Link, useMutation, Routes, PromiseReturnType } from 'blitz';
import { LabeledTextField } from '../../core/components/LabeledTextField';
import { Form, FORM_ERROR } from '../../core/components/Form';
import login from '../../auth/mutations/login';
import { Login } from '../../auth/validations';
import { Box, Button, Paper, Typography } from '@mui/material';
import { ThirdPartySignins } from './ThirdPartySignins';

type LoginFormProps = {
    onSuccess?: (user: PromiseReturnType<typeof login>) => void;
};

export const LoginForm = (props: LoginFormProps) => {
    const [loginMutation] = useMutation(login);

    return (
        <Box sx={{ display: 'grid', placeItems: 'center' }}>
            <Paper
                sx={{
                    display: 'inline-grid',
                    padding: '2em',
                    backgroundColor: 'background.paper',
                    minWidth: '30em',
                    placeItems: 'center',
                    marginTop: '2em',
                }}
            >
                <Typography sx={{ marginTop: 0, marginBottom: '1em' }} variant="h5">
                    Login
                </Typography>
                <Form
                    submitText="Login"
                    schema={Login}
                    initialValues={{ email: '', password: '' }}
                    onSubmit={async (values) => {
                        try {
                            const user = await loginMutation(values);
                            props.onSuccess?.(user);
                        } catch (error: any) {
                            if (error instanceof AuthenticationError) {
                                return { [FORM_ERROR]: 'Sorry, those credentials are invalid' };
                            } else {
                                return {
                                    [FORM_ERROR]:
                                        'Sorry, we had an unexpected error. Please try again. - ' +
                                        error.toString(),
                                };
                            }
                        }
                    }}
                >
                    <LabeledTextField
                        name="email"
                        label="Email"
                        placeholder="Email"
                        autoComplete="email"
                    />
                    <LabeledTextField
                        name="password"
                        label="Password"
                        placeholder="Password"
                        type="password"
                        autoComplete="current-password"
                    />
                    <div>
                        <Link href={Routes.ForgotPasswordPage()}>
                            <Button variant="text" sx={{ fontSize: '.7em' }}>
                                Forgot your password?
                            </Button>
                        </Link>
                    </div>
                </Form>
                <div>
                    or{'   '}
                    <Link href={Routes.SignUpPage()}>
                        <Button>Sign Up</Button>
                    </Link>
                </div>
                <br />
                <ThirdPartySignins />
            </Paper>
        </Box>
    );
};

export default LoginForm;
