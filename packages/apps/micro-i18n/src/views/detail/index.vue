<template>
  <div class="i18n-detail">
    <header class="i18n-detail__header">
      <router-link class="i18n-detail__back" :to="{ name: 'i18n_list' }">
        ← 项目 · {{ namespace }}
      </router-link>
      <div class="i18n-detail__actions">
        <el-button
          link
          type="danger"
          class="i18n-detail__btn-delete-project"
          @click="onDeleteProject"
        >
          删除项目
        </el-button>
        <el-button class="i18n-detail__btn-reset" @click="onReset">重置</el-button>
        <el-button type="primary" class="i18n-detail__btn-export" @click="onExport">导出</el-button>
      </div>
    </header>

    <div class="i18n-detail__main">
      <aside class="i18n-detail__tree">
        <div class="i18n-detail__tree-head">
          <span class="i18n-detail__tree-title">词条树</span>
          <el-button link type="primary" class="i18n-detail__tree-add-group" @click="onAddGroup">
            ＋ 添加词条组
          </el-button>
        </div>
        <p class="i18n-detail__tree-hint">
          顶部添加词条组 · 组旁 ＋ 加子词条 · 复制/删除 · 右侧编辑各语言
        </p>
        <div class="i18n-detail__tree-body">
          <section v-for="group in treeGroups" :key="group.key" class="i18n-detail__group">
            <div class="i18n-detail__group-row">
              <button
                type="button"
                class="i18n-detail__group-label"
                @click="toggleGroup(group.key)"
              >
                {{ expanded[group.key] ? '▾' : '▸' }} {{ group.key }}
              </button>
              <div class="i18n-detail__group-actions">
                <el-button
                  link
                  type="danger"
                  class="i18n-detail__group-delete"
                  title="删除词条组"
                  @click.stop="onDeleteGroup(group.key)"
                >
                  删除
                </el-button>
                <el-button
                  link
                  type="primary"
                  class="i18n-detail__group-add-leaf"
                  title="添加子词条"
                  @click.stop="onAddLeaf(group.key)"
                >
                  ＋
                </el-button>
              </div>
            </div>
            <ul v-show="expanded[group.key]" class="i18n-detail__leaves">
              <li
                v-for="leaf in group.leaves"
                :key="leaf.path"
                class="i18n-detail__leaf"
                :class="{ 'is-active': selectedPath === leaf.path }"
              >
                <button
                  type="button"
                  class="i18n-detail__leaf-label"
                  @click="selectLeaf(leaf.path)"
                >
                  {{ leaf.key }}
                </button>
                <div class="i18n-detail__leaf-actions">
                  <el-button
                    link
                    type="primary"
                    class="i18n-detail__leaf-copy"
                    @click.stop="onCopyPath(leaf.path)"
                  >
                    复制
                  </el-button>
                  <el-button
                    link
                    type="danger"
                    class="i18n-detail__leaf-delete"
                    @click.stop="onDeleteLeaf(group.key, leaf.key, leaf.path)"
                  >
                    删除
                  </el-button>
                </div>
              </li>
            </ul>
          </section>
          <p v-if="!treeGroups.length" class="i18n-detail__empty"
            >暂无词条组，请点击「添加词条组」</p
          >
        </div>
      </aside>

      <section class="i18n-detail__editor">
        <div class="i18n-detail__editor-head">
          <span class="i18n-detail__editor-title">
            {{ selectedPath ? `编辑 · ${selectedPath}` : '请选择词条' }}
          </span>
        </div>
        <div v-if="selectedPath" class="i18n-detail__editor-body">
          <div v-for="locale in locales" :key="locale" class="i18n-detail__field">
            <label class="i18n-detail__field-label">{{ locale }}</label>
            <el-input
              :model-value="getLocaleValue(locale)"
              class="i18n-detail__field-input"
              @update:model-value="(v) => setLocaleValue(locale, String(v ?? ''))"
            />
          </div>
        </div>
        <p v-else class="i18n-detail__editor-placeholder">在左侧选择子词条后编辑各语言文案</p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, reactive, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { supportedLocales } from '@tingcode/i18n'
  import {
    clearNamespaceLocalesOverride,
    hasNamespace,
    loadNamespaceLocales,
    removeProject,
    saveNamespaceLocales
  } from '@/utils/locale-files'
  import { downloadNamespaceLocales } from '@/utils/locale-export'
  import {
    addTreeGroup,
    addTreeLeaf,
    buildTreeGroups,
    getByPath,
    removeTreeGroup,
    removeTreeLeaf,
    setByPath
  } from '@/utils/locale-tree'

  const route = useRoute()
  const router = useRouter()
  const namespace = computed(() => String(route.params.namespace ?? ''))
  const locales = [...supportedLocales]

  const localeData = ref<Record<string, Record<string, unknown>>>({})
  const selectedPath = ref('')
  const expanded = reactive<Record<string, boolean>>({})

  const treeGroups = computed(() => {
    const primary = localeData.value['zh-CN'] ?? localeData.value[locales[0]] ?? {}
    return buildTreeGroups(primary)
  })

  function syncSelection() {
    const groups = buildTreeGroups(localeData.value['zh-CN'] ?? {})
    const paths = groups.flatMap((g) => g.leaves.map((l) => l.path))
    if (!selectedPath.value || !paths.includes(selectedPath.value)) {
      selectedPath.value = paths[0] ?? ''
    }
  }

  function loadProject() {
    const ns = namespace.value
    if (!ns || !hasNamespace(ns)) {
      ElMessage.warning('项目不存在')
      router.replace({ name: 'i18n_list' })
      return
    }
    localeData.value = loadNamespaceLocales(ns)
    const groups = buildTreeGroups(localeData.value['zh-CN'] ?? {})
    for (const g of groups) {
      if (expanded[g.key] === undefined) expanded[g.key] = true
    }
    syncSelection()
  }

  watch(namespace, loadProject, { immediate: true })

  function toggleGroup(key: string) {
    expanded[key] = !expanded[key]
  }

  function selectLeaf(path: string) {
    selectedPath.value = path
  }

  function getLocaleValue(locale: string): string {
    const path = selectedPath.value
    if (!path) return ''
    const value = getByPath(localeData.value[locale] ?? {}, path)
    return value === undefined || value === null ? '' : String(value)
  }

  function setLocaleValue(locale: string, value: string) {
    const path = selectedPath.value
    if (!path) return
    if (!localeData.value[locale]) localeData.value[locale] = {}
    setByPath(localeData.value[locale], path, value)
  }

  async function onAddGroup() {
    try {
      const { value } = await ElMessageBox.prompt('请输入词条组名称', '添加词条组', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[a-zA-Z][a-zA-Z0-9_-]*$/,
        inputErrorMessage: '以字母开头，仅支持字母、数字、下划线与连字符'
      })
      const key = value.trim()
      if (!key) return
      const primary = localeData.value['zh-CN'] ?? {}
      if (key in primary && typeof primary[key] === 'object') {
        ElMessage.warning('词条组已存在')
        return
      }
      addTreeGroup(localeData.value, key)
      expanded[key] = true
      ElMessage.success('已添加词条组')
    } catch {
      /* cancelled */
    }
  }

  async function onAddLeaf(groupKey: string) {
    try {
      const { value } = await ElMessageBox.prompt('请输入子词条 key', '添加子词条', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[a-zA-Z][a-zA-Z0-9_-]*$/,
        inputErrorMessage: '以字母开头，仅支持字母、数字、下划线与连字符'
      })
      const leafKey = value.trim()
      if (!leafKey) return
      const group = localeData.value['zh-CN']?.[groupKey]
      if (group && typeof group === 'object' && !Array.isArray(group) && leafKey in group) {
        ElMessage.warning('子词条已存在')
        return
      }
      addTreeLeaf(localeData.value, groupKey, leafKey)
      selectedPath.value = `${groupKey}.${leafKey}`
      ElMessage.success('已添加子词条')
    } catch {
      /* cancelled */
    }
  }

  async function onCopyPath(path: string) {
    const text = `${namespace.value}.${path}`
    try {
      await navigator.clipboard.writeText(text)
      ElMessage.success('已复制词条路径')
    } catch {
      ElMessage.info(text)
    }
  }

  function onReset() {
    clearNamespaceLocalesOverride(namespace.value)
    loadProject()
    ElMessage.success('已恢复为初始内容')
  }

  function onExport() {
    const ns = namespace.value
    const data = localeData.value
    saveNamespaceLocales(ns, data)
    downloadNamespaceLocales(ns, data)
    ElMessage.success(
      '已导出 JSON，请放入 packages/lib/i18n/locales/{语言}/' + ns + '.json 后提交 Git'
    )
  }

  async function onDeleteProject() {
    const ns = namespace.value
    try {
      await ElMessageBox.confirm(
        `确定删除项目「${ns}」？已落盘项目还需手动删除仓库中的 JSON 文件。`,
        '删除项目',
        { type: 'warning', confirmButtonText: '删除', cancelButtonText: '取消' }
      )
    } catch {
      return
    }
    const { needManualFileDelete } = removeProject(ns)
    ElMessage.success(
      needManualFileDelete ? '已删除，请手动删除 locales 目录下对应 JSON 并提交 Git' : '已删除项目'
    )
    router.replace({ name: 'i18n_list' })
  }

  async function onDeleteGroup(groupKey: string) {
    try {
      await ElMessageBox.confirm(`确定删除词条组「${groupKey}」及其下所有子词条？`, '删除词条组', {
        type: 'warning',
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
    } catch {
      return
    }
    removeTreeGroup(localeData.value, groupKey)
    delete expanded[groupKey]
    saveNamespaceLocales(namespace.value, localeData.value)
    syncSelection()
    ElMessage.success('已删除词条组')
  }

  async function onDeleteLeaf(groupKey: string, leafKey: string, path: string) {
    try {
      await ElMessageBox.confirm(`确定删除子词条「${leafKey}」？`, '删除子词条', {
        type: 'warning',
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
    } catch {
      return
    }
    removeTreeLeaf(localeData.value, groupKey, leafKey)
    if (selectedPath.value === path) selectedPath.value = ''
    saveNamespaceLocales(namespace.value, localeData.value)
    syncSelection()
    ElMessage.success('已删除子词条')
  }
</script>

<style scoped lang="scss">
  .i18n-detail {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    padding: 20px 24px 24px;
    box-sizing: border-box;
    background: v('page-bg');
    color: v('text');

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      gap: 16px;
    }

    &__back {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      color: v('text-title');
      text-decoration: none;

      &:hover {
        color: v('primary');
      }
    }

    &__actions {
      display: flex;
      gap: 8px;
      flex-shrink: 0;
    }

    &__btn-delete-project {
      padding: 0 4px;
      font-size: 14px;
      height: auto;
    }

    &__btn-reset,
    &__btn-export {
      min-height: 36px;
      min-width: 72px;
      border-radius: 4px;
    }

    &__btn-reset {
      background: v('panel-bg');
      border-color: v('border');
      color: v('text');
    }

    &__btn-export {
      font-weight: 600;
    }

    &__main {
      display: flex;
      gap: 16px;
      flex: 1;
      min-height: 0;
    }

    &__tree,
    &__editor {
      display: flex;
      flex-direction: column;
      background: v('panel-bg');
      border: 1px solid v('border');
      border-radius: v('radius');
      overflow: hidden;
      min-height: 520px;
    }

    &__tree {
      width: 360px;
      flex-shrink: 0;
    }

    &__editor {
      flex: 1;
      min-width: 0;
    }

    &__tree-head,
    &__editor-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 44px;
      padding: 0 16px;
      background: v('header-bg');
      border-bottom: 1px solid v('border');
      flex-shrink: 0;
    }

    &__tree-title,
    &__editor-title {
      font-size: 13px;
      font-weight: 600;
      color: v('text-secondary');
    }

    &__editor-title {
      color: v('text-title');
    }

    &__tree-add-group {
      padding: 0;
      font-size: 12px;
      height: auto;
    }

    &__tree-hint {
      margin: 0;
      padding: 12px 16px 8px;
      font-size: 11px;
      color: v('text-secondary');
      line-height: 1.4;
      flex-shrink: 0;
    }

    &__tree-body {
      flex: 1;
      overflow: auto;
      padding: 4px 8px 16px;
    }

    &__group {
      margin-bottom: 4px;
    }

    &__group-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 36px;
      padding: 0 8px 0 12px;
      border-radius: 4px;
      background: v('header-bg');
    }

    &__group-label {
      flex: 1;
      margin: 0;
      padding: 0;
      border: none;
      background: none;
      text-align: left;
      font-size: 14px;
      font-weight: 600;
      color: v('text');
      cursor: pointer;
    }

    &__group-actions {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
    }

    &__group-delete {
      padding: 0 4px;
      font-size: 12px;
      height: auto;
    }

    &__group-add-leaf {
      width: 24px;
      height: 24px;
      min-height: 24px;
      padding: 0;
      font-size: 13px;
      font-weight: 600;
      border: 1px solid v('primary');
      border-radius: 4px;
      background: v('input-bg');
    }

    &__leaves {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    &__leaf {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 36px;
      padding: 0 8px 0 24px;
      border-radius: 4px;

      &.is-active {
        background: v('row-stripe-bg');

        .i18n-detail__leaf-label {
          color: v('primary');
          font-weight: 600;
        }
      }
    }

    &__leaf-label {
      flex: 1;
      margin: 0;
      padding: 0;
      border: none;
      background: none;
      text-align: left;
      font-size: 13px;
      color: v('text-secondary');
      cursor: pointer;

      &:hover {
        color: v('primary');
      }
    }

    &__leaf-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    &__leaf-copy,
    &__leaf-delete {
      padding: 0;
      font-size: 12px;
      height: auto;
    }

    &__empty,
    &__editor-placeholder {
      margin: 16px;
      font-size: 13px;
      color: v('text-secondary');
    }

    &__editor-body {
      padding: 20px 16px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    &__field {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    &__field-label {
      width: 56px;
      flex-shrink: 0;
      font-size: 13px;
      font-weight: 600;
      color: v('text-secondary');
    }

    &__field-input {
      flex: 1;

      :deep(.el-input__wrapper) {
        min-height: 36px;
        background-color: v('input-bg');
        border-radius: 4px;
        box-shadow: 0 0 0 1px v('border') inset;
      }

      :deep(.el-input__inner) {
        color: v('text');
        font-size: 14px;
      }
    }
  }
</style>
