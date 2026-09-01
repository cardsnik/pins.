import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import { getPinById } from "../../entities/pin";
import type { Pin } from "../../entities/pin";
import { FavoriteButton } from "../../features/favorite";
import { Skeleton } from "../../shared/ui/Skeleton";
import { ROUTES } from "../../shared/config/routes";
import { useTranslation } from "../../shared/lib/i18n/LanguageContext";
import styles from "./PinPage.module.css";

type Status = "loading" | "succeeded" | "failed";

function PinPage() {
  const { id } = useParams<{ id: string }>();
  const [pin, setPin] = useState<Pin | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const { t } = useTranslation();
  const imageRef = useRef<HTMLImageElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

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

  useLayoutEffect(() => {
    if (status !== "succeeded") return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
      gsap.fromTo(
        infoRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.15, ease: "power3.out" }
      );
    });

    return () => ctx.revert();
  }, [status]);

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
    return <p className={styles.status}>{t.pin.loadFailed}</p>;
  }

  return (
    <div className={styles.page}>
      <Link to={ROUTES.feed} className={styles.backLink}>
        {t.pin.back}
      </Link>
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <img
            ref={imageRef}
            src={pin.imageUrl}
            alt={pin.description}
            className={styles.image}
          />
          <FavoriteButton pin={pin} />
        </div>
        <div className={styles.info} ref={infoRef}>
          <p className={styles.description}>{pin.description || t.pin.noDescription}</p>
          <a
            href={pin.authorUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.author}
          >
            {t.pin.author}: {pin.authorName}
          </a>
        </div>
      </div>
    </div>
  );
}

export default PinPage;
