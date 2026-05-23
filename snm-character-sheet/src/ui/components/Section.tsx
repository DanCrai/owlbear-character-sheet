import { type ReactNode } from "react"

type Props = {
  title: string
  children: ReactNode
}

export function Section({ title, children }: Props) {
  return (
    <div className="section">
      <h2>{title}</h2>
      {children}
    </div>
  )
}