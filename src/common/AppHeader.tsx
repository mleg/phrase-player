import { GithubLink } from "@/components/common/GithubLink";
import { observer } from "mobx-react-lite";
import type React from "react";

export const AppHeader: React.FC = observer(function AppHeader() {
  return (
    <div className="flex items-center justify-center">
      <h1 className="text-xl font-bold text-center">
        Phrase-by-Phrase Audio Player
      </h1>
      <GithubLink className="ml-auto" />
    </div>
  );
});
