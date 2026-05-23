import { type Resource } from "../../domain/character"

type Props = {
  label: string
  value: Resource
  onChange: (value: Resource) => void
}

export function ResourceField({ label, value, onChange }: Props) {
  return (
    <div className="resource-field">
      <label>{label}</label>

      <div className="resource-values">
        <input
          type="number"
          value={value.current}
          onChange={(e) =>
            onChange({
              ...value,
              current: Number(e.target.value)
            })
          }
        />

        <span>/</span>

        <input
          type="number"
          value={value.max}
          onChange={(e) =>
            onChange({
              ...value,
              max: Number(e.target.value)
            })
          }
        />
      </div>
    </div>
  )
}