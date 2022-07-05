import {
    AppProps,
    ErrorBoundary,
    ErrorComponent,
    AuthenticationError,
    AuthorizationError,
    ErrorFallbackProps,
    useQueryErrorResetBoundary,
} from 'blitz';
import LoginForm from '../auth/components/LoginForm';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../core/styles/theme';
import createEmotionCache from '../core/utils/createEmotionCache';
import { Box, useMediaQuery } from '@mui/material';
import NavBar from '../core/components/NavBar';

import '../core/styles/global.css';

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function App({
    Component,
    pageProps,
    emotionCache = clientSideEmotionCache,
}: MyAppProps) {
    const getLayout = Component.getLayout || ((page) => page);

    var dark = useMediaQuery('(prefers-color-scheme: dark)');

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme(dark ? 'dark' : 'light')}>
                <NavBar />
                <CssBaseline />
                <ErrorBoundary
                    FallbackComponent={RootErrorFallback}
                    onReset={useQueryErrorResetBoundary().reset}
                >
                    {getLayout(
                        <Box
                            sx={{
                                paddingTop: '3.625rem',
                            }}
                        >
                            <Component {...pageProps} />
                        </Box>,
                    )}
                </ErrorBoundary>
            </ThemeProvider>
        </CacheProvider>
    );
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
    if (error instanceof AuthenticationError) {
        return <LoginForm onSuccess={resetErrorBoundary} />;
    } else if (error instanceof AuthorizationError) {
        return (
            <ErrorComponent
                statusCode={error.statusCode}
                title="Sorry, you are not authorized to access this"
            />
        );
    } else {
        return (
            <ErrorComponent
                statusCode={error.statusCode || 400}
                title={error.message || error.name}
            />
        );
    }
}
