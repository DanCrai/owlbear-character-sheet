import { useCharacterStore } from "../store/characterStore"
import { ResourceField } from "./components/ResourceField"
import { Section } from "./components/Section"
import { StatField } from "./components/StatField"

export function CharacterSheet() {
  const { character, updateField, save } = useCharacterStore()

    return (
    <div className="sheet-container">
      <div className="header-row">
        <h1>Character Sheet</h1>

        <button onClick={save}>Save</button>
      </div>

      <Section title="Identity">
        <div className="grid-2">
          <input
            placeholder="Character Name"
            value={character.name}
            onChange={(e) => updateField("name", e.target.value)}
          />

          <input
            placeholder="Class"
            value={character.className}
            onChange={(e) => updateField("className", e.target.value)}
          />
          <input
            type="number"
            placeholder="Level"
            value={character.level}
            onChange={(e) => updateField("level", Number(e.target.value))}
          />

          <input
            placeholder="Race"
            value={character.race}
            onChange={(e) => updateField("race", e.target.value)}
          />
        </div>
      </Section>

      <Section title="Resources">
        <div className="grid-2">
          <ResourceField
            label="HP"
            value={character.hp}
            onChange={(value) => updateField("hp", value)}
          />

          <ResourceField
            label="Mana"
            value={character.mana}
            onChange={(value) => updateField("mana", value)}
          />
        </div>
      </Section>

      <Section title="Combat Stats">
        <div className="grid-2">
          <input
            type="number"
            placeholder="Armor Class"
            value={character.armorClass}
            onChange={(e) =>
              updateField("armorClass", Number(e.target.value))
            }
          />

          <input
            type="number"
            placeholder="Physical Accuracy"
            value={character.physicalAccuracy}
            onChange={(e) =>
              updateField("physicalAccuracy", Number(e.target.value))
            }
          />

          <input
            type="number"
            placeholder="Magical Accuracy"
            value={character.magicalAccuracy}
            onChange={(e) =>
              updateField("magicalAccuracy", Number(e.target.value))
            }
          />

                 <input
            type="number"
            placeholder="Movement Speed"
            value={character.movementSpeed}
            onChange={(e) =>
              updateField("movementSpeed", Number(e.target.value))
            }
          />

          <input
            type="number"
            placeholder="Initiative Bonus"
            value={character.initiativeBonus}
            onChange={(e) =>
              updateField("initiativeBonus", Number(e.target.value))
            }
          />
        </div>
      </Section>

         <Section title="Stats">
        <div className="stats-grid">
          <StatField
            label="STR"
            value={character.stats.strength}
            onChange={(value) =>
              updateField("stats", {
                ...character.stats,
                strength: value
              })
            }
          />

          <StatField
            label="DEX"
            value={character.stats.dexterity}
            onChange={(value) =>
              updateField("stats", {
                ...character.stats,
                dexterity: value
              })
            }
          />

          <StatField
            label="CON"
            value={character.stats.constitution}
            onChange={(value) =>
              updateField("stats", {
                ...character.stats,
                constitution: value
              })
            }
          />

            <StatField
            label="INT"
            value={character.stats.intelligence}
            onChange={(value) =>
              updateField("stats", {
                ...character.stats,
                intelligence: value
              })
            }
          />
            <StatField
            label="WIS"
            value={character.stats.wisdom}
            onChange={(value) =>
              updateField("stats", {
                ...character.stats,
                wisdom: value
              })
            }
          />
          <StatField
            label="WILL"
            value={character.stats.will}
            onChange={(value) =>
              updateField("stats", {
                ...character.stats,
                will: value
              })
            }
          />
            <StatField
            label="CHA"
            value={character.stats.charisma}
            onChange={(value) =>
              updateField("stats", {
                ...character.stats,
                charisma: value
              })
            }
          />
        </div>
      </Section>

      <Section title="Abilities">
        <textarea
          value={character.abilitiesText}
          onChange={(e) => updateField("abilitiesText", e.target.value)}
          rows={15}
        />
      </Section>
    </div>
  )
}