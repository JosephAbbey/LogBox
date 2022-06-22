import { BlitzPage, useMutation, Routes, Link } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { Suspense } from "react"
import { Button } from "@mui/material"

const UserInfo = () => {
    const currentUser = useCurrentUser()
    const [logoutMutation] = useMutation(logout)

    if (currentUser) {
        return (
            <>
                <Button
                    className="button small"
                    onClick={async () => {
                        await logoutMutation()
                    }}
                    variant="contained"
                >
                    Logout
                </Button>
                <div>
                    User id: <code>{currentUser.id}</code>
                    <br />
                    User role: <code>{currentUser.role}</code>
                </div>
            </>
        )
    } else {
        return (
            <>
                <Link href={Routes.SignUpPage()}>
                    <Button>
                        <strong>Sign Up</strong>
                    </Button>
                </Link>
                <Link href={Routes.LoginPage()}>
                    <Button>
                        <strong>Login</strong>
                    </Button>
                </Link>
            </>
        )
    }
}

const Home: BlitzPage = () => {
    return (
        <div className="container">
            <Suspense fallback="Loading...">
                <UserInfo></UserInfo>
            </Suspense>
        </div>
    )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
