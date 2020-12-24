import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import bd from "../../db.json"

Vue.use(Vuex)

const store = new Vuex.Store({

	state: {
		dataFirst: bd.data,
		data: bd.data,
		isFormOpen: false,
		isFormAddOpen: false,
		editId: "",
		editIdArr: [],
		nameVector: "",
		colorValue: "#000000",
		nameStandart: "",
		colorStandart: "",
		isDiagramView: false,
		active: false,
		searchValue: "",
	},
	actions: {
	},


	mutations: {
		SEARCH: (state, data) => {
			state.searchValue = data
		},
		SET_DATA: (state) => {
			state.data = state.data.sort((a, b) => a.id - b.id)
		},
		updateTitle(state, title) {
			state.editIdArr[0].title = title
		},
		DIAGRAM_VIEW(state) {
			if (state.active && state.isFormOpen) {
				state.isFormOpen = false
				state.isDiagramView = !state.isDiagramView
			}
			else if (state.active && state.isDiagramView) {
				state.isDiagramView = !state.isDiagramView
				state.active = false
			}
			else if (state.active && state.isFormAddOpen) {
				state.isFormAddOpen = false
				state.isDiagramView = !state.isDiagramView
			}
			else {
				state.isDiagramView = !state.isDiagramView
				state.active = !state.active
			}
		},
		DELETE_ITEM: (state, id) => {
			state.isDiagramView = false
			state.data = [...state.data.filter(row => row.id !== id)]
		},
		EDIT_ITEM: (state, id) => {
			state.isDiagramView = false
			state.isFormOpen = !state.isFormOpen
			state.editId = id
			state.editIdArr = [...state.data.filter(item => item.id == id)]
			state.nameStandart = state.editIdArr[0].title
			state.colorStandart = state.editIdArr[0].color
			state.active = !state.active

		},
		CLOSE_FORM: (state) => {
			state.isDiagramView = false
			state.isFormOpen = !state.isFormOpen
			state.editIdArr[0].title = state.nameStandart
			state.editIdArr[0].color = state.colorStandart
			state.active = !state.active
		},
		CLOSE_ADD_FORM: (state) => {
			state.isDiagramView = false
			state.isFormAddOpen = !state.isFormAddOpen
			state.active = !state.active
		},
		ADD_ITEM: (state, name) => {
			state.isDiagramView = false
			state.data = [...state.data, {
				id: state.data[state.data.length - 1].id + 1,
				color: state.colorValue, title: name,
			}]
			state.isFormAddOpen = !state.isFormAddOpen
			state.active = !state.active
			state.colorValue = "#000000"

		},
		SAVE_ITEM: (state) => {
			state.isDiagramView = false
			state.isFormOpen = !state.isFormOpen
			state.nameStandart = ""
			state.active = !state.active
		},
		ADD_NEW_ITEM: (state) => {


			if (state.active && state.isFormOpen) {
				state.isFormOpen = false
				state.isFormAddOpen = !state.isFormAddOpen
			}
			else if (state.active && state.isFormAddOpen) {
				state.isFormAddOpen = !state.isFormAddOpen
				state.active = false
			}
			else if (state.active && state.isDiagramView) {
				state.isDiagramView = false
				state.isFormAddOpen = !state.isFormAddOpen

			}
			else {
				state.isFormAddOpen = !state.isFormAddOpen
				state.active = !state.active

			}

		},

	},

	getters: {
		DATA(state) {
			return state
		}
	}
})

export default store