import { type EnumLike } from "@/common/helpers";
import type { Emitter } from "nanoevents";
import type { Phrase } from "./phrases-store";

export interface Events {
  appStart(): void;
  audioSelected(audio: File | null, srt: File | undefined): void;
  phraseChanged(currentPhrase: Phrase | null): void;
  savedFilesRetrieved(audio: File, srt: File): void;
}

export const EVENTS: EnumLike<keyof Events> = {
  appStart: "appStart",
  audioSelected: "audioSelected",
  phraseChanged: "phraseChanged",
  savedFilesRetrieved: "savedFilesRetrieved",
};

export type Eventbus = Emitter<Events>;
