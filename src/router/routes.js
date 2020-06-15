export default [
  {
    path: '/',
    component: () => import('@/views/dashboard/Index'),
    children: [
      {
        name: 'User',
        path: 'user',
        component: () => import('@/views/user/Index')
      },
      {
        name: 'Article',
        path: 'article',
        component: () => import('@/views/article/Index')
      }
    ]
  },
  {
    name: 'Edit',
    path: '/edit',
    component: () => import('@/views/article/Edit')
  },
  {
    name: 'SignIn',
    path: '/signin',
    component: () => import('@/views/sign/SignIn')
  },
  {
    name: 'SignUp',
    path: '/signup',
    component: () => import('@/views/sign/SignUp')
  }
]
