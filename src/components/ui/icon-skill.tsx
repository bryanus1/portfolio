import type { Icon, IconName } from '@/types/icon';
import { Code, Server, Database, Zap } from 'lucide-react';

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
    default:
      throw new Error('Unknown skill');
  }
}

export function IconSkill({ name, color, size }: Readonly<Icon>) {
  const IconComponent = getIcon(name);

  if (!IconComponent) throw new Error("Unknown skill");
  return <IconComponent size={size ?? 24} className={`w-8 h-8 ${color}`} />;
}
