import '@adonisjs/inertia/types'

import type React from 'react'
import type { Prettify } from '@adonisjs/core/types/common'

type ExtractProps<T> =
  T extends React.FC<infer Props>
    ? Prettify<Omit<Props, 'children'>>
    : T extends React.Component<infer Props>
      ? Prettify<Omit<Props, 'children'>>
      : never

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'chapters/archive': ExtractProps<(typeof import('../../inertia/pages/chapters/archive.tsx'))['default']>
    'chapters/edit': ExtractProps<(typeof import('../../inertia/pages/chapters/edit.tsx'))['default']>
    'chapters/index': ExtractProps<(typeof import('../../inertia/pages/chapters/index.tsx'))['default']>
    'chapters/select_level': ExtractProps<(typeof import('../../inertia/pages/chapters/select_level.tsx'))['default']>
    'dashboard/level_progress_summary': ExtractProps<(typeof import('../../inertia/pages/dashboard/level_progress_summary.tsx'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.tsx'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.tsx'))['default']>
    'home': ExtractProps<(typeof import('../../inertia/pages/home.tsx'))['default']>
    'organisation/classes/edit': ExtractProps<(typeof import('../../inertia/pages/organisation/classes/edit.tsx'))['default']>
    'organisation/classes/show': ExtractProps<(typeof import('../../inertia/pages/organisation/classes/show.tsx'))['default']>
    'organisation/levels/edit': ExtractProps<(typeof import('../../inertia/pages/organisation/levels/edit.tsx'))['default']>
    'organisation/levels/show': ExtractProps<(typeof import('../../inertia/pages/organisation/levels/show.tsx'))['default']>
    'planning/list_progressions': ExtractProps<(typeof import('../../inertia/pages/planning/list_progressions.tsx'))['default']>
    'planning/progression_view': ExtractProps<(typeof import('../../inertia/pages/planning/progression_view.tsx'))['default']>
    'teaching_content/show': ExtractProps<(typeof import('../../inertia/pages/teaching_content/show.tsx'))['default']>
    'themes/archive': ExtractProps<(typeof import('../../inertia/pages/themes/archive.tsx'))['default']>
    'themes/edit': ExtractProps<(typeof import('../../inertia/pages/themes/edit.tsx'))['default']>
    'themes/index': ExtractProps<(typeof import('../../inertia/pages/themes/index.tsx'))['default']>
    'themes/select_level': ExtractProps<(typeof import('../../inertia/pages/themes/select_level.tsx'))['default']>
    'work_files/no_work_file': ExtractProps<(typeof import('../../inertia/pages/work_files/no_work_file.tsx'))['default']>
  }
}
