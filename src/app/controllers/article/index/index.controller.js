export class ArticleIndexController {
  constructor($rootScope) {
    'ngInject';
    $rootScope.pageTitle = '文章列表';
    this.selected = [];

    this.posts = [
      {
        title: '我是标题',
        author: '作者',
        category: 'node.js',
        published: '未发布',
        create_at: '2016-9-1 10:10:20',
        update_at: '2016-9-1 10:10:20'
      },
      {
        title: '我是标题',
        author: '作者',
        category: 'node.js',
        published: '未发布',
        create_at: '2016-9-1 10:10:20',
        update_at: '2016-9-1 10:10:20'
      },
      {
        title: '我是标题',
        author: '作者',
        category: 'node.js',
        published: '未发布',
        create_at: '2016-9-1 10:10:20',
        update_at: '2016-9-1 10:10:20'
      },
      {
        title: '我是标题',
        author: '作者',
        category: 'node.js',
        published: '未发布',
        create_at: '2016-9-1 10:10:20',
        update_at: '2016-9-1 10:10:20'
      },
      {
        title: '我是标题',
        author: '作者',
        category: 'node.js',
        published: '未发布',
        create_at: '2016-9-1 10:10:20',
        update_at: '2016-9-1 10:10:20'
      },
      {
        title: '我是标题',
        author: '作者',
        category: 'node.js',
        published: '未发布',
        create_at: '2016-9-1 10:10:20',
        update_at: '2016-9-1 10:10:20'
      },
      {
        title: '我是标题',
        author: '作者',
        category: 'node.js',
        published: '未发布',
        create_at: '2016-9-1 10:10:20',
        update_at: '2016-9-1 10:10:20'
      }
    ]

    this.pageOptions = {
      count: 20,
      perPage: 10
    }

  }
}