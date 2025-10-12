import { enumFromUnion } from "@/common/helpers";

export type AfterPhraseAction = "STOP" | "REPEAT" | "CONTINUE";

export const afterPhraseEnum = enumFromUnion<AfterPhraseAction>(
  "STOP",
  "REPEAT",
  "CONTINUE"
);

export const afterPhraseTitles: Record<AfterPhraseAction, string> = {
  STOP: "Stop",
  REPEAT: "Repeat",
  CONTINUE: "Continue",
};

export const speedFormatValue = (value: number) => `${value.toFixed(2)} x`;
