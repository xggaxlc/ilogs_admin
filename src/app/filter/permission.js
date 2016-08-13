export function permission() {
  return function(val, condition = 'method') {
    if (condition.toLowerCase() === 'method') {
      switch (val.toLowerCase()) {
        case 'get':
          return '获取';
        case 'post':
          return '新增';
        case 'put':
          return '修改';
        case 'delete':
          return '删除';
      }
    } else if (condition.toLowerCase() === 'name') {
      switch (val.toLowerCase()) {
        case 'category':
          return '分类管理';
        case 'post':
          return '文章管理';
        case 'role':
          return '角色管理';
        case 'setting':
          return '站点设置';
        case 'user':
          return '用户管理';
      }
    }
  }
}