import { Link } from 'blitz';
import { Button } from '@mui/material';
import { GitHub } from '@mui/icons-material';
import { Box } from '@mui/system';

export const ThirdPartySignins = () => {
    return (
        <Link href="/api/auth/github">
            <Button variant="outlined">
                <GitHub sx={{ marginRight: '.5em' }} />{' '}
                <Box sx={{ display: 'inline-block', fontSize: '1.2em' }}>Log In With GitHub</Box>
            </Button>
        </Link>
    );
};
