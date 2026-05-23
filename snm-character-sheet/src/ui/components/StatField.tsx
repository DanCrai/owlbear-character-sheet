import { type CoreStat } from "../../domain/stats"

type Props = {
  label: string
  value: CoreStat
  onChange: (value: CoreStat) => void
}

export function StatField({ label, value, onChange }: Props) {
  return (
    <div className="stat-card">
      <h3>{label}</h3>

      <label>Stat</label>
      <input
        type="number"
        value={value.value}
        onChange={(e) =>
          onChange({
            ...value,
            value: Number(e.target.value)
          })
        }
      />

      <label>Modifier</label>
      <input
        type="number"
        value={value.modifier}
        onChange={(e) =>
          onChange({
            ...value,
            modifier: Number(e.target.value)
          })
        }
      />

      <label>Saving Throw</label>
      <input
        type="number"
        value={value.savingThrow}
        onChange={(e) =>
          onChange({
            ...value,
            savingThrow: Number(e.target.value)
          })
        }
      />
    </div>
  )
}