import type { Translation } from "./en";

export const ru: Translation = {
  app: {
    title: "Фразовый аудиоплеер",
  },
  files: {
    choose_folder: "Выбрать медиа-папку",
    select_audio: "Выберите аудио файл",
    no_files: "Файлы не найдены",
  },
  player: {
    after_phrase: "После фразы:",
    modes: {
      stop: "Остановить",
      repeat: "Повторить",
      continue: "Продолжить",
    },
    speed: "Скорость",
    normal: "Обычная",
  },
  controls: {
    copy: "Копировать",
  },
  navigation: {
    links: {
      help: "https://github.com/mleg/phrase-player/blob/main/README.ru.md#%D0%BA%D0%B0%D0%BA-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C",
    },
    phrase_counter: "{{current}} из {{total}}",
    hotkeys: {
      space: "Пробел",
    },
  },
};
