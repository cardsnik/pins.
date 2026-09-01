export type Locale = "ru" | "en";

export interface Dictionary {
  nav: {
    feed: string;
    favorites: string;
    logout: string;
  };
  search: {
    placeholder: string;
    button: string;
  };
  grid: {
    empty: string;
    emptyFavorites: string;
  };
  pin: {
    back: string;
    noDescription: string;
    author: string;
    loadFailed: string;
  };
  favorite: {
    add: string;
    remove: string;
  };
  auth: {
    emailPlaceholder: string;
    passwordPlaceholder: string;
    namePlaceholder: string;
    forgotPassword: string;
    submitLogin: string;
    submitSignUp: string;
    noAccount: string;
    signUpLink: string;
    haveAccount: string;
    loginLink: string;
  };
  toast: {
    welcome: string;
    accountCreated: string;
    authError: string;
    addedToFavorites: string;
    removedFromFavorites: string;
    goodbye: string;
  };
  theme: {
    toDark: string;
    toLight: string;
  };
}

export const translations: Record<Locale, Dictionary> = {
  ru: {
    nav: {
      feed: "Лента",
      favorites: "Избранное",
      logout: "Выйти",
    },
    search: {
      placeholder: "Поиск...",
      button: "Найти",
    },
    grid: {
      empty: "Ничего не найдено",
      emptyFavorites: "Пока нет избранных пинов",
    },
    pin: {
      back: "← Назад к ленте",
      noDescription: "Без описания",
      author: "Автор",
      loadFailed: "Не удалось загрузить пин",
    },
    favorite: {
      add: "Добавить в избранное",
      remove: "Убрать из избранного",
    },
    auth: {
      emailPlaceholder: "Email",
      passwordPlaceholder: "Пароль",
      namePlaceholder: "Имя",
      forgotPassword: "Забыли пароль?",
      submitLogin: "Войти",
      submitSignUp: "Зарегистрироваться",
      noAccount: "Нет аккаунта?",
      signUpLink: "Зарегистрироваться",
      haveAccount: "Уже есть аккаунт?",
      loginLink: "Войти",
    },
    toast: {
      welcome: "Добро пожаловать! 🎉",
      accountCreated: "Аккаунт создан! 🎉",
      authError: "Неверный email или пароль",
      addedToFavorites: "Добавлено в избранное! ❤️",
      removedFromFavorites: "Убрано из избранного 💔",
      goodbye: "До встречи! 👋",
    },
    theme: {
      toDark: "Тёмная тема",
      toLight: "Светлая тема",
    },
  },
  en: {
    nav: {
      feed: "Feed",
      favorites: "Favorites",
      logout: "Log out",
    },
    search: {
      placeholder: "Search...",
      button: "Search",
    },
    grid: {
      empty: "Nothing found",
      emptyFavorites: "No favorite pins yet",
    },
    pin: {
      back: "← Back to feed",
      noDescription: "No description",
      author: "Author",
      loadFailed: "Failed to load pin",
    },
    favorite: {
      add: "Add to favorites",
      remove: "Remove from favorites",
    },
    auth: {
      emailPlaceholder: "Email",
      passwordPlaceholder: "Password",
      namePlaceholder: "Name",
      forgotPassword: "Forgot password?",
      submitLogin: "Sign in",
      submitSignUp: "Sign up",
      noAccount: "Don't have an account?",
      signUpLink: "Sign up",
      haveAccount: "Already have an account?",
      loginLink: "Sign in",
    },
    toast: {
      welcome: "Welcome! 🎉",
      accountCreated: "Account created! 🎉",
      authError: "Invalid email or password",
      addedToFavorites: "Added to favorites! ❤️",
      removedFromFavorites: "Removed from favorites 💔",
      goodbye: "See you soon! 👋",
    },
    theme: {
      toDark: "Dark theme",
      toLight: "Light theme",
    },
  },
};
