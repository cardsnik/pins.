import styles from "./Skeleton.module.css";

interface SkeletonProps {
  className?: string;
  height?: number;
}

function Skeleton({ className, height }: SkeletonProps) {
  return (
    <div
      className={`${styles.skeleton} ${className ?? ""}`}
      style={height ? { height } : undefined}
    />
  );
}

export default Skeleton;
