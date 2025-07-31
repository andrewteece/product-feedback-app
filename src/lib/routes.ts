export const routes = {
  home: '/' as const,
  newFeedback: '/feedback/new' as const,
  feedbackDetail: (id: number | string) => `/feedback/${id}` as const,
  feedbackEdit: (id: number | string) => `/feedback/${id}/edit` as const,
  roadmap: '/roadmap' as const,
  suggestions: '/suggestions' as const,
};
