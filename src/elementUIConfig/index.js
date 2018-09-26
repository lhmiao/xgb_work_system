import Vue from 'vue'
import {
  Container,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  Icon,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Dialog,
  Input,
  Checkbox,
  Select,
  Option,
  Button,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Loading,
  Message,
  MessageBox
} from 'element-ui'

Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Icon)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Loading.directive)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
