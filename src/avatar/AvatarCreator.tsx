import { useState } from 'react';
import type { AvatarConfig } from '../game/gameState';
import { hairStyles, shirtColors, skinTones } from './cosmetics';
import { AvatarPreview } from './Avatar';
import { playSound } from '../audio/sounds';

export function AvatarCreator({ onDone }: { onDone: (avatar: AvatarConfig) => void }) {
  const [skin, setSkin] = useState(0);
  const [hair, setHair] = useState(0);
  const [shirt, setShirt] = useState(0);
  const config: AvatarConfig = { skin, hair, shirt };

  return (
    <div className="avatar-creator">
      <h1 className="avatar-creator-title">QUEM É VOCÊ?</h1>
      <div className="avatar-creator-body">
        <div className="avatar-creator-preview">
          <AvatarPreview config={config} width={190} />
        </div>
        <div className="avatar-creator-options">
          <OptionRow label="PELE">
            {skinTones.map((tone, i) => (
              <button
                key={tone}
                type="button"
                className={`swatch ${skin === i ? 'selected' : ''}`}
                style={{ background: tone }}
                onClick={() => {
                  playSound('tap');
                  setSkin(i);
                }}
                aria-label={`Tom de pele ${i + 1}`}
              />
            ))}
          </OptionRow>
          <OptionRow label="CABELO">
            {hairStyles.map((style, i) => (
              <button
                key={style.name}
                type="button"
                className={`swatch mini-avatar ${hair === i ? 'selected' : ''}`}
                onClick={() => {
                  playSound('tap');
                  setHair(i);
                }}
                aria-label={style.name}
              >
                <AvatarPreview config={{ skin, hair: i, shirt }} width={44} />
              </button>
            ))}
          </OptionRow>
          <OptionRow label="CAMISETA">
            {shirtColors.map((color, i) => (
              <button
                key={color}
                type="button"
                className={`swatch ${shirt === i ? 'selected' : ''}`}
                style={{ background: color }}
                onClick={() => {
                  playSound('tap');
                  setShirt(i);
                }}
                aria-label={`Camiseta ${i + 1}`}
              />
            ))}
          </OptionRow>
        </div>
      </div>
      <button
        type="button"
        className="big-button"
        onClick={() => {
          playSound('success');
          onDone(config);
        }}
      >
        COMEÇAR! 🚀
      </button>
    </div>
  );
}

function OptionRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="option-row">
      <span className="option-label">{label}</span>
      <div className="option-choices">{children}</div>
    </div>
  );
}
