import { PinCard } from "../../../entities/pin";
import type { Pin } from "../../../entities/pin";
import { FavoriteButton } from "../../../features/favorite";
import { Skeleton } from "../../../shared/ui/Skeleton";
import styles from "./PinGrid.module.css";

const SKELETON_HEIGHTS = [220, 300, 180, 260, 340, 200, 280, 240, 320, 190, 250, 270];

interface PinGridProps {
  items: Pin[];
  isLoading?: boolean;
  emptyMessage?: string;
}

function PinGrid({ items, isLoading, emptyMessage = "Ничего не найдено" }: PinGridProps) {
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
    return <p className={styles.status}>{emptyMessage}</p>;
  }

  return (
    <div className={styles.grid}>
      {items.map((pin) => (
        <div key={pin.id} className={styles.cardWrapper}>
          <PinCard pin={pin} />
          <FavoriteButton pin={pin} />
        </div>
      ))}
    </div>
  );
}

export default PinGrid;
