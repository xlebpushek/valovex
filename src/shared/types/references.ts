type ReferenceKey = 'home'

export interface ReferenceValue {
  href: string
  title: string
}

export type Reference = Record<ReferenceKey, ReferenceValue>
