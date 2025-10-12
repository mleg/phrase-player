import { ShowHideStore } from "@/lib/show-hide-store";
import { clamp } from "es-toolkit";
import { action, computed, observable } from "mobx";

const STORAGE_KEY = "player-speed";

export interface Preset {
  value: number;
  isChosen: boolean;
  onSelect(): void;
}

export class SpeedStore {
  @observable
  public accessor value: number;

  modal = new ShowHideStore();

  readonly MIN = 0.25;
  readonly MAX = 2.0;
  readonly STEP = 0.05;
  private readonly PRESETS = [0.8, 0.9, 1.0, 1.1];

  constructor() {
    this.value = this.retrieveSaved() ?? 1.0;
  }

  @computed
  get presets(): Preset[] {
    return this.PRESETS.map((value) => ({
      value,
      isChosen: value === this.value,
      onSelect: () => {
        this.setValue(value);
        this.modal.hide();
      },
    }));
  }

  @action.bound
  setValue(value: number) {
    this.value = clamp(value, this.MIN, this.MAX);
    localStorage.setItem(STORAGE_KEY, String(this.value));
  }

  private retrieveSaved(): number | undefined {
    const storedValue = localStorage.getItem(STORAGE_KEY);
    if (!storedValue) {
      return undefined;
    }
    const parsed = parseFloat(storedValue);
    if (isNaN(parsed)) {
      return undefined;
    }
    return parsed;
  }

  decrease = () => {
    this.setValue(this.value - this.STEP);
  };

  increase = () => {
    this.setValue(this.value + this.STEP);
  };
}
