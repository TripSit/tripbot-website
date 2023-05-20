import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import fr from "./locales/fr.json";

export enum Locales {
  EN = 'en',
  FR = 'fr',
}

export const LOCALES = [
  { value: Locales.EN, caption: 'English' },
  { value: Locales.FR, caption: 'Français' }
]

const messages = {
  [Locales.EN]: en,
  [Locales.FR]: fr
};

const defaultLocale = Locales.EN;

type MessageSchema = typeof en;

const il8n = createI18n<[MessageSchema], 'en' | 'fr'>({
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  legacy: false,
  messages
})

export default il8n;