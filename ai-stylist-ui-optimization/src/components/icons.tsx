import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export const HomeIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 10.5 12 4l9 6.5" />
    <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
  </svg>
);

export const CompassIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
  </svg>
);

export const ShirtIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M8 3 4 6l2 4 2-1.5V21h8V8.5L18 10l2-4-4-3-2 1.5a3 3 0 0 1-4 0L8 3Z" />
  </svg>
);

export const SparkleIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3c.4 3.6 2.4 5.6 6 6-3.6.4-5.6 2.4-6 6-.4-3.6-2.4-5.6-6-6 3.6-.4 5.6-2.4 6-6Z" />
    <path d="M18.5 14c.2 1.6 1.1 2.5 2.5 2.7-1.4.2-2.3 1.1-2.5 2.7-.2-1.6-1.1-2.5-2.5-2.7 1.4-.2 2.3-1.1 2.5-2.7Z" />
  </svg>
);

export const UserIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5" />
  </svg>
);

export const HeartIcon = (p: IconProps & { filled?: boolean }) => {
  const { filled, ...rest } = p;
  return (
    <svg {...base(rest)} fill={filled ? "currentColor" : "none"}>
      <path d="M12 20s-7-4.3-7-9.3A4.2 4.2 0 0 1 12 7a4.2 4.2 0 0 1 7 3.7C19 15.7 12 20 12 20Z" />
    </svg>
  );
};

export const BookmarkIcon = (p: IconProps & { filled?: boolean }) => {
  const { filled, ...rest } = p;
  return (
    <svg {...base(rest)} fill={filled ? "currentColor" : "none"}>
      <path d="M6 4h12v16l-6-4-6 4V4Z" />
    </svg>
  );
};

export const CloseIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ArrowLeftIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M15 5l-7 7 7 7" />
  </svg>
);

export const ChevronRightIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 5l7 7-7 7" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12.5 10 17 19 7" />
  </svg>
);

export const StarIcon = (p: IconProps & { filled?: boolean }) => {
  const { filled, ...rest } = p;
  return (
    <svg {...base(rest)} fill={filled ? "currentColor" : "none"}>
      <path d="m12 3 2.5 5.4 5.9.7-4.4 4.1 1.2 5.8L12 16.9 6.8 19.9l1.2-5.8L3.6 9.1l5.9-.7L12 3Z" />
    </svg>
  );
};

export const PlusIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const SendIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12 20 5l-4 15-4-7-7-1Z" />
  </svg>
);

export const SunIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
  </svg>
);

export const RulerIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 8.5 16 21l5-5L8 3.5 3 8.5Z" />
    <path d="M7 7l2 2M10 4l2 2M13 7l2 2" />
  </svg>
);

export const RefreshIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8" />
    <path d="M20 4v4h-4" />
    <path d="M20 12a8 8 0 0 1-13.7 5.6L4 16" />
    <path d="M4 20v-4h4" />
  </svg>
);

export const TrashIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 7h14M10 7V5h4v2M6 7l1 13h10l1-13" />
  </svg>
);

export const SearchIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const ThumbsDownIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M8 4v11H5a1.5 1.5 0 0 1-1.5-1.7L5 4H8Z" />
    <path d="M8 15l4.5-9a2 2 0 0 1 2.4 2.6L13 12h5a2 2 0 0 1 2 2.3l-1.3 6A2 2 0 0 1 16.8 22H8" />
  </svg>
);

export const WandIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M15 6 6 15l3 3 9-9-3-3Z" />
    <path d="M18 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2Z" />
  </svg>
);

export const SparkIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 4c.3 3 1.7 4.7 4.5 5-2.8.3-4.2 2-4.5 5-.3-3-1.7-4.7-4.5-5 2.8-.3 4.2-2 4.5-5Z" />
  </svg>
);
