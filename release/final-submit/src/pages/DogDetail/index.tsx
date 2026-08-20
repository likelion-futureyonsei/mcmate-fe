import {useState} from "react";
import {useNavigate} from "react-router-dom";

import styles from "./index.module.scss";

type DetailPanel = "first" | "second" | "third";
type CharacterImage = {
  src: string;
  scale: number;
  bottom: number;
};

const panelSrc: Record<DetailPanel, string> = {
  first: "/dog-detail.svg?v=character-layer",
  second: "/dog-detail-second.svg?v=character-layer",
  third: "/dog-detail-third.svg?v=character-layer",
};

const colors = ["#B65408", "#000000", "#ffffff", "#B9B9BB", "#E1A0A3"];
const sittingDogImages: CharacterImage[] = [
  {src: "/dog-character-sitting-1.svg", scale: 1, bottom: 372},
  {src: "/dog-character-sitting-3.svg", scale: 0.9329, bottom: 376.9},
  {src: "/dog-character-sitting-white.svg", scale: 0.99, bottom: 373.45},
  {src: "/dog-character-sitting-4.svg", scale: 1.0588, bottom: 369.09},
  {src: "/dog-character-sitting-5.svg", scale: 1.2038, bottom: 362.15},
];
const standingDogImages: CharacterImage[] = [
  {src: "/dog-character-standing-1.svg", scale: 1.1511, bottom: 366.64},
  {src: "/dog-character-standing-2.svg", scale: 1.2433, bottom: 358.95},
  {src: "/dog-character-standing-3.svg", scale: 1, bottom: 384.39},
  {src: "/dog-character-standing-4.svg", scale: 1.0761, bottom: 373.33},
  {src: "/dog-character-standing-5.svg", scale: 1.0518, bottom: 370.27},
];
const rabbitImages: CharacterImage[] = [
  {src: "/dog-character-rabbit-1.svg", scale: 1.184, bottom: 365.79},
  {src: "/dog-character-rabbit-2.svg", scale: 1.1266, bottom: 371.43},
  {src: "/dog-character-rabbit-3.svg", scale: 0.944, bottom: 384.25},
  {src: "/dog-character-rabbit-4.svg", scale: 0.9051, bottom: 384.52},
  {src: "/dog-character-rabbit-5.svg", scale: 0.974, bottom: 379.13},
];
const characterImageGroups = [sittingDogImages, standingDogImages, rabbitImages];

export function DogDetail() {
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState<DetailPanel>("first");
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedThirdCardIndex, setSelectedThirdCardIndex] = useState(0);
  const [colorScrollProgress, setColorScrollProgress] = useState(0);
  const selectedCardIndex = activePanel === "third" ? Math.min(selectedThirdCardIndex, 1) : selectedCharacterIndex;
  const selectedCardLeft = 90 + selectedCardIndex * 73;
  const hasThirdPatternCard = activePanel !== "third";
  const characterGroup = characterImageGroups[selectedCharacterIndex] ?? sittingDogImages;
  const characterImage = characterGroup[selectedColorIndex] ?? characterGroup[0] ?? sittingDogImages[selectedColorIndex];

  return (
    <section className={styles.page} aria-label="dog detail page">
      <img className={styles.reference} src={panelSrc[activePanel]} alt="" aria-hidden="true" />
      <img
        className={styles.characterImage}
        src={characterImage.src}
        style={{
          bottom: `${characterImage.bottom}px`,
          transform: `translateX(-50%) scale(${characterImage.scale})`,
        }}
        alt=""
        aria-hidden="true"
      />
      {activePanel === "second" && (
        <>
          <div
            className={styles.colorScrollFrame}
            aria-label="색상 목록"
            onScroll={(event) => {
              const {scrollLeft, scrollWidth, clientWidth} = event.currentTarget;
              const maxScrollLeft = scrollWidth - clientWidth;
              setColorScrollProgress(maxScrollLeft > 0 ? scrollLeft / maxScrollLeft : 0);
            }}
          >
            <div className={styles.colorScrollTrack}>
              {colors.map((color, index) => (
                <button
                  key={color}
                  className={`${styles.colorCard} ${selectedColorIndex === index ? styles.selectedColorCard : ""}`}
                  type="button"
                  aria-label={`색상 ${color}`}
                  aria-pressed={selectedColorIndex === index}
                  onClick={() => setSelectedColorIndex(index)}
                >
                  <span className={styles.colorSwatch} style={{backgroundColor: color}} />
                </button>
              ))}
            </div>
          </div>
          <div className={styles.colorScrollIndicator} aria-hidden="true">
            <span
              className={styles.colorScrollThumb}
              style={{transform: `translateX(${colorScrollProgress * 10}px)`}}
            />
          </div>
        </>
      )}
      {activePanel !== "second" && (
        <>
          <span
            className={styles.selectedCardBorder}
            style={{left: `${selectedCardLeft}px`}}
            aria-hidden="true"
          />
          <button
            className={styles.firstCardHotspot}
            type="button"
            aria-label="첫 번째 이미지"
            onClick={() => {
              if (activePanel === "third") {
                setSelectedThirdCardIndex(0);
                return;
              }
              setSelectedCharacterIndex(0);
            }}
          />
          <button
            className={styles.secondCardHotspot}
            type="button"
            aria-label="두 번째 이미지"
            onClick={() => {
              if (activePanel === "third") {
                setSelectedThirdCardIndex(1);
                return;
              }
              setSelectedCharacterIndex(1);
            }}
          />
          {hasThirdPatternCard && (
            <button
              className={styles.thirdCardHotspot}
              type="button"
              aria-label="세 번째 이미지"
              onClick={() => {
                setSelectedCharacterIndex(2);
              }}
            />
          )}
        </>
      )}
      <button
        className={styles.doneHotspot}
        type="button"
        aria-label="강아지 상세 완료"
        onClick={() => navigate("/home")}
      />
      <button
        className={styles.firstTabHotspot}
        type="button"
        aria-label="첫 번째 기록 영역"
        aria-pressed={activePanel === "first"}
        onClick={() => {
          setActivePanel("first");
        }}
      />
      <button
        className={styles.secondTabHotspot}
        type="button"
        aria-label="두 번째 기록 영역"
        aria-pressed={activePanel === "second"}
        onClick={() => {
          setActivePanel("second");
        }}
      />
      <button
        className={styles.thirdTabHotspot}
        type="button"
        aria-label="세 번째 기록 영역"
        aria-pressed={activePanel === "third"}
        onClick={() => {
          setActivePanel("third");
        }}
      />
    </section>
  );
}
