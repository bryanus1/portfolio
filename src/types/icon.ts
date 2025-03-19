export type IconName = "code" | "server" | "database" | "zap" | "layout" | "git-branch" | "terminal" | "layers" | "cpu" | "globe" | "workflow";

export type Icon = {
  size?: number;
  color: string;
  name: IconName;
}
