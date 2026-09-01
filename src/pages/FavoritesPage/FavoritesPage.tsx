import { useAppSelector } from "../../app/store";
import { PinGrid } from "../../widgets/PinGrid";
import { useTranslation } from "../../shared/lib/i18n/LanguageContext";
import styles from "./FavoritesPage.module.css";

function FavoritesPage() {
  const items = useAppSelector((state) => state.favorites.items);
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <PinGrid items={items} emptyMessage={t.grid.emptyFavorites} />
    </div>
  );
}

export default FavoritesPage;
