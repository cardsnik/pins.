import { useLayoutEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { PinCard } from "../../../entities/pin";
import type { Pin } from "../../../entities/pin";
import { FavoriteButton } from "../../../features/favorite";
import { Skeleton } from "../../../shared/ui/Skeleton";
import { useTranslation } from "../../../shared/lib/i18n/LanguageContext";
import styles from "./PinGrid.module.css";

const SKELETON_HEIGHTS = [220, 300, 180, 260, 340, 200, 280, 240, 320, 190, 250, 270];

interface PinGridProps {
  items: Pin[];
  isLoading?: boolean;
  emptyMessage?: string;
}

function PinGrid({ items, isLoading, emptyMessage }: PinGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const resolvedEmptyMessage = emptyMessage ?? t.grid.empty;

  useLayoutEffect(() => {
    if (isLoading || items.length === 0 || !gridRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const cards = gridRef.current!.querySelectorAll(`.${styles.cardWrapper}`);
      gsap.fromTo(
        cards,
        { y: 48, scale: 0.9, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.06,
          clearProps: "transform,opacity",
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [items, isLoading]);

  if (isLoading) {
    return (
      <div className={styles.grid}>
        {SKELETON_HEIGHTS.map((height, index) => (
          <Skeleton key={index} className={styles.skeletonCard} height={height} />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return <p className={styles.status}>{resolvedEmptyMessage}</p>;
  }

  return (
    <div className={styles.grid} ref={gridRef}>
      <AnimatePresence mode="popLayout">
        {items.map((pin) => (
          <motion.div
            key={pin.id}
            layout
            className={styles.cardWrapper}
            initial={false}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.25 } }}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            <PinCard pin={pin} />
            <FavoriteButton pin={pin} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default PinGrid;
