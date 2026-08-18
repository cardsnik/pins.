import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { fetchFeed } from "../../entities/pin";
import { PinSearchForm } from "../../features/pin-search";
import { PinGrid } from "../../widgets/PinGrid";
import styles from "./FeedPage.module.css";

function FeedPage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.pins);

  useEffect(() => {
    dispatch(fetchFeed(1));
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <PinSearchForm />
      {status === "failed" && <p className={styles.status}>{error}</p>}
      <PinGrid items={items} isLoading={status === "loading"} />
    </div>
  );
}

export default FeedPage;
