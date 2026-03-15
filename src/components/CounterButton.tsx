import { formatNumber } from '../utils/formatNumber'

interface CounterButtonProps {
  label: string
  cost: number
  automationCost: number
  upgradeCost: number
  upgradeLevel: number
  unlocked: boolean
  automated: boolean
  canAfford: boolean
  canAffordAutomation: boolean
  canAffordUpgrade: boolean
  onIncrement: () => void
  onUnlock: () => void
  onUnlockAutomation: () => void
  onUpgrade: () => void
}

function CounterButton({
  label,
  cost,
  automationCost,
  upgradeCost,
  upgradeLevel,
  unlocked,
  automated,
  canAfford,
  canAffordAutomation,
  canAffordUpgrade,
  onIncrement,
  onUnlock,
  onUnlockAutomation,
  onUpgrade,
}: CounterButtonProps) {
  if (!unlocked) {
    // Locked: show unlock button
    return (
      <button
        className="counter unlock"
        disabled={!canAfford}
        onClick={onUnlock}
      >
        Unlock {label} <span className="cost">({formatNumber(cost)} pts)</span>
      </button>
    )
  }

  // Unlocked: show increment button + automation unlock (if not automated)
  return (
    <div className="button-group">
      <button className="counter" onClick={onIncrement}>
        Click {label}
      </button>
      {!automated && (
        <button
          className="counter automate"
          disabled={!canAffordAutomation}
          onClick={onUnlockAutomation}
        >
          Auto {label} <span className="cost">({formatNumber(automationCost)} pts)</span>
        </button>
      )}
      {automated && (
        <>
          <button
            className="counter upgrade"
            disabled={!canAffordUpgrade}
            onClick={onUpgrade}
          >
            Upgrade (Lv {upgradeLevel + 1}){' '}
            <span className="cost">({formatNumber(upgradeCost)} pts)</span>
          </button>
          <span className="automated-badge">⚙️ Auto</span>
        </>
      )}
    </div>
  )
}

export default CounterButton


