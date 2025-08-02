export interface Post {
  id: number
  title: string
  content: string
  image?: string | null
  date: string // formato ISO que luego puedes formatear con Date
}

export type Language = 'es' | 'en' | 'de';