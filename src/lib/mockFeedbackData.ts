// lib/mockFeedbackData.ts
import type { Feedback } from '@/types/feedback'

export const mockFeedbacks: Feedback[] = [
  {
    id: 1,
    title: 'Add dark mode',
    description: 'It would be great to have a dark mode toggle.',
    category: 'Feature',
    status: 'Suggestion',
    upvotes: 34,
    comments: [
      {
        id: 1,
        content: 'Absolutely agree!',
        user: {
          name: 'Jane Doe',
          username: 'jane_d',
          avatarUrl: '/avatars/avatar1.png'
        }
      }
    ]
  },
  {
    id: 2,
    title: 'Improve mobile responsiveness',
    description: 'The layout breaks on smaller screens.',
    category: 'UI',
    status: 'Planned',
    upvotes: 21,
    comments: []
  },
  {
    id: 3,
    title: 'Allow users to sort feedback',
    description: 'Sorting by upvotes or comments would be useful.',
    category: 'Enhancement',
    status: 'Suggestion',
    upvotes: 55,
    comments: [
      {
        id: 2,
        content: 'Yes! Sorting by comments would be awesome.',
        user: {
          name: 'John Smith',
          username: 'john_smith',
          avatarUrl: '/avatars/avatar2.png'
        }
      }
    ]
  }
]
