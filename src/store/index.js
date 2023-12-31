import { createStore } from 'vuex'
import axios from "axios";

export const store = createStore({
  state: {
    data: [],
    activeBlock: 0,
    activeUser: {},
    valueSearch: ''
  },
  getters: {
    getData(state) {
      return state.data
    },
    getActiveBlock(state) {
      return state.activeBlock
    },
    getActiveUser(state) {
      return state.activeUser
    },
    getValueSearch(state) {
      return state.valueSearch
    },
  },
  mutations: {
    setData(state, data) {
      if (data.length != 0) {
        state.activeBlock = 3
        state.data = data.flat(Infinity)
      } else {
        state.activeBlock = 1
      }
      state.activeUser = {}
    },
    setActiveBlock(state, activeBlock) {
      state.activeBlock = activeBlock
    },
    setActiveUser(state, user) {
      state.activeUser = user
    },
    setValueSearch(state, valueSearch) {
      state.valueSearch = valueSearch
    },
  },
  actions: {
    setData({ commit }, value) {
      commit("setActiveBlock", 2)
      commit("setValueSearch", value)
      const data = []
      //удаление повторяющихся элементов
      const valueArray = value.replaceAll(" ", "").split(",");
      const userNamesOrId = valueArray.filter((item, pos) => {
        return valueArray.indexOf(item) == pos
      })
      axios.get("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
          //отбор людей согласно пришедшего отбора
          userNamesOrId.forEach((userNameOrId) => {
            const element = res.data.filter((elem) => {
              return elem.username == userNameOrId || elem.id == userNameOrId;
            });
            if (element.length != 0) {
              data.push(element);
            }
          });
          commit("setData", data)
        })
    },
    setActiveUser({ commit }, user) {
      commit("setActiveUser", user)
    },
  }
})
