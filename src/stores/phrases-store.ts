import { ShowHideStore } from "@/lib/show-hide-store";
import { clamp } from "es-toolkit";
import { action, computed, observable } from "mobx";
import { EVENTS, type Eventbus, type Events } from "./event-bus";
import { parseSrt } from "./srt-parser";

export interface Phrase {
  id: string;
  start: number;
  end: number;
  text: string;
}

type Deps = [Eventbus];

export class PhrasesStore {
  @observable
  public accessor audioUrl: string | null = null;

  @observable.ref
  public accessor list: Phrase[] = [];

  @observable
  public accessor currentIndex: number = 0;

  private eventbus: Eventbus;

  private positionStorageKey: string | null = null;

  public select = new ShowHideStore();

  constructor(...[eventbus]: Deps) {
    eventbus.on(EVENTS.audioSelected, this.onAudioSelect);
    eventbus.on(EVENTS.savedFilesRetrieved, this.onSavedFilesRetrieved);
    this.eventbus = eventbus;
  }

  @computed
  get currentPhrase(): Phrase | null {
    return this.list.length > 0 ? this.list[this.currentIndex] : null;
  }

  @computed
  get playbackEnabled(): boolean {
    return Boolean(this.currentPhrase && this.audioUrl);
  }

  @computed
  get isPrevDisabled(): boolean {
    return this.currentIndex === 0 || !this.playbackEnabled;
  }

  @computed
  get isNextDisabled(): boolean {
    return this.currentIndex === this.list.length - 1 || !this.playbackEnabled;
  }

  @computed
  get currentStart(): number {
    return this.currentPhrase?.start ?? 0;
  }

  @computed
  get currentEnd(): number {
    return this.currentPhrase?.end ?? 0;
  }

  private onAudioSelect: Events["audioSelected"] = async (
    audioFile,
    srtFile
  ) => {
    this.updateAudio(audioFile);
    this.setCurrentIndex(0);
    const phrases: Phrase[] = srtFile ? await parseSrt(srtFile) : [];
    this.setPhrases(phrases);
  };

  private onSavedFilesRetrieved: Events["savedFilesRetrieved"] = async (
    audioFile,
    srtFile
  ) => {
    await this.onAudioSelect(audioFile, srtFile);
    this.restorePosition();
  };

  @action
  private updateAudio(audio: File | null) {
    const newUrl = audio ? URL.createObjectURL(audio) : null;
    if (this.audioUrl !== null && this.audioUrl !== newUrl) {
      URL.revokeObjectURL(this.audioUrl);
    }
    this.audioUrl = newUrl;
    this.positionStorageKey = audio
      ? `position--${audio.name}--${audio.size}`
      : null;
  }

  @action
  private setPhrases(phrases: Phrase[]) {
    this.list = phrases;
  }

  @action
  setCurrentIndex(index: number, shouldSave = false) {
    const clamped = Math.max(clamp(index, 0, this.list.length - 1), 0);
    if (this.currentIndex !== clamped) {
      this.currentIndex = clamped;
      this.eventbus.emit(EVENTS.phraseChanged, this.currentPhrase);
      if (shouldSave) {
        this.savePosition();
      }
    }
  }

  savePosition() {
    if (this.positionStorageKey) {
      localStorage.setItem(this.positionStorageKey, String(this.currentIndex));
    }
  }

  restorePosition() {
    if (!this.positionStorageKey) {
      return;
    }
    const positionStr = localStorage.getItem(this.positionStorageKey);
    if (positionStr) {
      const position = parseInt(positionStr);
      if (!isNaN(position)) {
        this.setCurrentIndex(position);
      }
    }
  }

  next = () => {
    this.setCurrentIndex(this.currentIndex + 1, true);
  };

  prev = () => {
    this.setCurrentIndex(this.currentIndex - 1, true);
  };

  first = () => {
    this.setCurrentIndex(0, true);
  };

  last = () => {
    this.setCurrentIndex(this.list.length - 1, true);
  };

  isInCurrentPhrase(time: number) {
    return time >= this.currentStart && time <= this.currentEnd;
  }

  selectPhrase(index: number) {
    this.setCurrentIndex(index, true);
    this.select.hide();
  }
}
