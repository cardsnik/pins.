import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPinById } from "../../entities/pin";
import type { Pin } from "../../entities/pin";
import { FavoriteButton } from "../../features/favorite";
import { Skeleton } from "../../shared/ui/Skeleton";
import { ROUTES } from "../../shared/config/routes";
import styles from "./PinPage.module.css";

type Status = "loading" | "succeeded" | "failed";

function PinPage() {
  const { id } = useParams<{ id: string }>();
  const [pin, setPin] = useState<Pin | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!id) {
      return;
    }

    setStatus("loading");
    getPinById(id)
      .then((data) => {
        setPin(data);
        setStatus("succeeded");
      })
      .catch(() => setStatus("failed"));
  }, [id]);

  if (status === "loading") {
    return (
      <div className={styles.page}>
        <Skeleton height={20} className={styles.skeletonBackLink} />
        <div className={styles.content}>
          <Skeleton height={420} className={styles.skeletonImage} />
          <div className={styles.info}>
            <Skeleton height={16} className={styles.skeletonLine} />
            <Skeleton height={16} className={styles.skeletonLineShort} />
          </div>
        </div>
      </div>
    );
  }

  if (status === "failed" || !pin) {
    return <p className={styles.status}>Не удалось загрузить пин</p>;
  }

  return (
    <div className={styles.page}>
      <Link to={ROUTES.feed} className={styles.backLink}>
        ← Назад к ленте
      </Link>
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <img src={pin.imageUrl} alt={pin.description} className={styles.image} />
          <FavoriteButton pin={pin} />
        </div>
        <div className={styles.info}>
          <p className={styles.description}>{pin.description || "Без описания"}</p>
          <a
            href={pin.authorUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.author}
          >
            Автор: {pin.authorName}
          </a>
        </div>
      </div>
    </div>
  );
}

export default PinPage;
