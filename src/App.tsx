import { useEffect, useMemo, useState } from 'react'
import './App.css'
import CounterButton from './components/CounterButton'
import { formatNumber } from './utils/formatNumber'

interface ButtonModel {
  index: number
  label: string
  upgradeLevel: number
  increment: number
  cost: number
  automationCost: number
  upgradeCost: number
  unlocked: boolean
  automated: boolean
}

function getBaseIncrement(index: number): number {
  return 10 ** index
}

function getUnlockCost(index: number): number {
  if (index === 0) return 0
  return ((10 ** (index + 1) - 1) / 9) * 10
}

function getAutomationCost(increment: number): number {
  return increment * 10
}

function getUpgradeCost(baseIncrement: number, upgradeLevel: number): number {
  return Math.floor(baseIncrement * 5 * 2 ** upgradeLevel)
}

function getUpgradedIncrement(baseIncrement: number, upgradeLevel: number): number {
  return baseIncrement * (upgradeLevel + 1)
}

function updateArrayAtIndex<T>(
  prev: T[],
  index: number,
  fallback: T,
  updater: (current: T) => T,
): T[] {
  const next = [...prev]
  while (next.length <= index) {
    next.push(fallback)
  }
  next[index] = updater(next[index])
  return next
}

function App() {
  const [count, setCount] = useState(0)
  const [unlockedCount, setUnlockedCount] = useState(1)
  const [automated, setAutomated] = useState<boolean[]>([false, false, false, false])
  const [upgrades, setUpgrades] = useState<number[]>([0, 0, 0, 0])

  const buttons = useMemo<ButtonModel[]>(() => {
    const visibleCount = unlockedCount + 1
    return Array.from({ length: visibleCount }, (_, index) => {
      const baseIncrement = getBaseIncrement(index)
      const upgradeLevel = upgrades[index] || 0
      const increment = getUpgradedIncrement(baseIncrement, upgradeLevel)
      return {
        index,
        label: `+${increment}`,
        upgradeLevel,
        increment,
        cost: getUnlockCost(index),
        automationCost: getAutomationCost(increment),
        upgradeCost: getUpgradeCost(baseIncrement, upgradeLevel),
        unlocked: index < unlockedCount,
        automated: automated[index] || false,
      }
    })
  }, [unlockedCount, automated, upgrades])

  const perSecondRate = useMemo(() => {
    return buttons.reduce((total, btn) => (btn.automated ? total + btn.increment : total), 0)
  }, [buttons])

  const unlock = (index: number, cost: number) => {
    if (index !== unlockedCount) return
    if (count >= cost) {
      setCount((c) => c - cost)
      setUnlockedCount((c) => c + 1)
    }
  }

  const unlockAutomation = (index: number, cost: number) => {
    if (count >= cost) {
      setCount((c) => c - cost)
      setAutomated((prev) => updateArrayAtIndex(prev, index, false, () => true))
    }
  }

  const upgradeButton = (index: number, cost: number) => {
    if (!(automated[index] || false)) return
    if (count >= cost) {
      setCount((c) => c - cost)
      setUpgrades((prev) => updateArrayAtIndex(prev, index, 0, (level) => level + 1))
    }
  }

  // Game loop: apply automation every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + perSecondRate)
    }, 1000)

    return () => clearInterval(interval)
  }, [perSecondRate])

  return (
    <div id="app">
      <p className="count">{formatNumber(count)}</p>
      {perSecondRate > 0 && (
        <p className="per-second">
          +{formatNumber(perSecondRate)} per second
        </p>
      )}
      <div className="buttons">
        {buttons.map((btn) => (
          <CounterButton
            key={btn.label}
            label={btn.label}
            cost={btn.cost}
            automationCost={btn.automationCost}
            upgradeCost={btn.upgradeCost}
            upgradeLevel={btn.upgradeLevel}
            unlocked={btn.unlocked}
            automated={btn.automated}
            canAfford={count >= btn.cost}
            canAffordAutomation={count >= btn.automationCost}
            canAffordUpgrade={btn.automated && count >= btn.upgradeCost}
            onIncrement={() => setCount((c) => c + btn.increment)}
            onUnlock={() => unlock(btn.index, btn.cost)}
            onUnlockAutomation={() => unlockAutomation(btn.index, btn.automationCost)}
            onUpgrade={() => upgradeButton(btn.index, btn.upgradeCost)}
          />
        ))}
      </div>
    </div>
  )
}

export default App


