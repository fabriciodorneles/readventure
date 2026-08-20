import type { TextCasePreference } from '../game/gameState';
import { getStrings } from '../i18n/strings';
import type { Lang } from '../i18n/strings';

type SettingsPanelProps = {
  textCase: TextCasePreference;
  lang: Lang;
  onTextCaseChange: (value: TextCasePreference) => void;
  onLanguageChange: (value: Lang) => void;
  onResetProgress: () => void;
  onClose: () => void;
};

/** Área dos pais: discreta, fora do fluxo da criança. */
export function SettingsPanel({
  textCase,
  lang,
  onTextCaseChange,
  onLanguageChange,
  onResetProgress,
  onClose,
}: SettingsPanelProps) {
  const t = getStrings(lang);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <h2>{t.parentArea}</h2>

        <div className="settings-group">
          <span className="settings-label">{t.language}</span>
          <div className="lang-choices">
            <button
              type="button"
              className={`lang-button ${lang === 'pt' ? 'selected' : ''}`}
              onClick={() => onLanguageChange('pt')}
            >
              🇧🇷 Português
            </button>
            <button
              type="button"
              className={`lang-button ${lang === 'en' ? 'selected' : ''}`}
              onClick={() => onLanguageChange('en')}
            >
              🇺🇸 English
            </button>
          </div>
        </div>

        <div className="settings-group">
          <span className="settings-label">{t.textStyle}</span>
          <label className="settings-radio">
            <input
              type="radio"
              name="text-case"
              checked={textCase === 'uppercase'}
              onChange={() => onTextCaseChange('uppercase')}
            />
            {t.uppercase}
          </label>
          <label className="settings-radio">
            <input
              type="radio"
              name="text-case"
              checked={textCase === 'sentence-case'}
              onChange={() => onTextCaseChange('sentence-case')}
            />
            {t.normalCase}
          </label>
        </div>

        <div className="settings-group">
          <button
            type="button"
            className="settings-danger"
            onClick={() => {
              if (window.confirm(t.resetConfirm)) {
                onResetProgress();
                onClose();
              }
            }}
          >
            {t.resetAdventure}
          </button>
        </div>

        <button type="button" className="settings-close" onClick={onClose}>
          {t.close}
        </button>
      </div>
    </div>
  );
}
