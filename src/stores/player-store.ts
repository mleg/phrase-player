import { delay } from "es-toolkit";
import { action, observable } from "mobx";
import { EVENTS, type Eventbus, type Events } from "./event-bus";
import type { PhrasesStore } from "./phrases-store";
import { afterPhraseEnum, type AfterPhraseAction } from "./player";
import { SpeedStore } from "./speed-store";

const { STOP, REPEAT, CONTINUE } = afterPhraseEnum;

const REPEAT_DELAY = 200;

const MODE_SAVE_KEY = "player-mode";

type Deps = [Eventbus, PhrasesStore];

const retrieveMode = (): AfterPhraseAction => {
  const saved = localStorage.getItem(MODE_SAVE_KEY) as AfterPhraseAction;
  if (saved && saved in afterPhraseEnum) {
    return saved;
  }
  return STOP;
};

export class PlayerStore {
  @observable
  public accessor isPlaying = false;

  @observable
  public accessor playFrom: number = 0;

  @observable
  // To force <adio/> to update
  public accessor playbackId: string = crypto.randomUUID();

  @observable
  public accessor mode: AfterPhraseAction = retrieveMode();

  private phrases: PhrasesStore;

  private currentTime: number = 0;

  speed = new SpeedStore();

  constructor(...[eventbus, phrases]: Deps) {
    this.phrases = phrases;
    eventbus.on(EVENTS.phraseChanged, this.onPhraseChange);
  }

  private onPhraseChange: Events["phraseChanged"] = (phrase) => {
    if (!phrase) {
      this.reset();
      return;
    }
    this.setPlayFrom(phrase.start);
  };

  @action
  private newPlaybackId() {
    this.playbackId = crypto.randomUUID();
  }

  @action
  private setPlayFrom(value: number) {
    this.playFrom = value;
  }

  @action
  private setIsPlaying(value: boolean) {
    this.isPlaying = value;
  }

  @action.bound
  setMode(value: string) {
    this.mode = value as AfterPhraseAction;
    localStorage.setItem(MODE_SAVE_KEY, value);
  }

  private reset() {
    this.setIsPlaying(false);
    this.setPlayFrom(0);
    this.newPlaybackId();
  }

  togglePlay = () => {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  };

  private play() {
    this.setIsPlaying(true);
  }

  private pause() {
    this.setIsPlaying(false);
    this.setPlayFrom(this.currentTime);
  }

  playPhraseAgain = () => {
    this.setPlayFrom(this.phrases.currentStart);
    this.setIsPlaying(true);
    this.newPlaybackId();
  };

  onTimeUpdate = (currentTime: number) => {
    this.currentTime = currentTime;
    if (currentTime >= this.phrases.currentEnd) {
      switch (this.mode) {
        case STOP:
          this.setIsPlaying(false);
          this.setPlayFrom(this.phrases.currentStart);
          break;
        case CONTINUE:
          this.phrases.next();
          break;
        case REPEAT:
          this.setIsPlaying(false);
          this.setPlayFrom(this.phrases.currentStart);
          delay(REPEAT_DELAY).then(() => {
            this.setIsPlaying(true);
            this.newPlaybackId();
          });
          break;
        default:
          break;
      }
    }
  };
}
