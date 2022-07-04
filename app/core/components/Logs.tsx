import { Alert, Box, Paper, Typography } from '@mui/material';
import { Fragment, useRef } from 'react';

export function Logs({
    logs,
    name,
}: {
    logs: {
        id: number;
        message: string;
        level: 'none' | 'info' | 'warning' | 'error';
        createdAt: Date;
    }[];
    name: string;
}) {
    const scrollContainer = useRef<HTMLDivElement>();

    if (scrollContainer.current)
        scrollContainer.current.scrollTop = scrollContainer.current.scrollHeight;

    return (
        <Paper
            sx={{
                margin: '.5em',
                borderRadius: '.25em',
                overflow: 'hidden',
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    padding: '.25em',
                }}
            >
                {name}
            </Typography>
            <Box sx={{ maxHeight: 'calc(100vh - 11em)', overflowY: 'auto' }} ref={scrollContainer}>
                {logs.map((log, index) =>
                    log.level === 'none' ? (
                        <Box
                            sx={{
                                padding: '.25em',
                                paddingX: '.5em',
                                borderRadius: 0,
                                borderTop: '1px solid',
                                borderTopColor: 'grey.100',
                                overflowX: 'auto',
                            }}
                        >
                            <Typography sx={{ fontSize: '1.5em' }}>{log.message}</Typography>
                        </Box>
                    ) : (
                        <Alert
                            key={index}
                            severity={log.level}
                            sx={{
                                padding: '.25em',
                                paddingX: '.5em',
                                borderRadius: 0,
                                borderTop: '1px solid',
                                borderTopColor: 'grey.100',
                                overflowX: 'auto',
                            }}
                        >
                            <Box sx={{ display: 'grid', gridTemplateColumns: '160px 1fr' }}>
                                <Typography
                                    sx={{
                                        marginRight: '.5em',
                                        color: 'text.disabled',
                                    }}
                                >
                                    {log.createdAt.toLocaleDateString().replaceAll('/', '-')}{' '}
                                    {log.createdAt.toLocaleTimeString()}
                                </Typography>
                                <Typography>
                                    {log.message.split('\n').map((line, index) => (
                                        <Fragment key={index}>
                                            {line}
                                            <br />
                                        </Fragment>
                                    ))}
                                </Typography>
                            </Box>
                        </Alert>
                    ),
                )}
            </Box>
        </Paper>
    );
}

export default Logs;
