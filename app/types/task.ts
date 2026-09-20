export interface Task {
  id: number
  title: string
  category: 'Bug' | 'Feature' | 'Docs'
  completed: boolean
}

export type TaskFilter = 'All' | 'Pending' | 'Completed'
