import type { IconName } from "@/components/ui/icon";
import type { FileRoutesByFullPath } from "@/routeTree.gen";

export interface SidebarItem {
  title: string;
  icon: IconName;
  url: keyof FileRoutesByFullPath;
}
