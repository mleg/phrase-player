import githubIconUrl from "@/assets/github-mark.svg";
import { config } from "@/config";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface Props {
  className?: string;
}

export function GithubLink(props: Props) {
  return (
    <Button
      asChild
      size="icon-sm"
      variant="ghost"
      className={cn("h-8 shadow-none", props.className)}
    >
      <a href={config.githubLink} target="_blank" rel="noreferrer">
        <img src={githubIconUrl} alt="GitHub" />
      </a>
    </Button>
  );
}
