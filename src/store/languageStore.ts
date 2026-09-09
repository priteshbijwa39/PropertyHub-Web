import { create } from "zustand";
import { persist } from "zustand/middleware";

export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "mr", label: "मराठी" },
  { code: "gu", label: "ગુજરાતી" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

export const isLanguageCode = (value: string): value is LanguageCode =>
  LANGUAGES.some(({ code }) => code === value);

type TranslationKey =
  | "language"
  | "dashboard"
  | "allProperties"
  | "myProperties"
  | "addProperty"
  | "favorites"
  | "profile"
  | "logout"
  | "login"
  | "signUp"
  | "welcome"
  | "loginToManage"
  | "email"
  | "password"
  | "rememberMe"
  | "loginSuccessful"
  | "createAccount"
  | "browse"
  | "explorePropertyHub"
  | "totalProperties"
  | "myFavorites"
  | "recentProperties"
  | "propertyPriceRange"
  | "availableProperties"
  | "minimum"
  | "maximum"
  | "properties"
  | "overview";

const translations: Record<LanguageCode, Record<TranslationKey, string>> = {
  en: {
    language: "Language",
    dashboard: "Dashboard",
    allProperties: "All Properties",
    myProperties: "My Properties",
    addProperty: "Add Property",
    favorites: "Favorites",
    profile: "Profile",
    logout: "Logout",
    login: "Login",
    signUp: "Sign up",
    welcome: "Welcome",
    loginToManage: "Login to manage your properties",
    email: "Email",
    password: "Password",
    rememberMe: "Remember me",
    loginSuccessful: "Login successful!",
    createAccount: "Create Account",
    browse: "Browse",
    explorePropertyHub: "Explore PropertyHub",
    totalProperties: "Total Properties",
    myFavorites: "My Favorites",
    recentProperties: "Recent Properties",
    propertyPriceRange: "Property Price Range",
    availableProperties: "Available Properties",
    minimum: "Minimum",
    maximum: "Maximum",
    properties: "Properties",
    overview: "Overview of your property management",
  },
  hi: {
    language: "भाषा",
    dashboard: "डैशबोर्ड",
    allProperties: "सभी संपत्तियां",
    myProperties: "मेरी संपत्तियां",
    addProperty: "संपत्ति जोड़ें",
    favorites: "पसंदीदा",
    profile: "प्रोफ़ाइल",
    logout: "लॉग आउट",
    login: "लॉगिन",
    signUp: "साइन अप",
    welcome: "स्वागत है",
    loginToManage: "अपनी संपत्तियों को प्रबंधित करने के लिए लॉगिन करें",
    email: "ईमेल",
    password: "पासवर्ड",
    rememberMe: "मुझे याद रखें",
    loginSuccessful: "लॉगिन सफल रहा!",
    createAccount: "खाता बनाएं",
    browse: "देखें",
    explorePropertyHub: "PropertyHub देखें",
    totalProperties: "कुल संपत्तियां",
    myFavorites: "मेरी पसंद",
    recentProperties: "हाल की संपत्तियां",
    propertyPriceRange: "संपत्ति की कीमत सीमा",
    availableProperties: "उपलब्ध संपत्तियां",
    minimum: "न्यूनतम",
    maximum: "अधिकतम",
    properties: "संपत्तियां",
    overview: "आपके संपत्ति प्रबंधन का अवलोकन",
  },
  mr: {
    language: "भाषा",
    dashboard: "डॅशबोर्ड",
    allProperties: "सर्व मालमत्ता",
    myProperties: "माझ्या मालमत्ता",
    addProperty: "मालमत्ता जोडा",
    favorites: "आवडते",
    profile: "प्रोफाइल",
    logout: "लॉग आउट",
    login: "लॉगिन",
    signUp: "साइन अप",
    welcome: "स्वागत आहे",
    loginToManage: "तुमच्या मालमत्ता व्यवस्थापित करण्यासाठी लॉगिन करा",
    email: "ईमेल",
    password: "पासवर्ड",
    rememberMe: "मला लक्षात ठेवा",
    loginSuccessful: "लॉगिन यशस्वी झाले!",
    createAccount: "खाते तयार करा",
    browse: "पहा",
    explorePropertyHub: "PropertyHub एक्सप्लोर करा",
    totalProperties: "एकूण मालमत्ता",
    myFavorites: "माझ्या आवडी",
    recentProperties: "अलीकडील मालमत्ता",
    propertyPriceRange: "मालमत्तेची किंमत श्रेणी",
    availableProperties: "उपलब्ध मालमत्ता",
    minimum: "किमान",
    maximum: "कमाल",
    properties: "मालमत्ता",
    overview: "तुमच्या मालमत्ता व्यवस्थापनाचा आढावा",
  },
  gu: {
    language: "ભાષા",
    dashboard: "ડેશબોર્ડ",
    allProperties: "બધી મિલકતો",
    myProperties: "મારી મિલકતો",
    addProperty: "મિલકત ઉમેરો",
    favorites: "મનપસંદ",
    profile: "પ્રોફાઇલ",
    logout: "લૉગ આઉટ",
    login: "લૉગિન",
    signUp: "સાઇન અપ",
    welcome: "સ્વાગત છે",
    loginToManage: "તમારી મિલકતો સંચાલિત કરવા માટે લૉગિન કરો",
    email: "ઇમેઇલ",
    password: "પાસવર્ડ",
    rememberMe: "મને યાદ રાખો",
    loginSuccessful: "લૉગિન સફળ થયું!",
    createAccount: "ખાતું બનાવો",
    browse: "જુઓ",
    explorePropertyHub: "PropertyHub જુઓ",
    totalProperties: "કુલ મિલકતો",
    myFavorites: "મારી પસંદગી",
    recentProperties: "તાજેતરની મિલકતો",
    propertyPriceRange: "મિલકતની કિંમત શ્રેણી",
    availableProperties: "ઉપલબ્ધ મિલકતો",
    minimum: "લઘુત્તમ",
    maximum: "મહત્તમ",
    properties: "મિલકતો",
    overview: "તમારા મિલકત સંચાલનનો સારાંશ",
  },
};

interface LanguageState {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (language) => set({ language }),
    }),
    { name: "propertyhub-language" },
  ),
);

export const translate = (language: LanguageCode, key: TranslationKey) =>
  translations[language][key];

export type { TranslationKey };
