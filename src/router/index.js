import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../components/MainPage.vue'
import IntroPage from '../components/IntroPage.vue'
import ZangXiangPage from '../components/pages/ZangXiangPage.vue'
import DiagnosisPage from '../components/pages/DiagnosisPage.vue'
import HerbsMatrixPage from '../components/pages/HerbsMatrixPage.vue'
import SchoolsNetworkPage from '../components/pages/SchoolsNetworkPage.vue'
import AcupuncturePage from '../components/pages/acupuncture.vue'
import ZcyPage from '../components/pages/Data_zcy.vue'
import ZcySichuanPage from '../components/pages/ZcySichuan.vue'
import DataSichuanPage from '../components/pages/DataSichuan.vue'
import Data from '../components/pages/Data.vue'
import Panel1 from '../components/pages/Panel1.vue'
import Panel2 from '../components/pages/Panel2.vue'
import Panel3 from '../components/pages/Panel3.vue'
import Panel4 from '../components/pages/Panel4.vue'
import Test from '../components/pages/Test.vue'
import HistoryPage from '../components/pages/history.vue'

const routes = [
  {
    path: '/',
    name: 'Intro',
    component: IntroPage,
  },
  {
    path: '/Panel11',
    name: 'Panel1',
    component: Panel1,
  },
  {
    path: '/Panel22',
    name: 'Panel2',
    component: Panel2,
  },
  {
    path: '/Panel33',
    name: 'Panel3',
    component: Panel3,
  },
  {
    path: '/Panel44',
    name: 'Panel4',
    component: Panel4,
  },
  {
    path: '/main',
    name: 'Main',
    component: MainPage,
  },
  {
    path: '/zangxiang',
    name: 'ZangXiang',
    component: ZangXiangPage,
  },
  {
    path: '/diagnosis',
    name: 'Diagnosis',
    component: DiagnosisPage,
  },
  {
    path: '/herbs',
    name: 'HerbsMatrix',
    component: HerbsMatrixPage,
  },
  {
    path: '/schools',
    name: 'SchoolsNetwork',
    component: SchoolsNetworkPage,
  },
  {
    path: '/acupuncture',
    name: 'Acupuncture',
    component: AcupuncturePage,
  },
  {
    path: '/zcy',
    name: 'Zcy',
    component: ZcyPage,
  },
  {
    path: '/data-zcy',
    name: 'DataZcy',
    component: ZcyPage,
  },
  {
    path: '/zcy-sichuan',
    name: 'ZcySichuan',
    component: ZcySichuanPage,
  },
  {
    path: '/data',
    name: 'Data',
    component: Data,
  },
  {
    path: '/data-sichuan',
    name: 'DataSichuan',
    component: DataSichuanPage,
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
  },
  {
    path: '/history',
    name: 'History',
    component: HistoryPage,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 