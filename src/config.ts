const DISCORD_GUILD_ID = import.meta.env.VITE_DISCORD_GUILD_ID;
const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = import.meta.env.VITE_DISCORD_CLIENT_SECRET;
const DISCORD_CLIENT_REDIRECT_URI = import.meta.env.VITE_DISCORD_CLIENT_REDIRECT_URI;
const DISCORD_CLIENT_TOKEN = import.meta.env.VITE_DISCORD_CLIENT_TOKEN;

const BOT_API = import.meta.env.VITE_APP_BOT_API;
const DNS_DOMAIN = import.meta.env.DNS_DOMAIN;
const BOT_DOMAIN = import.meta.env.VITE_BOT_DOMAIN;

const DB_API_USERNAME = import.meta.env.VITE_DB_API_USERNAME;
const DB_API_PASSWORD = import.meta.env.VITE_DB_API_PASSWORD;
const TB_API_USERNAME = import.meta.env.VITE_TB_API_USERNAME;
const TB_API_PASSWORD = import.meta.env.VITE_TB_API_PASSWORD;

export default {
    home: `${window.location.origin}/`,
    discordGuildId: DISCORD_GUILD_ID || "",
    discordClientId: DISCORD_CLIENT_ID || "",
    discordClientSecret: DISCORD_CLIENT_SECRET || "",
    discordClientRedirect: DISCORD_CLIENT_REDIRECT_URI || "",
    discordClientToken: DISCORD_CLIENT_TOKEN || "",
    botApi: BOT_API || "",
    dbApiUsername: DB_API_USERNAME,
    dbApiPassword: DB_API_PASSWORD,
    tbApiUsername: TB_API_USERNAME,
    tbApiPassword: TB_API_PASSWORD,
    databaseApi: `https://api.${DNS_DOMAIN}`,
    tripbotApi: `https://api.${BOT_DOMAIN}`,
    discordApi: "https://discord.com/api",
    discordCdn: "https://cdn.discordapp.com",
    githubHome: "https://github.com/TripSit/TripBot",
    colors: {
        default: "#344675",
        primary: "#42b883",
        info: "#1d8cf8",
        danger: "#fd5d93",
        teal: "#00d6b4",
        primaryGradient: ['rgba(66,134,121,0.55)', 'rgba(66,134,121,0.05)', 'rgba(66,134,121,0)'],
    }
}