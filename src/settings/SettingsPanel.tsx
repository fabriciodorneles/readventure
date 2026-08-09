import type { TextCasePreference } from '../game/gameState';

type SettingsPanelProps = {
  textCase: TextCasePreference;
  onTextCaseChange: (value: TextCasePreference) => void;
  onResetProgress: () => void;
  onClose: () => void;
};

/** Área dos pais: discreta, fora do fluxo da criança. */
export function SettingsPanel({ textCase, onTextCaseChange, onResetProgress, onClose }: SettingsPanelProps) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <h2>Área dos pais</h2>

        <div className="settings-group">
          <span className="settings-label">Estilo do texto</span>
          <label className="settings-radio">
            <input
              type="radio"
              name="text-case"
              checked={textCase === 'uppercase'}
              onChange={() => onTextCaseChange('uppercase')}
            />
            MAIÚSCULAS
          </label>
          <label className="settings-radio">
            <input
              type="radio"
              name="text-case"
              checked={textCase === 'sentence-case'}
              onChange={() => onTextCaseChange('sentence-case')}
            />
            Normal
          </label>
        </div>

        <div className="settings-group">
          <button
            type="button"
            className="settings-danger"
            onClick={() => {
              if (window.confirm('Apagar todo o progresso da aventura?')) {
                onResetProgress();
                onClose();
              }
            }}
          >
            Recomeçar aventura do zero
          </button>
        </div>

        <button type="button" className="settings-close" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}
