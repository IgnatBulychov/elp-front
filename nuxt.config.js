module.exports = {

    head: {
      title: 'ELP',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '{{escape description }}' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/elp.ico' }
      ]
    },

    loading: { color: '#3B8070' },
  
    
    buildModules: [
      '@nuxtjs/axios',
      ['@nuxtjs/vuetify', {  
        icons: {
          iconfont: 'mdi', 
        },
      }]
    ],
   
    axios: {
      baseURL: 'http://elp-back.qq' ,
    }
}