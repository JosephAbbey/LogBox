import { Paper } from '@mui/material';
import { PropsWithChildren } from 'react';

export function Aside({ children }: PropsWithChildren<{}>) {
    return (
        <Paper
            sx={{
                width: '20rem',
                padding: '1rem',
                borderRadius: 0,
                position: 'fixed',
                zIndex: -1,
                paddingTop: '3.625rem',
                height: '100%',
                top: 0,
                left: 0,
                backgroundColor: 'background.default',
            }}
        >
            {children}
        </Paper>
    );
}

export default Aside;
