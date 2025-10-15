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
      stop: "Стоп",
      repeat: "Повтор",
      continue: "Продолжить",
    },
    speed: "Скорость",
    normal: "Обычная",
  },
  controls: {
    play: "Играть",
    pause: "Пауза",
    copy: "Копировать",
    first: "В начало",
    previous: "Назад",
    next: "Вперед",
    last: "В конец",
    repeat_phrase: "Повторить фразу",
  },
  navigation: {
    phrase_counter: "{{current}} из {{total}}",
    hotkeys: {
      space: "Пробел",
    },
  },
};
