# xiao-koa-mysql

   <a href="https://www.npmjs.com/package/xiao-koa-mysql">
    <img src="https://img.shields.io/npm/v/xiao-koa-mysql.svg">
  </a>



<a target="_blank" href="https://gitee.com/xuanxiaoqian/xiao-koa">XiaoKoa</a>快速开发系列之操作MySQL插件 

<hr />



## 安装

~~~sh
npm i xiao-koa-mysql
~~~



使用

`index.ts`

~~~ts
import { Application, xiaoKoaApp } from "xiao-koa";
import xiaoKoaMysql from "xiao-koa-mysql";

@Application
export default class TestApplication {
  main(app: xiaoKoaApp) {
    app.mount(xiaoKoaMysql);

    app.run(__dirname, 1234);
  }
}
~~~



`application.yml`

~~~yaml
...

mysql:
  connectionLimit: 10
  host: localhost
  user: root
  password: 123456
  database: test
~~~





`mapping.ts`

~~~ts
import { Mapping, Sql } from "xiao-koa-mysql";

@Mapping()
export class TestMapping {
  @Sql(`select * from user where id = #{id}`)
  findAll(id: number): any {}
}
~~~





## 装饰器

`@Mapping`

@Mapping(?alias)

被Mapping标识的类将会自动添加实例进入Service容器里



`@Sql`

@Sql("Sql语句")

被Sql标识的函数接收的参数将填入Sql语句占位符内`#{}`，并将查询出来的数据当做函数被调用时的返回值



## 疑问交流

QQ群: <a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=HlKQBtl0Z6aZIrJ7LdY2XEH7-whn5Cn9&jump_from=webapi&authKey=Nyq0s9BesdTQYHlMMz854uAYhjR3VvL2QEOUUF/51rzIETlh/43E5Yr8Eg53tWE4">xiao-koa(917968816)</a>