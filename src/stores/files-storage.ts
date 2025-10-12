import { Dexie, type EntityTable } from "dexie";
import { EVENTS, type Eventbus, type Events } from "./event-bus";

interface StoredFile {
  id: number;
  name: string;
  file: File;
}

type DexieFilesDb = Dexie & {
  files: EntityTable<StoredFile, "id">;
};

const FILE_IDS = {
  audio: 1,
  srt: 2,
} as const;

type Deps = [Eventbus];

export class FilesStorage {
  private db: DexieFilesDb = new Dexie("file-db") as DexieFilesDb;
  private readonly eventbus: Eventbus;

  constructor(...[eventbus]: Deps) {
    this.eventbus = eventbus;
    this.db.version(1).stores({
      files: "id, name",
    });
    eventbus.on(EVENTS.appStart, this.retriveFiles);
    eventbus.on(EVENTS.audioSelected, this.saveFiles);
  }

  saveFiles: Events["audioSelected"] = async (
    audioFile: File | null,
    srtFile: File | undefined
  ) => {
    if (!audioFile || !srtFile) {
      return;
    }
    try {
      // Transaction: both files are saved or none
      await this.db.transaction("rw", this.db.files, async () => {
        // Put both files with fixed IDs
        await this.db.files.put({
          id: FILE_IDS.audio,
          name: audioFile.name,
          file: audioFile,
        });
        await this.db.files.put({
          id: FILE_IDS.srt,
          name: srtFile.name,
          file: srtFile,
        });
      });
    } catch (error) {
      console.error("Could not save files. Transaction rolled back.", error);
    }
  };

  retriveFiles = async () => {
    try {
      const audio = await this.db.files.get(FILE_IDS.audio);
      const srt = await this.db.files.get(FILE_IDS.srt);
      if (audio && srt) {
        this.eventbus.emit(EVENTS.savedFilesRetrieved, audio.file, srt.file);
      }
    } catch (error) {
      console.error("Could not retrieve files from DB.", error);
    }
  };
}
