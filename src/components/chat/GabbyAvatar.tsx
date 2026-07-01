import { cn } from '@/lib/utils';

interface GabbyAvatarProps {
    className?: string;
}

export function GabbyAvatar({ className }: GabbyAvatarProps) {
    return (
        <div className={cn("relative flex items-center justify-center rounded-full overflow-hidden bg-white shadow-sm", className)}>
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                {/* Background / Head */}
                <rect width="100" height="100" fill="#122d54" />

                {/* Face plate (lighter blue/screen) */}
                <rect x="15" y="25" width="70" height="55" rx="12" fill="#1e4b8a" />

                {/* Glow effect on screen */}
                <circle cx="50" cy="52" r="25" fill="#4dabf7" fillOpacity="0.1" />

                {/* Eyes (Glowing) */}
                <circle cx="35" cy="48" r="8" fill="white" />
                <circle cx="35" cy="48" r="3" fill="#122d54" />
                <circle cx="65" cy="48" r="8" fill="white" />
                <circle cx="65" cy="48" r="3" fill="#122d54" />

                {/* Cheeks (Orange accents) */}
                <circle cx="22" cy="62" r="3" fill="#f97316" run-opacity="0.8" />
                <circle cx="78" cy="62" r="3" fill="#f97316" run-opacity="0.8" />

                {/* Mouth (Friendly smile) */}
                <path d="M40 65 Q50 72 60 65" stroke="white" strokeWidth="3" strokeLinecap="round" />

                {/* Antenna */}
                <line x1="50" y1="0" x2="50" y2="25" stroke="#122d54" strokeWidth="4" />
                <circle cx="50" cy="8" r="6" fill="#f97316" />

                {/* Gloss/Reflection */}
                <path d="M20 20 Q50 5 80 20" stroke="white" strokeWidth="2" strokeOpacity="0.2" fill="none" />
            </svg>
        </div>
    );
}
