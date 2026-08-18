import { useAppDispatch, useAppSelector } from "../../../app/store";
import { toggleFavorite } from "../model/favoritesSlice";
import type { Pin } from "../../../entities/pin";
import styles from "./FavoriteButton.module.css";

interface FavoriteButtonProps {
  pin: Pin;
}

function FavoriteButton({ pin }: FavoriteButtonProps) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    state.favorites.items.some((item) => item.id === pin.id)
  );

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(pin));
  };

  return (
    <button
      type="button"
      className={`${styles.button} ${isFavorite ? styles.active : ""}`}
      onClick={handleClick}
      aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
    >
      {isFavorite ? "♥" : "♡"}
    </button>
  );
}

export default FavoriteButton;
