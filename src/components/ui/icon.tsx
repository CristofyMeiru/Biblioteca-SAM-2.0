import * as lucide from "lucide-react";
import React from "react";

export const icons = {
  home: lucide.Home,
  user: lucide.User,
  idCard: lucide.IdCard,
  badgeCheck: lucide.BadgeCheck,
  scale: lucide.Scale,
  syringe: lucide.Syringe,
  creditCard: lucide.CreditCard,
  car: lucide.Car,
  graduationCap: lucide.GraduationCap,
  heartPulse: lucide.HeartPulse,
  menu: lucide.Menu,
  calendar: lucide.Calendar,
  userCog: lucide.UserCog,
  doorOpen: lucide.DoorOpen,
  settings: lucide.Settings,
  layoutDashboard: lucide.LayoutDashboard,
  building2: lucide.Building2,
  clock: lucide.Clock,
  x: lucide.X,
  listCheck: lucide.ListCheck,
  plus: lucide.Plus,
  pencil: lucide.Pencil,
  check: lucide.Check,
  badgeQuestionMark: lucide.BadgeQuestionMark,
  fileQuestion: lucide.FileQuestion,
  phone: lucide.Phone,
  map: lucide.Map,
  mapPin: lucide.MapPin,
  trash: lucide.Trash,
  eye: lucide.Eye,
  play: lucide.Play,
  pause: lucide.Pause,
  rotateCcw: lucide.RotateCcw,
  chevronLeft: lucide.ChevronLeft,
  chevronRight: lucide.ChevronRight,
  chevronUp: lucide.ChevronUp,
  chevronDown: lucide.ChevronDown,
  alertCircle: lucide.AlertCircle,
  star: lucide.Star,
  layers: lucide.Layers,
  mail: lucide.Mail,
  ban: lucide.Ban,
  list: lucide.List,
  search: lucide.Search,
  handshake: lucide.Handshake,
  activity: lucide.Activity,
  xCircle: lucide.XCircle,
  checkCircle: lucide.CheckCircle,
  loader: lucide.Loader,
  loader2: lucide.Loader2,
  book: lucide.Book,
  users: lucide.Users,
  undo2: lucide.Undo2,
  fileText: lucide.FileText,
  qrCode: lucide.QrCode,
  download: lucide.Download
} as const;

export type IconName = keyof typeof icons;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
  color?: string;
}

export default function Icon({ name, size = 18, ...props }: IconProps) {
  const LucideIcon = icons[name] ?? lucide.FileQuestion;

  return <LucideIcon size={size} {...props} />;
}
