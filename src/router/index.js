import Vue from 'vue'
import Router from 'vue-router'
import EventList from '@/Pages/BetslipTest'
import ArchitectTool from '@/Pages/ArchitectTool'

Vue.use(Router)

const router = new Router({
	mode: '',
	routes: [{
		path:'/',
		name:'Events',
		redirect:'/events'
	}, {
		path:'/events',
		name:'events',
		component: EventList,
		icon: 'fa-futbol',
		label: 'Betslip testing',
		render: true
	}, {
		path:'/architectTool',
		name:'architect tool',
		component: ArchitectTool,
		icon: 'fa-shapes',
		label: 'Architect Tool',
		render: true
	}
	]
})

export default router