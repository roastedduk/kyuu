import { SvelteKitAuth } from 'sk-auth'
import { DiscordOAuth2Provider } from 'sk-auth/providers'

export const appAuth = new SvelteKitAuth({
	providers: [
		new DiscordOAuth2Provider({
			clientId: import.meta.env.VITE_DISCORD_OAUTH_CLIENT_ID,
			clientSecret: import.meta.env.VITE_DISCORD_OAUTH_CLIENT_SECRET,
			profile(profile) {
				return { ...profile, provider: 'discord' }
			}
		})
	],
	callbacks: {
		jwt(token, profile) {
			if (profile?.provider) {
				const { provider, ...account } = profile
				token = {
					...token,
					user: {
						...(token.user ?? {}),
						connections: { ...(token.user?.connections ?? {}), [provider]: account }
					}
				}
			}

			return token
		}
	},
	jwtSecret: import.meta.env.VITE_JWT_SECRET_KEY
})
