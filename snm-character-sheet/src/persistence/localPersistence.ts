import { type CharacterDocument } from "../domain/character"

const STORAGE_KEY = "ttrpg-character-sheet"

export function saveCharacter(document: CharacterDocument) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(document))
}

export function loadCharacter(): CharacterDocument | null {
  const raw = localStorage.getItem(STORAGE_KEY)

  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}