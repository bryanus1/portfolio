import type { Icon, IconName } from '@/types/icon';
import { Code, Server, Database, Zap, Layout, GitBranch, Terminal, Layers, Cpu, Globe, Workflow } from 'lucide-react';

function getIcon(name: IconName) {
  switch (name) {
    case 'code':
      return Code;
    case 'server':
      return Server;
    case 'database':
      return Database;
    case 'zap':
      return Zap;
    case 'layout':
      return Layout;
    case 'git-branch':
      return GitBranch;
    case 'terminal':
      return Terminal;
    case 'layers':
      return Layers;
    case 'cpu':
      return Cpu;
    case 'globe':
      return Globe;
    case 'workflow':
      return Workflow;
    default:
      throw new Error('Unknown skill');
  }
}

export function IconSkill({ name, color, size }: Readonly<Icon>) {
  const IconComponent = getIcon(name);

  if (!IconComponent) throw new Error("Unknown skill");
  return <IconComponent size={size ?? 24} className={`w-8 h-8 ${color}`} />;
}
