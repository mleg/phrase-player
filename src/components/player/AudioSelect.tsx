import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "@/stores/StoreContext";
import { FileMusic } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

export const AudioSelect = observer(function AudioSelect() {
  const { fileList } = useStore();
  const { t } = useTranslation();

  return (
    <Select
      value={fileList.selectedFileName}
      onValueChange={fileList.setSelectedAudioByName}
      disabled={fileList.audioFilesWithSrt.length === 0}
    >
      <SelectTrigger>
        <FileMusic className="text-current size-5" />
        <SelectValue placeholder={t("files.select_audio")} />
      </SelectTrigger>
      <SelectContent>
        {fileList.audioFilesWithSrt.map((file) => (
          <SelectItem key={file.name} value={file.name}>
            {file.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});
