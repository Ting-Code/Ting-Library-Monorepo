<template>
  <div class="i18n-list">
    <header class="i18n-list__header">
      <h1 class="i18n-list__title">✏️ 文案编辑</h1>
      <a class="i18n-list__docs" href="/docs/system/i18n" target="_top">🌐 国际化说明</a>
    </header>

    <div class="i18n-list__toolbar">
      <el-input v-model="keyword" class="i18n-list__search" clearable placeholder="搜索项目" />
      <el-button type="primary" @click="dialogVisible = true">＋ 新建项目</el-button>
    </div>

    <div class="i18n-list__table-wrap">
      <el-table :data="filteredProjects" stripe @row-click="onRowClick">
        <el-table-column label="项目" min-width="180">
          <template #default="{ row }">
            <span class="i18n-list__project-name">{{ row.namespace }}</span>
            <el-tag v-if="row.draft" class="i18n-list__draft-tag" size="small" type="warning">
              未落盘
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="语言包文件" min-width="360" show-overflow-tooltip>
          <template #default="{ row }">
            <span class="i18n-list__files">{{ row.files.join(' · ') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="词条数" prop="entryCount" width="100" align="center" />
        <el-table-column label="操作" width="100" align="center">
          <template #default="{ row }">
            <el-button link type="primary" @click.stop="goDetail(row.namespace)">进入</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog v-model="dialogVisible" title="新建项目" width="440px" @closed="resetDialog">
      <el-form label-width="72px" @submit.prevent="submitNewProject">
        <el-form-item label="项目名称">
          <el-input
            v-model="newNamespace"
            placeholder="如 common、user"
            maxlength="32"
            @keyup.enter="submitNewProject"
          />
        </el-form-item>
        <p class="i18n-list__dialog-hint">→ 各语言目录新增 {语言}/{项目}.json</p>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitNewProject">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'
  import { addDraftProject, loadI18nProjects } from '@/utils/locale-files'

  const router = useRouter()
  const keyword = ref('')
  const projects = ref(loadI18nProjects())
  const dialogVisible = ref(false)
  const newNamespace = ref('')

  const filteredProjects = computed(() => {
    const q = keyword.value.trim().toLowerCase()
    if (!q) return projects.value
    return projects.value.filter((row) => row.namespace.toLowerCase().includes(q))
  })

  function refreshProjects() {
    projects.value = loadI18nProjects()
  }

  function goDetail(namespace: string) {
    router.push({ name: 'i18n_list_detail', params: { namespace } })
  }

  function onRowClick(row: { namespace: string }) {
    goDetail(row.namespace)
  }

  function resetDialog() {
    newNamespace.value = ''
  }

  function submitNewProject() {
    const name = newNamespace.value.trim()
    if (!name) {
      ElMessage.warning('请输入项目名称')
      return
    }
    if (!/^[a-z][a-z0-9_-]*$/i.test(name)) {
      ElMessage.warning('项目名称仅支持字母、数字、下划线与连字符，且以字母开头')
      return
    }
    if (projects.value.some((p) => p.namespace === name)) {
      ElMessage.warning('项目已存在')
      return
    }
    if (!addDraftProject(name)) {
      ElMessage.warning('无法创建项目')
      return
    }
    refreshProjects()
    dialogVisible.value = false
    ElMessage.success('已创建草稿项目')
    goDetail(name)
  }
</script>

<style scoped lang="scss">
  .i18n-list {
    min-height: 100%;
    padding: 20px 24px 32px;
    box-sizing: border-box;
    background: v('page-bg');
    color: v('text');

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    &__title {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      color: v('text-title');
    }

    &__docs {
      font-size: 14px;
      color: v('primary');
      text-decoration: none;

      &:hover {
        opacity: 0.85;
      }
    }

    &__toolbar {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
    }

    &__search {
      flex: 1;
      max-width: 860px;
    }

    &__table-wrap {
      padding: 0;
      background: v('panel-bg');
      border: 1px solid v('border');
      border-radius: v('radius');
      overflow: hidden;

      :deep(.el-table) {
        --el-table-bg-color: #{v('panel-bg')};
        --el-table-tr-bg-color: #{v('panel-bg')};
        --el-table-header-bg-color: #{v('header-bg')};
        --el-table-row-hover-bg-color: #{v('row-stripe-bg')};
        --el-table-border-color: #{v('border')};
        --el-table-text-color: #{v('text')};
        --el-table-header-text-color: #{v('text-secondary')};
        --el-fill-color-lighter: #{v('row-stripe-bg')};
      }

      :deep(.el-table__row) {
        cursor: pointer;
      }
    }

    &__project-name {
      font-weight: 600;
      margin-right: 8px;
    }

    &__draft-tag {
      vertical-align: middle;
    }

    &__files {
      font-size: 12px;
      color: v('text-secondary');
    }

    &__dialog-hint {
      margin: 0;
      padding-left: 72px;
      font-size: 11px;
      color: v('text-secondary');
    }
  }
</style>
