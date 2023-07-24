import { type APIGuild, type APIUser } from 'discord.js';
import { defineStore } from 'pinia'
import generateRandomString from '@/utils/randomString';
import queryString from '@/utils/queryString';
import config from '@/config';

export const useUserStore = defineStore('user', {
  state: () => ({ 
    token: null as string | null,
    userId: null as string | null,
    user: null as APIUser | null,
    guilds: [] as Array<APIGuild>,
    currentGuild: null as APIGuild | null,
    currentGuildId: null as string | null,
    stateParam: null as string | null,
    sideBarOpen: false as boolean,
    dark: true as boolean,
  }),
  getters: {
    isSideBarOpen(state) {
      return state.sideBarOpen;
    },
    isDark(state) {
        return state.dark;
    },
    getUser(state) {
        return state.user;
    },
    ifAuthenticated: (state) => {
        return !!state.token;
    }
  },
  actions: {
    toggleSidebar() {
        this.sideBarOpen = !this.sideBarOpen;
    },
    toggleTheme() {
      this.dark = !this.dark;
      localStorage.setItem('preferedTheme', this.dark ? 'dark' : 'light');
    },
    login(token:string, userId:string, user:APIUser) {
        // console.log('login')
        // console.log(JSON.stringify(user, null, 2))
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('user', JSON.stringify(user));
        this.token = token;
        this.userId = userId;
        this.user = user;
    },
    clearAuth() {
      this.token = null;
      this.userId = null;
      this.user = null;
    },
    clearGuilds() {
      this.guilds = [];
      this.currentGuild = null;
      this.currentGuildId = null;
    },
    logout() {
        this.clearAuth();
        this.clearGuilds();
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('user');
    },
    autoLogin() {
        const token = localStorage.getItem('token');
        if (!token)
            return;
        const userId = localStorage.getItem('userId') as string;
        const user = JSON.parse(localStorage.getItem('user') as string) as APIUser;
        this.login(token, userId, user);
    },
    setState() {
        const rndStr = generateRandomString();
        localStorage.setItem('stateParam', rndStr);
        this.stateParam = rndStr;
    },
    setGuilds(token:string) {
        fetch(`${config.discordApi}/users/@me/guilds`, {
                  headers: {
                      authorization: token,
                  },
              })
              .then((res) => res.json())
              .then((response) => {
                  if (response.code === 0) {
                      const loginParams = {
                          client_id: config.discordClientId,
                          redirect_uri: `${config.home}dashboard/home`,
                          response_type: "token",
                          scope: "identify",
                          state: this.stateParam as string,
                      };
                      window.location.replace(`${config.discordApi}/oauth2/authorize${queryString(loginParams)}`);
                      return;
                  }
                  //check if owner or admin
                  this.guilds = response.filter((guild:APIGuild) => guild.owner || ((parseInt((guild.permissions as string), 10)) & 0x8) === 0x8);
              })
              .catch(() => console.log("Failed to get guilds list."));
      },
  }
})
