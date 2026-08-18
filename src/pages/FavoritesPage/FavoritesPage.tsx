import { useAppSelector } from "../../app/store";
import { PinGrid } from "../../widgets/PinGrid";
import styles from "./FavoritesPage.module.css";

function FavoritesPage() {
  const items = useAppSelector((state) => state.favorites.items);

  return (
    <div className={styles.page}>
      <PinGrid items={items} emptyMessage="Пока нет избранных пинов" />
    </div>
  );
}

export default FavoritesPage;
