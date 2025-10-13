import githubIconUrl from "@/assets/github-mark.svg";
import { config } from "@/config";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface Props {
  className?: string;
}

export function GithubLink(props: Props) {
  return (
    <Button asChild size="icon-sm" variant="ghost">
      <a
        href={config.githubLink}
        target="_blank"
        rel="noreferrer"
        className={cn("shadow-none", props.className)}
      >
        <img src={githubIconUrl} alt="GitHub" className="size-6.5" />
      </a>
    </Button>
  );
}
