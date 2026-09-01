import type { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { fetchFeed, searchPins, setSearchQuery } from "../../../entities/pin";
import { useTranslation } from "../../../shared/lib/i18n/LanguageContext";
import styles from "./PinSearchForm.module.css";

function PinSearchForm() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.pins.searchQuery);
  const { t } = useTranslation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(searchPins(searchQuery));
    } else {
      dispatch(fetchFeed(1));
    }
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={t.search.placeholder}
        className={styles.searchInput}
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      />
      <button type="submit" className={styles.searchButton}>
        {t.search.button}
      </button>
    </form>
  );
}

export default PinSearchForm;
