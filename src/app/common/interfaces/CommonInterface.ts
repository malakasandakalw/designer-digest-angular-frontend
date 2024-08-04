export interface User {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    role?: string,
    is_verified: boolean
}

export interface PostCategory {
    id: string,
    name: string
}

export interface Post {
    id: string,
    title: string,
    type: 'IMAGE' | 'VIDEO',
    media_url: '',
    upvotes: 0,
    categories: PostCategory[],
    created_at: '2024-08-04',
    created_by: User
}


export interface DesignerCategory {
    id: string,
    name: string
  }
  
  export interface Location {
    id: string,
    name: string
  }