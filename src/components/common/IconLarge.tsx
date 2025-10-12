import { cn } from "@/lib/utils";
import { observer } from "mobx-react-lite";
import { cloneElement, type ReactElement } from "react";

interface Props {
  children: ReactElement;
  className?: string;
}

export const IconLarge: React.FC<Props> = observer(function IconLarge(props) {
  const icon: any = props.children;
  return cloneElement(icon, {
    className: cn(icon.props.className, "size-6 stroke-3", props.className),
  });
});
