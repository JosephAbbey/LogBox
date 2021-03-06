import { Suspense, useState, MouseEvent, useRef, RefObject } from 'react';
import {
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
    Typography,
    Tooltip,
    Paper,
    Badge,
    Box,
    Portal,
    CircularProgress,
} from '@mui/material';
import { useCurrentUser } from 'app/core/hooks/useCurrentUser';
import logout from 'app/auth/mutations/logout';
import { useMutation, Routes, Link } from 'blitz';
import { Home, Logout, Settings } from '@mui/icons-material';

function Profile({ root }: { root: RefObject<HTMLDivElement> }) {
    const currentUser = useCurrentUser();
    const [logoutMutation] = useMutation(logout);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2, marginLeft: 'auto', marginRight: '.5em' }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Badge badgeContent={currentUser ? undefined : '?'} color="primary">
                        <Avatar sx={{ width: 32, height: 32 }}>
                            <Settings />
                        </Avatar>
                    </Badge>
                </IconButton>
            </Tooltip>
            <Portal container={root.current}>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    {currentUser
                        ? [
                              <MenuItem key={0}>
                                  User id:&nbsp;<code>{currentUser.id}</code>
                              </MenuItem>,
                              <MenuItem key={1}>
                                  User role:&nbsp;<code>{currentUser.role}</code>
                              </MenuItem>,
                              <Divider key={2} />,
                              <MenuItem
                                  key={3}
                                  onClick={async () => {
                                      await logoutMutation();
                                  }}
                              >
                                  <ListItemIcon>
                                      <Logout fontSize="small" />
                                  </ListItemIcon>
                                  Logout
                              </MenuItem>,
                          ]
                        : [
                              <MenuItem key={0}>
                                  <Link href={Routes.SignupPage()}>
                                      <strong>Sign Up</strong>
                                  </Link>
                              </MenuItem>,
                              <MenuItem key={1}>
                                  <Link href={Routes.LoginPage()}>
                                      <strong>Login</strong>
                                  </Link>
                              </MenuItem>,
                          ]}
                </Menu>
            </Portal>
        </>
    );
}

function NavBarInner() {
    const root = useRef<HTMLDivElement>(null);

    return (
        <Box ref={root}>
            <Paper
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    borderRadius: '0',
                    padding: '.5em',
                    position: 'fixed',
                    width: '100%',
                    top: 0,
                    left: 0,
                }}
            >
                <Link href={Routes.Home()}>
                    <IconButton size="small" sx={{ ml: 2, marginX: '.5em' }} aria-label="Home">
                        <Avatar
                            sx={{
                                width: 32,
                                height: 32,
                                ml: 2,
                                marginLeft: 'auto',
                                marginRight: '.5em',
                            }}
                        >
                            <Home />
                        </Avatar>
                    </IconButton>
                </Link>

                <Link href={Routes.AppsPage()}>
                    <Typography sx={{ minWidth: 100, cursor: 'pointer' }}>My Apps</Typography>
                </Link>

                <Suspense
                    fallback={
                        <IconButton
                            size="small"
                            sx={{ ml: 2, marginLeft: 'auto', marginRight: '.5em' }}
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>
                                <CircularProgress size="1em" color="inherit" />
                            </Avatar>
                        </IconButton>
                    }
                >
                    <Profile root={root} />
                </Suspense>
            </Paper>
        </Box>
    );
}

export function NavBar() {
    return (
        <Suspense fallback="Loading...">
            <NavBarInner />
        </Suspense>
    );
}

export default NavBar;
