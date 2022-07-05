import { useRouter, BlitzPage, Routes } from 'blitz';
import Layout from '../../core/layouts/Layout';
import { SignUpForm } from '../../auth/components/SignUpForm';

const SignUpPage: BlitzPage = () => {
    const router = useRouter();

    return (
        <div>
            <SignUpForm onSuccess={() => router.push(Routes.Home())} />
        </div>
    );
};

SignUpPage.redirectAuthenticatedTo = '/';
SignUpPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>;

export default SignUpPage;
