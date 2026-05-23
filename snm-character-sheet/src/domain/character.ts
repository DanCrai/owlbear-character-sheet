import { type StatsBlock } from "./stats"

export type Resource = {
  current: number
  max: number
}

export type CharacterDocument = {
  version: 1
  data: Character
}

export type Character = {
  id: string

  name: string
  className: string
  level: number
  race: string

  hp: Resource
  mana: Resource

  armorClass: number
  physicalAccuracy: number
  magicalAccuracy: number
  movementSpeed: number
  initiativeBonus: number

  stats: StatsBlock

  abilitiesText: string
}