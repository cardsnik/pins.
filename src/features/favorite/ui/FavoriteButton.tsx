import { motion, useAnimationControls } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { toggleFavorite } from "../model/favoritesSlice";
import type { Pin } from "../../../entities/pin";
import { toastAddedToFavorites, toastRemovedFromFavorites } from "../../../shared/lib/toast";
import { useTranslation } from "../../../shared/lib/i18n/LanguageContext";
import styles from "./FavoriteButton.module.css";

interface FavoriteButtonProps {
  pin: Pin;
}

function FavoriteButton({ pin }: FavoriteButtonProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const controls = useAnimationControls();
  const isFavorite = useAppSelector((state) =>
    state.favorites.items.some((item) => item.id === pin.id)
  );

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const willBeFavorite = !isFavorite;
    dispatch(toggleFavorite(pin));

    controls.start({
      scale: [1, 1.35, 0.9, 1.1, 1],
      rotate: [0, -18, 16, -8, 0],
      transition: { duration: 0.5, ease: "easeInOut" },
    });

    if (willBeFavorite) {
      toastAddedToFavorites(t.toast.addedToFavorites);
    } else {
      toastRemovedFromFavorites(t.toast.removedFromFavorites);
    }
  };

  return (
    <motion.button
      type="button"
      className={`${styles.button} ${isFavorite ? styles.active : ""}`}
      onClick={handleClick}
      animate={controls}
      whileTap={{ scale: 0.8 }}
      aria-label={isFavorite ? t.favorite.remove : t.favorite.add}
    >
      {isFavorite ? "♥" : "♡"}
    </motion.button>
  );
}

export default FavoriteButton;
