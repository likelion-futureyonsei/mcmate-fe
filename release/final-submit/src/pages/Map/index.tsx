import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

import styles from "./index.module.scss";

const EPISODE_REFERENCE_SRC = "/episode-reference.svg?v=20260821-map-episode-text";
const MAP_BACKGROUND_SRC = "/map-background.svg";
const MAP_REFERENCE_SRC = "/map-reference.svg?v=20260821-episode-title";
const MAP_THUMBNAIL_SRC = "/map-episode-thumbnail.svg?v=20260821-thumbnail";
const MAP_IMAGE_COUNT = 3;

export function Map() {
  const [loadedImageCount, setLoadedImageCount] = useState(0);
  const isMapReady = loadedImageCount >= MAP_IMAGE_COUNT;

  useEffect(() => {
    const preload = document.createElement("link");
    preload.rel = "preload";
    preload.as = "image";
    preload.href = EPISODE_REFERENCE_SRC;
    document.head.appendChild(preload);

    return () => {
      preload.remove();
    };
  }, []);

  const handleImageLoad = () => {
    setLoadedImageCount((count) => Math.min(count + 1, MAP_IMAGE_COUNT));
  };

  return (
    <section className={styles.page} aria-label="map page">
      <div className={`${styles.content} ${isMapReady ? styles.contentReady : ""}`} aria-hidden={!isMapReady}>
        <img className={styles.background} src={MAP_BACKGROUND_SRC} alt="" aria-hidden="true" onLoad={handleImageLoad} />
        <img className={styles.reference} src={MAP_REFERENCE_SRC} alt="MCM 에피소드 지도" onLoad={handleImageLoad} />
        <div className={styles.thumbnailCrop} aria-hidden="true">
          <img src={MAP_THUMBNAIL_SRC} alt="" onLoad={handleImageLoad} />
        </div>
      </div>
      {isMapReady && <Link className={styles.episodeHotspot} to="/episode" aria-label="에피소드 상세 보기" />}
    </section>
  );
}
