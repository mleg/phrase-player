export const en = {
  app: {
    title: "Phrase Audio Player",
  },
  files: {
    choose_folder: "Choose media folder",
    select_audio: "Select audio file",
    no_files: "No files found",
  },
  player: {
    current_phrase: "Current phrase",
    after_phrase: "After phrase:",
    modes: {
      stop: "Stop",
      repeat: "Repeat",
      continue: "Continue",
    },
    speed: "Playback speed",
    normal: "Normal",
  },
  controls: {
    copy: "Copy",
    first: "First phrase",
    previous: "Previous phrase",
    replay: "Replay phrase",
    play: "Play",
    pause: "Pause",
    next: "Next phrase",
    last: "Last phrase",
    phrase_list: "Phrase list",
    language: "Language",
    help: "Help",
  },
  navigation: {
    links: {
      help: "https://github.com/mleg/phrase-player#how-to-use",
    },
    phrase_counter: "{{current}} of {{total}}",
    hotkeys: {
      space: "Space",
    },
  },
};

export type Translation = typeof en;
