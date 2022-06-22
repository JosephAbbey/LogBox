import { passportAuth } from 'blitz';
import { VerifyCallback } from 'passport-oauth2';
import { Strategy as GitHubStrategy } from 'passport-github2';
import db from 'db';

export default passportAuth({
    successRedirectUrl: '/',
    errorRedirectUrl: '/',
    secureProxy: true,
    strategies: [
        {
            strategy: new GitHubStrategy(
                {
                    clientID:
                        process.env.GITHUB_CLIENT_ID ??
                        (() => {
                            throw new Error(
                                'You must give a github client id through `GITHUB_CLIENT_ID`',
                            );
                        })(),
                    clientSecret:
                        process.env.GITHUB_CLIENT_SECRET ??
                        (() => {
                            throw new Error(
                                'You must give a github client secret through `GITHUB_CLIENT_SECRET`',
                            );
                        })(),
                    callbackURL: 'http://localhost:3000/api/auth/github/callback',
                },
                async function (
                    _token: string,
                    _tokenSecret: string,
                    profile: any,
                    done: VerifyCallback,
                ) {
                    const email = profile.emails && profile.emails[0]?.value;

                    if (!email) {
                        // This can happen if you haven't enabled email access in your twitter app permissions
                        return done(new Error("Github OAuth response doesn't have email."));
                    }

                    const user = await db.user.upsert({
                        where: { email },
                        create: {
                            email,
                            name: profile.displayName,
                        },
                        update: { email },
                    });

                    const publicData = {
                        userId: user.id,
                        roles: [user.role],
                        source: 'twitter',
                    };
                    done(undefined, { publicData });
                },
            ),
        },
    ],
});
