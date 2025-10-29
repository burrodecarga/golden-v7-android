export const formatDate=(date: Date|string): string => {
  const d=typeof date==='string'? new Date(date):date
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export const formatTime=(date: Date|string): string => {
  const d=typeof date==='string'? new Date(date):date
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const isToday=(date: Date|string): boolean => {
  const d=typeof date==='string'? new Date(date):date
  const today=new Date()
  return (
    d.getDate()===today.getDate()&&
    d.getMonth()===today.getMonth()&&
    d.getFullYear()===today.getFullYear()
  )
}

export const isTomorrow=(date: Date|string): boolean => {
  const d=typeof date==='string'? new Date(date):date
  const tomorrow=new Date()
  tomorrow.setDate(tomorrow.getDate()+1)
  return (
    d.getDate()===tomorrow.getDate()&&
    d.getMonth()===tomorrow.getMonth()&&
    d.getFullYear()===tomorrow.getFullYear()
  )
}

export const isOverdue=(date: Date|string): boolean => {
  const d=typeof date==='string'? new Date(date):date
  const now=new Date()
  return d<now
}

export const getRelativeDateLabel=(date: Date|string): string => {
  if (isToday(date)) return 'Today'
  if (isTomorrow(date)) return 'Tomorrow'

  return formatDate(date)
}

export const groupByDate=<T extends { dueDate?: string }>(
  items: T[]
): Record<string, T[]> => {
  const grouped: Record<string, T[]>={}

  // Group items without due dates
  const withoutDueDate=items.filter(item => !item.dueDate)
  if (withoutDueDate.length>0) {
    grouped['No Date']=withoutDueDate
  }

  // Group items with due dates
  items
    .filter(item => item.dueDate)
    .forEach(item => {
      if (!item.dueDate) return

      const date=new Date(item.dueDate)
      const dateKey=date.toISOString().split('T')[0]

      if (!grouped[dateKey]) {
        grouped[dateKey]=[]
      }

      grouped[dateKey].push(item)
    })

  return grouped
}


export const SEMANAS=[
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29,
  30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
  40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
  50, 51, 52, 53
]

export const ESTADO=[
  'programado', 'en curso', 'realizado', 'pagado'
]