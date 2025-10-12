import { fileNameWithAnotherExtension } from "@/common/helpers";
import { sortBy } from "es-toolkit";
import { action, computed, observable } from "mobx";
import { EVENTS, type Eventbus, type Events } from "./event-bus";

const AUDIO_EXTENSIONS = new Set(["mp3", "wav", "ogg", "m4a", "flac", "webm"]);

type Deps = [Eventbus];

const getSrtFileName = (audioFile: File): string => {
  return fileNameWithAnotherExtension(audioFile.name, "srt");
};

export class AudioListStore {
  @observable.ref
  private accessor folderFiles: File[] = [];

  @observable.ref
  private accessor selectedAudio: File | null = null;

  private readonly eventbus: Eventbus;

  constructor(...[eventbus]: Deps) {
    this.eventbus = eventbus;
    eventbus.on(EVENTS.savedFilesRetrieved, this.onSavedFilesRetrieved);
  }

  @computed
  get folderName(): string {
    if (this.folderFiles.length === 0) {
      return "";
    }
    return this.folderFiles[0].webkitRelativePath.split("/")[0];
  }

  @computed
  private get filesByName(): Map<string, File> {
    return new Map(this.folderFiles.map((file) => [file.name, file]));
  }

  @computed
  get audioFilesWithSrt(): File[] {
    const files = this.folderFiles.filter((file) => {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
      if (!AUDIO_EXTENSIONS.has(ext)) {
        return false;
      }
      const srtFileName = getSrtFileName(file);
      return this.filesByName.has(srtFileName);
    });
    return sortBy(files, ["name"]);
  }

  @computed
  private get selectedSrt(): File | undefined {
    if (!this.selectedAudio) {
      return undefined;
    }
    return this.filesByName.get(getSrtFileName(this.selectedAudio));
  }

  @computed
  get selectedFileName(): string | undefined {
    return this.selectedAudio?.name;
  }

  @action
  setFolderFiles(files: Iterable<File>) {
    this.folderFiles = [...files];
    this.setSelectedAudio(
      this.audioFilesWithSrt.length === 1 ? this.audioFilesWithSrt[0] : null
    );
  }

  @action.bound
  private setSelectedAudio(file: File | null) {
    this.selectedAudio = file;
    this.eventbus.emit(
      EVENTS.audioSelected,
      this.selectedAudio,
      this.selectedSrt
    );
  }

  private onSavedFilesRetrieved: Events["savedFilesRetrieved"] = (
    audioFile,
    srtFile
  ) => {
    this.setFolderFiles([audioFile, srtFile]);
  };

  setSelectedAudioByName = (fileName: string) => {
    this.setSelectedAudio(this.filesByName.get(fileName) ?? null);
  };
}
