import { useMutation, BlitzPage, Routes, useParam, Link } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import createWebhook from 'app/webhooks/mutations/createWebhook';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const CreateWebhookPage: BlitzPage = () => {
    const logsId = useParam('logsId', 'number');
    const [createWebhookMutation] = useMutation(createWebhook);
    const [output, updateOutput] = useState(' ');

    return (
        <div>
            <Typography variant="h4" sx={{ margin: '.5em' }}>
                Create Webhook
            </Typography>

            <Box sx={{ width: '20em' }}>
                <TextField
                    disabled
                    value={output}
                    label="URL"
                    fullWidth
                    sx={{ marginLeft: '1em', display: 'block' }}
                />
            </Box>

            <Button
                onClick={async () => {
                    const webhook = await createWebhookMutation({ logsId: logsId! });
                    if (!webhook) throw new Error('Failed to create webhook');
                    updateOutput(window.location.origin + '/api/hooks/' + webhook.id);
                }}
                sx={{ margin: '1em', display: output === ' ' ? 'block' : 'none' }}
            >
                Create
            </Button>

            <Box sx={{ display: output === ' ' ? 'none' : 'block' }}>
                <Typography sx={{ fontSize: '.75em', color: 'text.disabled', marginLeft: '2em' }}>
                    You will not be able to see the url after this.
                </Typography>
                <Link href={Routes.ShowLogsPage({ logsId: logsId! })}>
                    <Button sx={{ margin: '1em' }}>Ok</Button>
                </Link>
            </Box>
        </div>
    );
};

CreateWebhookPage.authenticate = true;
CreateWebhookPage.getLayout = (page) => <Layout title={'Create new webhook'}>{page}</Layout>;

export default CreateWebhookPage;
