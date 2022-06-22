import { Link } from "blitz"
import { Button } from "@mui/material"

export const ThirdPartySignins = () => {
    return (
        <Link href="/api/auth/github">
            <Button variant="outlined">Log In With GitHub</Button>
        </Link>
    )
}
