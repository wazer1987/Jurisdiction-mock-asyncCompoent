import Mock from 'mockjs'
import treeNode from './tree'
Mock.mock(/\/gettreenode/, 'get', treeNode.getNodeTree)
Mock.mock(/\/gettestdata/, 'get', treeNode.gettestdata)
