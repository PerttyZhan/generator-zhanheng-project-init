import type { App } from "vue";
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElDialog,
  ElRow,
  ElCol,
  ElMessage,

  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElTabPane,
  ElTabs
} from 'element-plus'
import 'element-plus/dist/index.css'

export default (Vue: App) => {
  Vue.component(ElButton.name, ElButton)
  Vue.component(ElForm.name, ElForm)
  Vue.component(ElFormItem.name, ElFormItem)
  Vue.component(ElInput.name, ElInput)
  Vue.component(ElSelect.name, ElSelect)
  Vue.component(ElOption.name, ElOption)
  Vue.component(ElDropdown.name, ElDropdown)
  Vue.component(ElDropdownMenu.name, ElDropdownMenu)
  Vue.component(ElDropdownItem.name, ElDropdownItem)
  Vue.component(ElDialog.name, ElDialog)
  Vue.component(ElRow.name, ElRow)
  Vue.component(ElCol.name, ElCol)

  Vue.component(ElMenu.name, ElMenu)
  Vue.component(ElSubMenu.name, ElSubMenu)
  Vue.component(ElMenuItem.name, ElMenuItem)
  Vue.component(ElMenuItemGroup.name, ElMenuItemGroup)

  Vue.component(ElBreadcrumb.name, ElBreadcrumb)
  Vue.component(ElBreadcrumbItem.name, ElBreadcrumbItem)

  Vue.component(ElTable.name, ElTable)
  Vue.component(ElTableColumn.name, ElTableColumn)

  Vue.component(ElContainer.name, ElContainer)
  Vue.component(ElAside.name, ElAside)
  Vue.component(ElHeader.name, ElHeader)
  Vue.component(ElMain.name, ElMain)

  Vue.component(ElTabs.name, ElTabs)
  Vue.component(ElTabPane.name, ElTabPane)

  Vue.config.globalProperties.$message = ElMessage
}