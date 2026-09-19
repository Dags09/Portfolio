import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * A cluster of angular gold "shard" polygons, positioned in one corner.
 * Mirrors the badge's own rim-fragment look, faded into the dark background.
 */
function ShardCluster({ id, className }: { id: string; className?: string }) {
    return (
        <svg
            viewBox="0 0 260 260"
            className={className}
            preserveAspectRatio="xMidYMid meet"
        >
            <g
                stroke="#d4af37"
                strokeWidth="0.5"
                strokeOpacity="0.25"
                fill="none"
            >
                <polygon className={`${id}-shard-0`} points="0,0 140,0 60,80" />
                <polygon className={`${id}-shard-1`} points="0,0 60,80 0,150" />
                <polygon
                    className={`${id}-shard-2`}
                    points="140,0 230,20 60,80"
                />
                <polygon
                    className={`${id}-shard-3`}
                    points="60,80 230,20 150,110"
                />
                <polygon
                    className={`${id}-shard-4`}
                    points="0,150 60,80 150,110"
                />
                <polygon
                    className={`${id}-shard-5`}
                    points="150,110 230,20 260,90"
                />
                <polygon
                    className={`${id}-shard-6`}
                    points="0,150 150,110 90,210"
                />
                <polygon
                    className={`${id}-shard-7`}
                    points="150,110 260,90 200,180"
                />
            </g>
            <g>
                <polygon
                    className={`${id}-shard-0`}
                    points="0,0 140,0 60,80"
                    fill="#3a3020"
                    opacity="0.5"
                />
                <polygon
                    className={`${id}-shard-1`}
                    points="0,0 60,80 0,150"
                    fill="#d4af37"
                    opacity="0.18"
                />
                <polygon
                    className={`${id}-shard-2`}
                    points="140,0 230,20 60,80"
                    fill="#8a6d1f"
                    opacity="0.2"
                />
                <polygon
                    className={`${id}-shard-3`}
                    points="60,80 230,20 150,110"
                    fill="#d4af37"
                    opacity="0.11"
                />
                <polygon
                    className={`${id}-shard-4`}
                    points="0,150 60,80 150,110"
                    fill="#5a4a26"
                    opacity="0.18"
                />
                <polygon
                    className={`${id}-shard-5`}
                    points="150,110 230,20 260,90"
                    fill="#d4af37"
                    opacity="0.08"
                />
                <polygon
                    className={`${id}-shard-6`}
                    points="0,150 150,110 90,210"
                    fill="#3a3020"
                    opacity="0.15"
                />
                <polygon
                    className={`${id}-shard-7`}
                    points="150,110 260,90 200,180"
                    fill="#8a6d1f"
                    opacity="0.1"
                />
            </g>
        </svg>
    );
}

export default function HeroBackground() {
    const rootRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root) return;

            // Every shard (each polygon appears twice — stroke pass + fill
            // pass — sharing a class so they move together) drifts slowly
            // and independently, like the badge's own float effect but much
            // subtler since this sits behind the page's actual content.
            for (let i = 0; i < 8; i++) {
                const targets = root.querySelectorAll(
                    `.tl-shard-${i}, .br-shard-${i}`,
                );
                if (!targets.length) continue;

                gsap.to(targets, {
                    x: (Math.random() - 0.5) * 14,
                    y: (Math.random() - 0.5) * 14,
                    duration: 5 + Math.random() * 3,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1,
                    delay: i * 0.25,
                });
            }
        },
        { scope: rootRef },
    );

    return (
        <div
            ref={rootRef}
            className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
            aria-hidden="true"
        >
            <div className="absolute inset-0 bg-[#0a0a0b]" />
            <ShardCluster
                id="tl"
                className="absolute -top-6 -left-6 w-[38vw] max-w-[420px] min-w-[220px] opacity-90"
            />
            <ShardCluster
                id="br"
                className="absolute -bottom-6 -right-6 w-[38vw] max-w-[420px] min-w-[220px] rotate-180 opacity-90"
            />
        </div>
    );
}
