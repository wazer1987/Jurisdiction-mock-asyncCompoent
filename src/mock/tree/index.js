import Mock from 'mockjs'
const Radom = Mock.Random
// const testdata = Mock.mock({
//   'data|1-10': [{ 'id|+1': 2, name: '@first' }]
// })
const testdata = []
for (let i = 0; i < 10; i++) {
  // 每个方法都可以传入参数 生成3-6个字或者别的什么具体查看文档
  testdata.push({ city: Radom.city(), name: Radom.cname(), title: Radom.csentence(3, 6) })
}
export default {
  getNodeTree: (config) => {
    console.log(config, '-----我是传递的参数')
    return {
      code: 200,
      data: [
        {
          label: '表单类',
          children: [{ label: '表单1', path: 'form/formone' },
            { label: '表单2', path: 'form/formtwo' }]
        },
        {
          label: '表格类',
          children: [{ label: '表格1', path: 'table/tableone' },
            { label: '表格2', path: 'table/tabletwo' }]
        }]
    }
  },
  gettestdata: () => {
    return testdata
  }
}
