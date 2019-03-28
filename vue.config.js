
// const request = require('superagent');
// var bodyParser = require('body-parser');



module.exports = {
    configureWebpack: {
          devServer: {
			  proxy:{
				  "/api":{
				  	  target:"https://m.weibo.cn/",
				  	  pathRewrite:{"^/api":""},
				  	  changeOrigin:true
				  }

			  }
      }
}
}
