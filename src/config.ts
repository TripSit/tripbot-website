const CLIENT_ID = import.meta.env.VITE_APP_CLIENT_ID;
const BOT_API = import.meta.env.VITE_APP_BOT_API;
const USERNAME = import.meta.env.VITE_APP_USERNAME;
const PASSWORD = import.meta.env.VITE_APP_PASSWORD;

export default {
    home: `${window.location.origin}/`,
    clientId: CLIENT_ID || "",
    botApi: BOT_API || "",
    username: USERNAME,
    password: PASSWORD,
    tripbotApi: "https://api.tripsit.me",
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