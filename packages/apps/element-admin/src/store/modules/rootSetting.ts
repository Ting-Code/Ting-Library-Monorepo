import { defineStore } from 'pinia'
import { store } from '@/store'
import { useDark } from '@vueuse/core'
import { MenuSetting } from '@/setting/menu'
import { projectSetting, ProjectSetting } from '@/setting/project'
import { deepMerge } from '@common/utils'

interface RootSettingState {
  rootTheme: string // 主题
  projectConfig: ProjectSetting // 项目配置
}

export const useRootSettingStore = defineStore({
  id: 'app-root-setting',
  state: (): RootSettingState => ({
    rootTheme: 'light',
    projectConfig: projectSetting
  }),
  getters: {
    getRootTheme(): string {
      return this.rootTheme
    },
    getProjectConfig(): ProjectSetting {
      return this.projectConfig || ({} as ProjectSetting)
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting
    }
  },
  actions: {
    // 设置主题
    setRootTheme(value: string): void {
      const isDark = useDark()
      isDark.value = value === 'dark'
      this.rootTheme = value
    },
    setProjectConfig(config: DeepPartial<ProjectSetting>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config)
    }
  }
})

export function useRootSettingStoreWithOut() {
  return useRootSettingStore(store)
}
