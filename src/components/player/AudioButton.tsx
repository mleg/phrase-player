import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";
import { observer } from "mobx-react-lite";
import { type ReactElement, type ReactNode } from "react";
import type { Merge } from "type-fest";
import { IconLarge } from "../common/IconLarge";

type Props = Merge<
  React.ComponentProps<typeof Button>,
  {
    children: ReactElement;
    hotkey?: ReactNode;
  }
>;

export const ControlButton: React.FC<Props> = observer(function AudioButton({
  hotkey,
  className,
  children,
  ...props
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 sm:order-none grow",
        className
      )}
    >
      <Button size="lg" className="px-4 w-full" {...props}>
        <IconLarge>{children}</IconLarge>
      </Button>
      {hotkey && <Kbd className="hidden sm:flex text-sm">{hotkey}</Kbd>}
    </div>
  );
});
