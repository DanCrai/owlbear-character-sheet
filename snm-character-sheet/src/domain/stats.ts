export type CoreStat = {
  value: number
  modifier: number
  savingThrow: number
}

export type StatsBlock = {
  strength: CoreStat
  dexterity: CoreStat
  constitution: CoreStat
  intelligence: CoreStat
  wisdom: CoreStat
  will: CoreStat
  charisma: CoreStat
}