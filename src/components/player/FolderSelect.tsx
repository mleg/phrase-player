import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/stores/StoreContext";
import { Folder } from "lucide-react";
import { observer } from "mobx-react-lite";
import React, { type ChangeEvent } from "react";

export const FolderSelect: React.FC = observer(function FolderSelect() {
  const { fileList } = useStore();

  const onFolderSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }

    fileList.setFolderFiles(files);
  };

  return (
    <div className="flex gap-2">
      <Input
        id="folder-input"
        type="file"
        webkitdirectory="true"
        multiple
        onChange={onFolderSelect}
        className="hidden"
      />
      <Button asChild variant="secondary">
        <Label htmlFor="folder-input" className="flex items-center gap-2">
          <Folder className="size-6" />
          {fileList.folderName ? null : <span>Choose media folder</span>}
        </Label>
      </Button>
      <span className="inline-flex items-center">{fileList.folderName}</span>
    </div>
  );
});
