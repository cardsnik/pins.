import { Link } from "react-router-dom";
import { ROUTES } from "../../../shared/config/routes";
import type { Pin } from "../model/types";
import styles from "./PinCard.module.css";

interface PinCardProps {
  pin: Pin;
}

function PinCard({ pin }: PinCardProps) {
  return (
    <Link to={ROUTES.pin(pin.id)} className={styles.card}>
      <img src={pin.thumbUrl} alt={pin.description} className={styles.image} />
    </Link>
  );
}

export default PinCard;
