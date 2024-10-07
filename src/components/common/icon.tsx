import { cn } from '@/utils';

type IconProps = {
    width?: number;
    height?: number;
    className?: string;
};

const HomeIcon = ({ width = 24, height = 24, className }: IconProps) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width={width}
            height={height}
            className={cn('transition-[fill]', className)}
            style={{ fill: 'currentcolor' }}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21 10.15v7.817C21 20.194 19.21 22 17 22H7c-2.21 0-4-1.806-4-4.033V10.15c0-1.21.54-2.357 1.47-3.123l5-4.118a3.975 3.975 0 0 1 5.06 0l5 4.118A4.046 4.046 0 0 1 21 10.15Zm-5.75 7.1v2.25a1 1 0 0 1-1 1h-4.5a1 1 0 0 1-1-1v-2.25a3.25 3.25 0 0 1 6.5 0Z"
                fill="currentColor"
            />
        </svg>
    );
};

const MarketplaceIcon = ({ width = 24, height = 24, className }: IconProps) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width={width}
            height={height}
            className={cn('transition-[fill]', className)}
            style={{ fill: 'currentcolor' }}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 1.25A3.75 3.75 0 0 0 8.25 5v1a4 4 0 0 0-3.862 3.263l-1.5 8A4 4 0 0 0 6.82 22h10.36a4 4 0 0 0 3.932-4.737l-1.5-8A4 4 0 0 0 15.75 6V5A3.75 3.75 0 0 0 12 1.25ZM14.25 6V5a2.25 2.25 0 0 0-4.5 0v1h4.5Z"
                fill="currentColor"
            />
        </svg>
    );
};

const DailyBountyBoardIcon = ({ width = 24, height = 24, className }: IconProps) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width={width}
            height={height}
            className={cn('transition-[fill]', className)}
            style={{ fill: 'currentcolor' }}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 16.5V5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v11.5h-8.7a.8.8 0 0 0-.8.8c0 1.767-1.457 3.2-3.225 3.2C4.48 20.5 3 19.045 3 17.25v-.75ZM7 6.25a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5H7ZM6.25 12a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5H7a.75.75 0 0 1-.75-.75Zm16.627 6.99A4.002 4.002 0 0 1 19 22H7a4.002 4.002 0 0 0 3.877-3.01c.136-.535.57-.99 1.123-.99h10c.552 0 1.013.455.877.99Z"
                fill="currentColor"
            />
        </svg>
    );
};

const GamesIcon = ({ width = 24, height = 24, className }: IconProps) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width={width}
            height={height}
            className={cn('transition-[fill]', className)}
            style={{ fill: 'currentcolor' }}
        >
            <path
                d="M18.083 11.5a.833.833 0 1 1-1.666 0 .833.833 0 0 1 1.666 0Z"
                fill="currentColor"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.411 8.297A4 4 0 0 1 6.35 5h1.237a1 1 0 0 1 .707.293l.914.914a1 1 0 0 0 .707.293h4.172a1 1 0 0 0 .707-.293l.914-.914A1 1 0 0 1 16.414 5h1.237a4 4 0 0 1 3.938 3.297l1.071 6A4 4 0 0 1 18.722 19h-.492a3.62 3.62 0 0 1-3.48-2.625l-.043-.15a1 1 0 0 0-.961-.725h-3.492a1 1 0 0 0-.961.725l-.043.15A3.62 3.62 0 0 1 5.77 19h-.492a4 4 0 0 1-3.938-4.703l1.071-6ZM6.75 9a.75.75 0 0 0-.75.75v1H5a.75.75 0 0 0 0 1.5h1v1a.75.75 0 0 0 1.5 0v-1h1a.75.75 0 0 0 0-1.5h-1v-1A.75.75 0 0 0 6.75 9Zm13 2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                fill="currentColor"
            />
        </svg>
    );
};

const GovernanceIcon = ({ width = 24, height = 24, className }: IconProps) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width={width}
            height={height}
            className={cn('transition-[fill]', className)}
            style={{ fill: 'currentcolor' }}
        >
            <path
                d="M3.033 8.75h17.934c1.02 0 1.42-1.351.572-1.93l-8.395-5.716a2.026 2.026 0 0 0-2.288 0L2.461 6.82c-.849.578-.448 1.929.572 1.929ZM5.5 10.25h3v5h-3v-5ZM18.5 10.25h-3v5h3v-5ZM10.5 10.25h3v5h-3v-5ZM20.276 17.303a1 1 0 0 0-.894-.553H4.618a1 1 0 0 0-.894.553l-1 2a1 1 0 0 0 .894 1.447h16.764a1 1 0 0 0 .894-1.447l-1-2Z"
                fill="currentColor"
            />
        </svg>
    );
};

const LunalogIcon = ({ width = 24, height = 24, className }: IconProps) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width={width}
            height={height}
            className={cn('transition-[fill]', className)}
            style={{ fill: 'currentcolor' }}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17 2H7a3 3 0 0 0-3 3v7.646A4.484 4.484 0 0 1 7 11.5h13V5a3 3 0 0 0-3-3ZM8 4.25a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5H8ZM7.25 8.5A.75.75 0 0 1 8 7.75h4a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75ZM7 13h13v3a3 3 0 0 1-2.5 2.959V16a1.5 1.5 0 0 0-1.5-1.5h-4a1.5 1.5 0 0 0-1.5 1.5v3H7a3 3 0 1 1 0-6Zm5 3h4v6l-2-2-2 2v-6Z"
                fill="currentColor"
            />
        </svg>
    );
};

const StakingIcon = ({ width = 24, height = 24, className }: IconProps) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width={width}
            height={height}
            className={cn('transition-[fill]', className)}
            style={{ fill: 'currentcolor' }}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.398 5.25h7.204c1.163-1.57-.404-3.768-2.349-3.14l-.928.3a1.06 1.06 0 0 1-.65 0l-.928-.3c-1.945-.628-3.511 1.57-2.349 3.14Zm7.096 1.5H8.506a5.996 5.996 0 0 0-2.822 3.46l-1.25 4C3.227 18.074 6.114 22 10.161 22h.966a3.484 3.484 0 0 1-.627-2c0-.744.232-1.433.627-2A3.5 3.5 0 0 1 14 12.5h5.031l-.715-2.29a5.997 5.997 0 0 0-2.822-3.46ZM14 14a2 2 0 1 0 0 4 2 2 0 1 0 0 4h6a2 2 0 0 0 0-4 2 2 0 0 0 0-4h-6Z"
                fill="currentColor"
            />
        </svg>
    );
};

const LunacianExpressIcon = ({ width = 24, height = 24, className }: IconProps) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width={width}
            height={height}
            className={cn('transition-[fill]', className)}
            style={{ fill: 'currentcolor' }}
        >
            <div>
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 2.75A.75.75 0 0 1 2.75 2h9.5a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75H12v5h4.5V8l-.394-.789A1 1 0 0 1 16 6.764V5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1.264a1 1 0 0 1-.106.447L18.5 8v1.041A3 3 0 0 1 21 12v1a2.996 2.996 0 0 1-1.25 2.437l1.323 2.315a.5.5 0 0 1-.435.748h-4.225a3.25 3.25 0 0 0-6.288-1.646A3.251 3.251 0 0 0 3.759 18H3a1 1 0 0 1-1-1V2.75ZM3.5 5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V5Z"
                    fill="currentColor"
                />
                <path
                    d="M2.5 21a.5.5 0 0 0 0 1h19a.5.5 0 0 0 0-1h-19ZM9 17.75a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM13.25 19.75a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                    fill="currentColor"
                />
            </div>
        </svg>
    );
};
const AxieGemStoreIcon = ({ width = 24, height = 24, className }: IconProps) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width={width}
            height={height}
            className={cn('transition-[fill]', className)}
            style={{ fill: 'currentcolor' }}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.231 2h9.538c1.817 0 3.451 1.245 4.126 3.143l.758 2.132c.23.645.388 1.336.22 2C21.479 10.848 20.193 12 18.668 12c-1.841 0-3.334-1.679-3.334-3.75 0 2.071-1.492 3.75-3.333 3.75-1.841 0-3.333-1.679-3.333-3.75 0 2.071-1.493 3.75-3.334 3.75-1.525 0-2.81-1.152-3.207-2.725-.167-.664-.009-1.355.22-2l.759-2.132C3.78 3.245 5.414 2 7.23 2ZM4 13.3V18a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-4.7c-.419.13-.865.2-1.333.2-1.337 0-2.49-.563-3.334-1.444-.843.881-1.996 1.444-3.333 1.444-1.337 0-2.49-.563-3.333-1.444-.844.881-1.996 1.444-3.334 1.444A4.51 4.51 0 0 1 4 13.3Zm11.653 3.331a.75.75 0 0 1-.285 1.022c-1.215.685-2.262 1.095-3.365 1.097-1.105.002-2.154-.404-3.374-1.098a.75.75 0 1 1 .742-1.304c1.136.646 1.911.903 2.629.902.719-.002 1.494-.262 2.632-.904a.75.75 0 0 1 1.021.285Z"
                fill="currentColor"
            />
        </svg>
    );
};

const BlogIcon = ({ width = 24, height = 24, className }: IconProps) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width={width}
            height={height}
            className={cn('transition-[fill]', className)}
            style={{ fill: 'currentcolor' }}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 3h2a9 9 0 1 1 0 18H6a4 4 0 0 1-4-4v-5a9 9 0 0 1 9-9ZM8.547 13.487a.75.75 0 0 0-1.094 1.026c1.35 1.441 2.912 2.237 4.547 2.237 1.635 0 3.196-.796 4.547-2.237a.75.75 0 0 0-1.094-1.026c-1.15 1.226-2.338 1.763-3.453 1.763-1.115 0-2.304-.537-3.453-1.763Z"
                fill="currentColor"
            />
        </svg>
    );
};
const EllipsisIcon = ({ width = 24, height = 24, className }: IconProps) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width={width}
            height={height}
            className={cn('transition-[fill]', className)}
            style={{ fill: 'currentcolor' }}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm9 2a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
                fill="currentColor"
            />
        </svg>
    );
};

const XIcon = ({ width = 24, height = 24, className }: IconProps) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width={width}
            height={height}
            className={cn('transition-[fill]', className)}
            style={{ fill: 'currentcolor' }}
        >
            <path
                d="M2.049 2.65 9.77 12.975 2 21.369h1.749l6.803-7.35 5.497 7.35H22l-8.156-10.905 7.232-7.814h-1.748l-6.266 6.769L8 2.649H2.05ZM4.62 3.938h2.734l12.073 16.143h-2.734L4.62 3.938Z"
                fill="currentColor"
            />
        </svg>
    );
};

const DiscordIcon = ({ width = 24, height = 24, className }: IconProps) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width={width}
            height={height}
            className={cn('transition-[fill]', className)}
            style={{ fill: 'currentcolor' }}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.942 5.27A16.54 16.54 0 0 0 14.816 4c-.195.349-.372.707-.529 1.074a15.366 15.366 0 0 0-4.579 0A11.386 11.386 0 0 0 9.179 4c-1.425.243-2.814.67-4.129 1.273-2.611 3.863-3.319 7.63-2.965 11.345 1.53 1.13 3.24 1.989 5.06 2.54.41-.551.773-1.136 1.084-1.748a10.76 10.76 0 0 1-1.706-.814c.143-.104.283-.211.418-.315a11.887 11.887 0 0 0 10.118 0c.137.112.277.219.418.315-.545.321-1.117.594-1.71.816.312.612.674 1.196 1.084 1.746a16.558 16.558 0 0 0 5.064-2.539c.415-4.307-.71-8.04-2.973-11.35ZM8.678 14.333c-.987 0-1.802-.896-1.802-1.997 0-1.1.787-2.004 1.798-2.004 1.012 0 1.82.903 1.803 2.004-.017 1.101-.794 1.997-1.8 1.997Zm6.644 0c-.988 0-1.8-.896-1.8-1.997 0-1.1.787-2.004 1.8-2.004s1.816.903 1.798 2.004c-.017 1.101-.793 1.997-1.798 1.997Z"
                fill="currentColor"
            />
        </svg>
    );
};

const YoutubeIcon = ({ width = 24, height = 24, className }: IconProps) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width={width}
            height={height}
            className={cn('transition-[fill]', className)}
            style={{ fill: 'currentcolor' }}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.14 3a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h13.72a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4H5.14Zm10.071 8.106-4.764-2.382A1 1 0 0 0 9 9.618v4.764a1 1 0 0 0 1.447.894l4.764-2.382a1 1 0 0 0 0-1.788Z"
                fill="currentColor"
            />
        </svg>
    );
};

const BottomMenuMoreIcon = ({ width = 24, height = 24, className }: IconProps) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width={width}
            height={height}
            className={cn('transition-[fill]', className)}
            style={{ fill: 'currentcolor' }}
        >
            <path
                d="M7 7a1 1 0 0 0 0 2V7Zm10 2a1 1 0 1 0 0-2v2ZM7 11a1 1 0 1 0 0 2v-2Zm10 2a1 1 0 1 0 0-2v2ZM7 15a1 1 0 1 0 0 2v-2Zm10 2a1 1 0 1 0 0-2v2ZM7 9h10V7H7v2Zm0 4h10v-2H7v2Zm0 4h10v-2H7v2Z"
                fill="currentColor"
            />
        </svg>
    );
};

export {
    BlogIcon,
    AxieGemStoreIcon,
    DailyBountyBoardIcon,
    DiscordIcon,
    GamesIcon,
    GovernanceIcon,
    HomeIcon,
    LunacianExpressIcon,
    LunalogIcon,
    MarketplaceIcon,
    StakingIcon,
    XIcon,
    YoutubeIcon,
    EllipsisIcon,
    BottomMenuMoreIcon,
};
