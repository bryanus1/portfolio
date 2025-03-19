import type { Icon } from '@/types/icon';
import { Code, Server, Database, Zap } from 'lucide-react';

export function IconSkill({name, color, size}: Readonly<Icon>) {
  if (name === "code") {
    return <Code size={size ?? 24} className={`w-8 h-8 ${color}`} />;
  }

  if (name === "server") {
    return <Server size={size ?? 24} className={`w-8 h-8 ${color}`} />;
  }

  if (name === "database") {
    return <Database size={size ?? 24} className={`w-8 h-8 ${color}`} />;
  }

  if (name === "zap") {
    return <Zap size={size ?? 24} className={`w-8 h-8 ${color}`} />;
  }

  throw new Error("Unknown skill");

}
