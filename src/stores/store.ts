import { PlayerStore } from "@/stores/player-store";
import { createNanoEvents } from "nanoevents";
import { AudioListStore } from "./audio-list-store";
import type { Eventbus, Events } from "./event-bus";
import { FilesStorage } from "./files-storage";
import { PhrasesStore } from "./phrases-store";

export interface Store {
  fileList: AudioListStore;
  player: PlayerStore;
  phrases: PhrasesStore;
  filesStorage: FilesStorage;
  eventbus: Eventbus;
}

export function createStore(): Store {
  const eventbus: Eventbus = createNanoEvents<Events>();
  const phrases = new PhrasesStore(eventbus);

  return {
    fileList: new AudioListStore(eventbus),
    player: new PlayerStore(eventbus, phrases),
    filesStorage: new FilesStorage(eventbus),
    phrases,
    eventbus,
  };
}
