const getters = {
  email: state => state.user.email,
  nickname: state => state.user.nickname,
  roles: state => state.user.roles,
  sidebar: state => {
    const sidebar = []
    state.user.sidebar.forEach(item => {
      if (item.children) {
        item.children.forEach(res => {
          sidebar.push({ title: res.title, path: res.path })
        })
      }
    })
    console.log(sidebar)
    return sidebar
  }
}
export default getters
