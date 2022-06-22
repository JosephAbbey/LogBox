import { AuthenticationError, Link, useMutation, Routes, PromiseReturnType } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { Button } from "@mui/material"
import { ThirdPartySignins } from "./ThirdPartySignins"

type LoginFormProps = {
    onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
    const [loginMutation] = useMutation(login)

    return (
        <div>
            <h1>Login</h1>
            <Form
                submitText="Login"
                schema={Login}
                initialValues={{ email: "", password: "" }}
                onSubmit={async (values) => {
                    try {
                        const user = await loginMutation(values)
                        props.onSuccess?.(user)
                    } catch (error: any) {
                        if (error instanceof AuthenticationError) {
                            return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
                        } else {
                            return {
                                [FORM_ERROR]:
                                    "Sorry, we had an unexpected error. Please try again. - " +
                                    error.toString(),
                            }
                        }
                    }
                }}
            >
                <LabeledTextField name="email" label="Email" placeholder="Email" />
                <LabeledTextField
                    name="password"
                    label="Password"
                    placeholder="Password"
                    type="password"
                />
                <div>
                    <Link href={Routes.ForgotPasswordPage()}>
                        <Button>Forgot your password?</Button>
                    </Link>
                </div>
            </Form>
            <ThirdPartySignins />
            <br />
            <br />
            Or
            <Link href={Routes.SignUpPage()}>
                <Button>Sign Up</Button>
            </Link>
        </div>
    )
}

export default LoginForm
