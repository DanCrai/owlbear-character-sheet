import { create } from "zustand"
import { type Character, type CharacterDocument } from "../domain/character"
import { loadCharacter, saveCharacter } from "../persistence/localPersistence"

function createDefaultCharacter(): Character {
  return {
    id: crypto.randomUUID(),

    name: "",
    className: "",
    level: 1,
    race: "",

    hp: {
      current: 0,
      max: 0
    },

    mana: {
      current: 0,
      max: 0
    },

    armorClass: 0,
    physicalAccuracy: 0,
    magicalAccuracy: 0,
    movementSpeed: 0,
    initiativeBonus: 0,

    stats: {
      strength: {
        value: 10,
        modifier: 0,
        savingThrow: 0
      },
      dexterity: {
        value: 10,
        modifier: 0,
        savingThrow: 0
      },
      constitution: {
        value: 10,
        modifier: 0,
        savingThrow: 0
      },
      intelligence: {
        value: 10,
        modifier: 0,
        savingThrow: 0
      },
      will: {
        value: 10,
        modifier: 0,
        savingThrow: 0
      },
      wisdom: {
        value: 10,
        modifier: 0,
        savingThrow: 0
      },
      charisma: {
        value: 10,
        modifier: 0,
        savingThrow: 0
      }
    },

    abilitiesText: ""
  }
}

const stored = loadCharacter()

const initialCharacter = stored?.data ?? createDefaultCharacter()

type CharacterStore = {
  character: Character

  updateField: (field: keyof Character, value: any) => void

  save: () => void
}

export const useCharacterStore = create<CharacterStore>((set, get) => ({
  character: initialCharacter,

  updateField: (field, value) => {
    set((state) => ({
      character: {
        ...state.character,
        [field]: value
      }
    }))
  },

  save: () => {
    const document: CharacterDocument = {
      version: 1,
      data: get().character
    }

    saveCharacter(document)
  }
}))