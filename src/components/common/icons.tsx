import {
  Globe,
  LayoutGrid,
  LucideIcon,
  LucideProps,
  MenuIcon,
  Search,
  Send,
  SquareMenu,
  Store,
} from "lucide-react";
import { IoIosCreate } from "react-icons/io";
import { Calendar } from "../ui/calendar";
import { IconType } from "react-icons";
import { FaYoutube } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { FaToolbox } from "react-icons/fa6";
export type Icon = LucideIcon | IconType;

export const Icons = {
  arrowRight: ({ ...props }: LucideProps) => {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" {...props}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10ZM10.47 8.47l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72H16a.75.75 0 0 0 0-1.5H9.81l1.72-1.72a.75.75 0 0 0-1.06-1.06Z"
          fill="currentColor"
        ></path>
      </svg>
    );
  },
  house: TiHome,
  imagePlus: IoIosCreate,
  circuitBoard: FaToolbox,
  menuIcon: MenuIcon,
  store: Store,
  globe: Globe,
  send: Send,
  squareMenu: SquareMenu,
  layoutGrid: LayoutGrid,
  search: Search,
  calendar: Calendar,
  ideaScale: ({ ...props }: LucideProps) => (
    <svg
      width="22"
      height="22"
      className="object-cover"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.965 13.8332C23.9882 13.5286 24 13.2207 24 12.9102C24 6.28274 18.6274 0.910156 12 0.910156C5.37258 0.910156 0 6.28274 0 12.9102C0 13.2207 0.0117996 13.5286 0.034975 13.8332H1.96154V12.9102H1.9617C1.99275 7.36075 6.50098 2.87169 12.0577 2.87169C17.3028 2.87169 21.6137 6.87135 22.1068 11.9871H20.25C19.7651 7.89304 16.2822 4.71785 12.0577 4.71785C7.52059 4.71785 3.83891 8.38036 3.80789 12.9102H3.80769V13.8332H4.61538H5.65385H7.5H8.53846H9.34615V12.9102C9.34615 11.3808 10.586 10.1409 12.1154 10.1409C13.6448 10.1409 14.8846 11.3808 14.8846 12.9102V13.8332H16.6154V12.9102H16.615C16.5841 10.4196 14.5556 8.41016 12.0577 8.41016C9.87724 8.41016 8.05442 9.94132 7.60579 11.9871H5.72848C6.20049 8.9159 8.85444 6.564 12.0577 6.564C15.5752 6.564 18.4303 9.39998 18.4613 12.9102H18.4615V13.8332H19.1538H20.3077H22.1538H23.0769H23.965ZM0.321105 15.6794C1.57125 20.9718 6.3257 24.9102 12 24.9102C17.6743 24.9102 22.4287 20.9718 23.6789 15.6794H0.321105Z"
        fill="currentColor"
      />
    </svg>
  ),
  youtube: FaYoutube,
};
