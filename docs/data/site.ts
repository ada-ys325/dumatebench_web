export const site = {
  name: 'DuMateBench',
  tagline: 'Benchmarking AI Agents in Real-World Work Environments',
  description: 'A benchmark for evaluating AI agents across realistic tasks and environments.',
  domain: 'https://dumatebench.com',
  links: { github: 'https://github.com/baidubce/dumate-bench', paper: 'https://arxiv.org/abs/2608.26546', dataset: 'https://huggingface.co/datasets/Annihi/dumate_bench', contact: 'TBD' },
  nav: [
    { text: 'Home', link: '/' }, { text: 'Overview', link: '/overview' }, { text: 'Leaderboard', link: '/leaderboard' },
    { text: 'Paper', link: 'https://arxiv.org/abs/2608.26546' }, { text: 'Dataset', link: 'https://huggingface.co/datasets/Annihi/dumate_bench' },
    { text: 'Code', link: 'https://github.com/baidubce/dumate-bench' }
  ]
}
export const categories = [
  { name: 'Code', label: 'Code', description: 'Repository-scale implementation and maintenance tasks.', tone: 'purple' },
  { name: 'Web', label: 'Web', description: 'Tasks that require browsing, retrieval, and grounded action.', tone: 'blue' },
  { name: 'Office', label: 'Office', description: 'Document, spreadsheet, presentation, and productivity workflows.', tone: 'cyan' },
  { name: 'Security', label: 'Security', description: 'A future category for robust, safety-aware agent behavior.', tone: 'slate' }
]
