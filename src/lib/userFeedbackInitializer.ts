import { Feedback, Status } from '@/types/feedback';

const normalizeStatus = (value: string): Status => {
  const statuses: Status[] = ['suggestion', 'planned', 'in-progress', 'live'];
  return statuses.includes(value as Status) ? (value as Status) : 'suggestion';
};

export const userFeedback: Feedback[] = [
  {
    id: 1,
    title: 'Add tags for solutions',
    category: 'enhancement',
    upvotes: 112,
    status: normalizeStatus('suggestion'),
    description: 'Easier to search for solutions based on a specific stack.',
    comments: [
      {
        id: 1,
        content:
          'Awesome idea! Trying to find framework-specific projects within the hubs can be tedious',
        user: {
          image: '/assets/user-images/image-suzanne.jpg',
          name: 'Suzanne Chang',
          username: 'upbeat1811',
        },
      },
      {
        id: 2,
        content:
          'Please use fun, color-coded labels to easily identify them at a glance',
        user: {
          image: '/assets/user-images/image-thomas.jpg',
          name: 'Thomas Hood',
          username: 'brawnybrave',
        },
      },
    ],
    upvoted: false,
  },
  {
    id: 2,
    title: 'Add a dark theme option',
    category: 'feature',
    upvotes: 99,
    status: normalizeStatus('suggestion'),
    description:
      'It would help people with light sensitivities and who prefer dark mode.',
    comments: [
      {
        id: 3,
        content:
          'Also, please allow styles to be applied based on system preferences...',
        user: {
          image: '/assets/user-images/image-elijah.jpg',
          name: 'Elijah Moss',
          username: 'hexagon.bestagon',
        },
      },
      {
        id: 4,
        content: 'Second this! I do a lot of late night coding and reading...',
        user: {
          image: '/assets/user-images/image-james.jpg',
          name: 'James Skinner',
          username: 'hummingbird1',
        },
        replies: [
          {
            id: 1000,
            content:
              'While waiting for dark mode, there are browser extensions that will also do the job.',
            replyingTo: 'hummingbird1',
            user: {
              image: '/assets/user-images/image-anne.jpg',
              name: 'Anne Valentine',
              username: 'annev1990',
            },
          },
        ],
      },
    ],
    upvoted: false,
  },
  {
    id: 7,
    title: 'More comprehensive reports',
    category: 'feature',
    upvotes: 123,
    status: normalizeStatus('planned'),
    description:
      'It would be great to see a more detailed breakdown of solutions.',
    comments: [
      {
        id: 10,
        content: 'This would be awesome! It would be so helpful...',
        user: {
          image: '/assets/user-images/image-victoria.jpg',
          name: 'Victoria Mejia',
          username: 'arlen_the_marlin',
        },
      },
    ],
    upvoted: false,
  },
  {
    id: 9,
    title: 'One-click portfolio generation',
    category: 'feature',
    upvotes: 62,
    status: normalizeStatus('in-progress'),
    description:
      'Add ability to create professional looking portfolio from profile.',
    comments: [
      {
        id: 13,
        content:
          "I haven't built a portfolio site yet, so this would be really helpful.",
        user: {
          image: '/assets/user-images/image-ryan.jpg',
          name: 'Ryan Welles',
          username: 'voyager.344',
        },
      },
    ],
    upvoted: false,
  },
  {
    id: 12,
    title: 'Add micro-interactions',
    category: 'enhancement',
    upvotes: 71,
    status: normalizeStatus('live'),
    description: 'Small animations at specific points can add delight.',
    comments: [
      {
        id: 15,
        content: "I'd love to see this! It always makes me so happy...",
        user: {
          image: '/assets/user-images/image-victoria.jpg',
          name: 'Victoria Mejia',
          username: 'arlen_the_marlin',
        },
        replies: [
          {
            id: 1003,
            content: 'Me too! Celebrations at specific points would be great!',
            replyingTo: 'arlen_the_marlin',
            user: {
              image: '/assets/user-images/image-suzanne.jpg',
              name: 'Suzanne Chang',
              username: 'upbeat1811',
            },
          },
        ],
      },
    ],
    upvoted: false,
  },
];
