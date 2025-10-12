import SrtParser from "srt-parser-2";
import type { Phrase } from "./phrases-store";

const parser = new SrtParser();

const toSeconds = (time: string): number => {
  const parts = time.split(/[:,]/);
  return (
    parseInt(parts[0]) * 3600 +
    parseInt(parts[1]) * 60 +
    parseInt(parts[2]) +
    parseInt(parts[3]) / 1000
  );
};

export async function parseSrt(srtFile: File): Promise<Phrase[]> {
  const srtText = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => {
      reader.abort();
      reject(new Error("Problem reading the subtitle file."));
    };
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Unexpected file reader result type"));
      }
    };
    reader.readAsText(srtFile);
  });

  const srtData = parser.fromSrt(srtText);

  const phrases: Phrase[] = srtData.map((item) => ({
    id: item.id,
    start: toSeconds(item.startTime),
    end: toSeconds(item.endTime),
    text: item.text,
  }));

  return phrases;
}
