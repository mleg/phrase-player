import "react";

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // Add webkitdirectory as optional boolean attribute
    webkitdirectory?: string;
  }
}
