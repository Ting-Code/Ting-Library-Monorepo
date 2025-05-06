# 📋计算机网络基础

## OSI七层和TCP/IP四层

OSI引入了服务、接口、协议、分层的概念，TCP/IP借鉴了OSI的这些概念建立TCP/IP模型。  
OSI先有模型，后有协议，先有标准，后进行实践；而TCP/IP则相反，先有协议和应用再提出了模型，且是参照的OSI模型。  
OSI是一种理论下的模型，而TCP/IP已被广泛使用，成为网络互联事实上的标准。

- TCP：transmission control protocol 传输控制协议
- UDP：user data protocol 用户数据报协议

| OSI七层网络模型         | TCP/IP四层概念模型 | 对应网络协议                            |
| ----------------------- | ------------------ | --------------------------------------- |
| 应用层（Application）   | 应用层             | HTTP、TFTP, FTP, NFS, WAIS、SMTP        |
| 表示层（Presentation）  | 应用层             | Telnet, Rlogin, SNMP, Gopher            |
| 会话层（Session）       | 应用层             | SMTP, DNS                               |
| 传输层（Transport）     | 传输层             | TCP, UDP                                |
| 网络层（Network）       | 网络层             | IP, ICMP, ARP, RARP, AKP, UUCP          |
| 数据链路层（Data Link） | 数据链路层         | FDDI, Ethernet, Arpanet, PDN, SLIP, PPP |
| 物理层（Physical）      | 数据链路层         | IEEE 802.1A, IEEE 802.2到IEEE 802.11    |

## IP协议 (Internet Protocal)

- IP主要为了定位设备，每台设备都有独立的IP。
- IP地址分为五类，A,B,C,D,E。各类容纳的地址数目从多到少。
- 一个地址数目就代表一台计算机，
- 默认的子网掩码就表示了能容纳的计算机的数量；
- A类一千万台，B类6万多台，C类254台；
- IP又分内网和外网IP，我们的设备都有一个内网IP，通过路由器和外网连接。路由器有一个外网IP，同时也有一个内网IP，路由器会给内网中的设备分配不同的内网IP。

内网中常见的三种IP是：

```plain
10.0.0.0 到 10.255.255.255
172.16.0.0 到 172.31.255.255
192.168.0.0 到 192.168.255.255
```

上面的所有IP，公网是绝对不会使用的；

特殊的IP

```plain
127.0.0.1和localhsot表示本地
0.0.0.0不代表任何设备
```

protocol命令可看IP地址

```plain
protocol
```

## TCP和UDP协议

TCP/IP协议是一个协议簇。里面包括很多协议的，UDP只是其中的一个， 之所以命名为TCP/IP协议，因为TCP、IP协议是两个很重要的协议，就用他两命名了。

### TCP和UDP的区别

| TCP | UDP |
| :-: | :-: |
| 面向连接的、可靠的字节流服务 | 缺乏可靠性、非连接 |
| 校验和，确认和重传机制来保证可靠传输 | 不保证各个数据报的先后顺序，也不保证每个数据报只到达一次，不保证数据报会到达其最终目的地 |
| 字节流协议，没有任何（协议上的）记录边界 | 数据报有长度，数据报的长度将随数据一起传递给接收方 |
| 仅有两方进行彼此通信，广播和多播不能用于 TCP | 支持广播和多播 |

**注意**：TCP 并不能保证数据一定会被对方接收到，因为这是不可能的。TCP 能够做到的是，如果有可能，就把数据递送到接收方，否则就（通过放弃重传并且中断连接这一手段）通知用户。因此准确说 TCP 也不是 100% 可靠的协议，它所能提供的是数据的可靠递送或故障的可靠通知。

### TCP报文格式

- ACK ： TCP协议规定，只有ACK=1时有效，也规定连接建立后所有发送的报文的ACK必须为1。
- SYN(SYNchronization) ： 在连接建立时用来同步序号。当SYN=1而ACK=0时，表明这是一个连接请求报文。对方若同意建立连接，则应在响应报文中使SYN=1和ACK=1. 因此, SYN置1就表示这是一个连接请求或连接接受报文。
- FIN （finis）即完，终结的意思， 用来释放一个连接。当 FIN = 1 时，表明此报文段的发送方的数据已经发送完毕，并要求释放连接。

### TCP三次握手四次挥手

**TCP建立连接要进行3次握手**

- 第一次握手 **(SYN=1, seq=x)**：主机A通过向主机B 发送一个含有同步序列号的标志位的数据段给主机B，向主机B 请求建立连接，通过这个数据段， 主机A告诉主机B 两件事：我想要和你通信；你可以用哪个序列号作为起始数据段来回应我。
- 第二次握手 **(SYN=1, ACK=1, seq=y, ACKnum=x+1)**：主机B 收到主机A的请求后，用一个带有确认应答（ACK）和同步序列号（SYN）标志位的数据段响应主机A，也告诉主机A两件事：我已经收到你的请求了，你可以传输数据了；你要用那个序列号作为起始数据段来回应我
- 第三次握手 **(ACK=1，ACKnum=y+1)**：主机A收到这个数据段后，再发送一个确认应答，确认已收到主机B 的数据段："我已收到回复，我现在要开始传输实际数据了，这样3次握手就完成了，主机A和主机B 就可以传输数据了。

**3次握手的特点**

没有应用层的数据 ,SYN这个标志位只有在TCP建立连接时才会被置1 ,握手完成后SYN标志位被置0。

**TCP建立连接要进行3次握手，而断开连接要进行4次挥手**

- 第一次 **(FIN=1，seq=x)**： 当主机A完成数据传输后,将控制位FIN置1，提出停止TCP连接的请求
- 第二次 **(ACK=1，ACKnum=x+1)**： 主机B收到FIN后对其作出响应，确认这一方向上的TCP连接将关闭,将ACK置1
- 第三次 **(FIN=1，seq=y)**： 由B 端再提出反方向的关闭请求,将FIN置1
- 第四次 **(ACK=1，ACKnum=y+1)**： 主机A对主机B的请求进行确认，将ACK置1，双方向的关闭结束.

由TCP的三次握手和四次断开可以看出，TCP使用面向连接的通信方式， 大大提高了数据通信的可靠性，使发送数据端和接收端在数据正式传输前就有了交互， 为数据正式传输打下了可靠的基础

### 常见问题

**应用层协议vs传输层协议有什么区别**

HTTP（应用层）和TCP（传输层）关系

- 应用层： 更关注传输内容的加密与解密
- 传输层： 主要用来确保通信能正常传输，如TCP三次握手就是确保建立稳定链接

**为什么挥手要四步**

- 这是因为服务端的 LISTEN 状态下的 SOCKET 当收到客户端建立连接请求的SYN 报文后，它可以把 ACK 和 SYN （ ACK 起应答作用，而 SYN 起同步作用）放在一个报文里来发送。
- 但关闭连接时，当服务器收到客户端的 FIN 报文通知时，服务器只能发一个回应报文ACK：“哦，我知道了”，然后通知应用程序。应用程序完成全部数据发送并确定可以终止了，服务器才能发送FIN告诉客户端可以真正断开连接了。所以这一步ACK报文和FIN报文需要分开发送，因此多了一个步骤。

**TCP连接次数和时间**

- 依据浏览器不同，这个次数限制是不同的，对于 Chrome，最多允许对同一个 host 建立 6 个 TCP 连接
- 在 HTTP 1 中，服务器会在响应了一个 HTTP 请求后，立刻断开这个 TCP 连接，重复建立连接显然开销过大。于是开始有某些服务器，提出了不在 HTTP 标准中的头部字段 Connection，并通过设置 Connection: keep-alive 来保持当前请求使用的 TCP 连接不断开
- 因为 SSL 也是基于 TCP 的，所以此时 SSL 连接也不会断开，不需要重新交换密钥和验证。既然 Connection: keep-alive 这么好用，于是 HTTP 1.1 就将其加入了标准之中，并且默认保持 TCP 连接，除非手动在请求头中指定 Connection: close。显然可以看出，如果一个 TCP 连接不断开，是可以用来发送多个 HTTP 请求的，直到断开为止

**一个 TCP 连接能不能同时发送数个HTTP请求**

- HTTP 1.x 的场合，浏览器没有合适的并发方案，只能通过保持连接或同时并行多个连接来提高效率
- HTTP 2 中引入了多路复用的概念，在应用层采取如同网络层的 IP 数据报一样的分段标号模式，此时同一个 TCP 连接就可以正常并发多个 HTTP 请求了

## HTTP协议

万维网 WWW（World Wide Web）建立的原因，是一个美好的愿景：万物互联  
万维网是分布式超媒体系统，是超文本系统的扩充  
在万维网客户程序与万维网服务器程序之间进行交互所使用的就是超文本传输协议 HTTP，这是一个应用层协议，基于 TCP 进行可靠传输

### URL

万维网通过”链接”的方法能主动地按需获取信息，不同的信息通过 **统一资源定位符 URL** 来标识

URL 的格式如下: URL常见协议

- http：超文本传输协议访问远程网络资源,https相当于sttp安全版
- file：访问本地计算机资源
- maito：访问电子邮箱地址
- ftp：访问共享主机文件资源

### 请求

请求分为三部分：请求行、请求头、请求体

请求行（Request-Line）是以一个方法标记开始，后面跟随Request-URI和协议版本（HTTP-Version），最后以CRLF结束。元素是以SP字符分隔。除了最后的CRLF，CR或LF是不被允许的。

- 方法 （Method）：GRT、POST、PUT、HEAD。。。

| 方法    | 意义                                               |
| :------ | :------------------------------------------------- |
| OPTION  | 向服务器请求一些构成请求的关键选项，例如允许的方法 |
| HEAD    | 向服务器询问，首部行中哪些头部是 required          |
| GET     | 查                                                 |
| POST    | 增                                                 |
| PUT     | 改                                                 |
| PATCH   | 部分改                                             |
| DELETE  | 删                                                 |
| TRACE   | 用于环回测试                                       |
| CONNECT | 用于代理服务器                                     |

- 请求URL（Request-URI）："\*" | absoluteURI | abs_path | authotity
- 请求资源的识别：请求资源的精确定位是由请求里的Request-URI和Host头域决定的。

请求头域（Request Header Fields）：允许客户端传递请求的附加信息和客户端自己的附加信息给服务器。这些头域作为请求的修饰，这和程序语言方法调用的参数语义是等价的。

请求体：（上传内容）

如：  GET  /pub/WWW/TheProject.html  HTTP/1.1

```plain
Host：www.w3.org
```

### 响应

响应分为三部分：状态行、响应头、响应体

响应消息的第一行是状态行（stauts-Line），由协议版本以及数字状态码和相关的文本短语组成，各部分间用空格符隔开，除了最后的CRLF序列，中间不允许有CR或LF。

如：Status-Line = HTTP-Version SP Status-Code SP Reason-Phrase CRLF

### HTTP 状态代码

HTTP 状态码（英语：HTTP Status Code）是用以表示 HTTP 响应状态的 3 位数字代码

- 100~199 **消息**
- 200-299 **成功**
- 300 -399 **重定向**
- 400-499 **客户端出错**
- 500-599 **服务器出错**

| 状态代码 | 响应类别           | 状态代码 | 响应类别           |
| -------- | ------------------ | -------- | ------------------ |
| 100      | **转换协议**       | 400      | 坏请求             |
| 200      | **OK**             | 401      | **未授权的**       |
| 201      | 已创建             | 402      | **必要的支付**     |
| 202      | 接受               | 403      | **禁用**           |
| 204      | 无内容             | 404      | **没有找到**       |
| 205      | 重置内容           | 405      | **方式不被允许**   |
| 206      | 部分内容           | 406      | 不接受的           |
| 300      | 多个选择           | 407      | 需要代理验证       |
| 301      | **资源永久移动**   | 408      | 请求超时           |
| 302      | 发现（临时重定向） | 409      | 冲突               |
| 304      | 没有被改变（缓存） | 410      | 不存在             |
| 305      | 使用代理           | 411      | 长度必需           |
| 307      | 临时重发           | 412      | 先决条件失败       |
| 500      | **服务器内部错误** | 413      | 请求实体太大       |
| 501      | **不能实现**       | 414      | 请求URI太大        |
| 502      | **坏网关**         | 415      | 不被支持的媒体类型 |
| 503      | **服务不能获得**   | 416      | 请求的范围不满足   |
| 504      | **网关超时**       | 417      | 期望失败           |
| 505      | **HTTP版本不支持** |          | 扩展码             |

响应头域 （Response Header Fields）：允许服务器传送响应的附加信息，这些信息不能放在状态行（Status-Line）里.。这些头域给出有关服务器的信息以及请求URI（Request-URI）指定资源的更进一步访问信息。

响应头域的名字能依赖于协议版本的变化而扩展。然而，新的或者实践性的头域可能会给予响应头域的语义如果通信所有成员都能识别他们并把他们看作响应头域。不被识别的头域被看作实体头域。

HTTP 与 HTTPS

HTTP 1.0 和 HTTP 1.1 在上文已经有提到一些了，除了缓存机制和 TCP 以外也没有什么太大的差别，所以着重讨论 HTTP 2.0 和 HTTPS

### HTTP报文

请求/响应报文由以下内容组成：

- 请求行，例如：GET /logo.gif HTTP/1.1或状态码行，例如：HTTP/1.1 200 OK，
- HTTP头字段
- 空行
- 可选的HTTP报文主体数据

请求/状态行和标题必须以 结尾（即回车后跟一个换行符）空行必须只包含 ，而不能包含其他空格

### 请求样例

```http
POST /auth/login HTTP/1.1
Host: blog-server.hunger-valley.com
Connection: keep-alive
Content-Length: 41
Accept: application/json, text/plain, */*
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imh1bmdlciIsImlkIjoxLCJpYXQiOjE2MTExMjc1MjMsImV4cCI6MTYxMTM4NjcyM30.U-CkNW7WU0zprsjI23eK-0TE5wS_gD-2ZTFW8wE31FU
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36
Content-Type: application/json;charset=UTF-8
Origin: https://jirengu-inc.github.io
Referer: https://jirengu-inc.github.io/
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
{"username":"hunger","password":"123456"}
```

### 响应样例

```http
HTTP/1.1 200 OK
Server: nginx/1.4.6 (Ubuntu)
Date: Wed, 20 Jan 2021 07:28:09 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 406
Connection: keep-alive
X-Powered-By: Express
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, PUT, POST, DELETE, PATCH, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
ETag: W/"196-Ay8U/71Rt0EbDzvYIuK2YtXe7xE"
{"status":"ok","msg":"登录成功","data":{"id":1,"username":"hunger","avatar":"https://avatars.dicebear.com/api/human/hunger.svg?mood[]=happy","createdAt":"2020-09-17T03:03:55.803Z","updatedAt":"2020-09-17T03:03:55.803Z"},"token":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imh1bmdlciIsImlkIjoxLCJpYXQiOjE2MTExMjc2ODksImV4cCI6MTYxMTM4Njg4OX0.dcO4DTvWAVYPPL5do3j9zyfa48-69j157iAiXae5yrw"}
```

### **HTTP缓存**

1. 浏览器第一次向服务器发请求获取资源，服务器响应报文的状态码是200，响应头会带上`Cache-Control`、`Etag`字段，响应体是原始资源。浏览器收到响应后把资源缓存在本地。
2. 当浏览器再次发送请求获取该资源时，浏览器先检查该资源是否过期（通过之前响应报文的`Cache-Control:max-age=过期时间`来判断）。如果在过期时间以内，直接使用该资源。
3. 如果时间过期，则发请求询问该资源是否依旧可用。请求包含头字段` If-None-Match` ，是之前响应报文里的`Etag`。
4. 服务器收到请求后通过`If-None-Match`里的`Etag`和新计算的`Etag`做对比，如果匹配，则直接返回一个状态码为**304**，不包含响应体的报文，告诉浏览器该**资源依旧可用**。如果不匹配，则返回一个**状态码为20**带**Cache-Control、Etag和原始资源的新报文**。
5. 如果不存在`Etag`，则用`Last-Modified`和`If-Modified-Since`做类似的判断。

**Last-Modified、If-Modified-Since字段有什么作用？**

- 向服务器请求资源，服务器给出响应时会带上资源的修改时间
- 如 last-modified: Fri, 16 Oct 2020 04:15:40 GMT
- 浏览器下次向服务器请求该图片时会带上 if-modified-since: Fri, 16 Oct 2020 04:15:40 GMT
- 服务器可根据请求的文件修改时间和真实的文件修改时间做比较，来判断资源是否过期。

**Etag和If-None-Match字段有什么作用？**

- Etag相当于给资源打个标记生成“独一无二”的指纹。
- 当文件在服务端被修改时，Etag就会改变。其作用和Last-Modify类似。在现实环境中，这个独一无二并不严谨。

**Last-Modified和Etag哪个更好？**  
二者作用一样，大多数服务器生成Etag就是由 “文件的修改时间”和“资源的长度”两个因子生成。

- 第一，Last-Modified的单位是秒，如果在一秒内对文件进行修改，使用Last-Modified不变，但Etag一般会发生改变。
- 第二，二者在语义上也有差异，一个是文件的修改时间，一个是文件的指纹。
- 第三，使用Last-Modified，浏览器端可以直接看到文件的修改时间，对服务器来说这个信息的暴露是画蛇添足的。

**Expires字段是什么意思？**

- 这是HTTP1.0版本的报文字段，代表资源的过期时间，如`Expires: Wed, 21 Oct 2021 07:28:00 GMT`。如果**设置了**`Cache-control: max-age=过期秒数`，**Expires会被忽略**。

**Expires和Cache-Control有什么区别？**

- 第一，`Expires`的值是一个GMT的时间点，代表到什么时间点过期；`Cache-Control: max-age=值` 这个值是一个以秒为单位的时间段，代表有效期是多少秒。
- 第二，`Cache-Control`还能设置更复杂的场景，比如`Cache-Control: no-cache`、`no-store`、`private`等。
- 第三，如果服务器告诉所有的浏览器某资源在2022年1月1日到期，到了该时间点时需要该资源的浏览器都会在同一时间发请求。而如果服务器告诉所有浏览器某资源在各自存储100天，因为第一次请求的时间不一样，再次需要该资源的浏览器不会同时发请求。

**Cache-Control**

- `Cache-Control: max-age=3600` : 如果超出3600秒，再发请求向服务器询问是否能继续使用。
- `Cache-Control: no-cache` : 先向服务器确认该资源的有效性，再使用。等同于 max-age=0。
- `Cache-Control: no-store` : 下次需要该资源时直接发请求，服务器给你最新的
- `Cache-Control: private、public` :
  1. private是告诉中间的代理服务器不要缓存资源，只让目标浏览器缓存。
  2. public是都能缓存。

## HTTP版本

| 时间 | 版本 | 文档 | 特点 |
| --- | --- | --- | --- |
| 1991 | [0.9](https://www.w3.org/Protocols/HTTP/AsImplemented.html) | [**HTTP V0.9**](https://www.w3.org/pub/WWW/Protocols/HTTP/AsImplemented.html) | 仅支持GET请求，返回HTML。过时 |
| 1996 | 1.0 | [RFC](<https://en.wikipedia.org/wiki/RFC_(identifier)>) [1945](https://tools.ietf.org/html/rfc1945) | 有HTTP报文的基本结构，包含头部字段、内容字段。仅支持GET、HEAD、POST |
| 1997 | 1.1<br/>45% | [RFC](<https://en.wikipedia.org/wiki/RFC_(identifier)>) [7230](https://tools.ietf.org/html/rfc7230)<br/>[RFC](<https://en.wikipedia.org/wiki/RFC_(identifier)>) [7231](https://tools.ietf.org/html/rfc7231)<br/>[RFC](<https://en.wikipedia.org/wiki/RFC_(identifier)>) [7232](https://tools.ietf.org/html/rfc7232)<br/>[RFC](<https://en.wikipedia.org/wiki/RFC_(identifier)>) [7233](https://tools.ietf.org/html/rfc7233)<br/>[RFC](<https://en.wikipedia.org/wiki/RFC_(identifier)>) [7234](https://tools.ietf.org/html/rfc7234)<br/>[RFC](<https://en.wikipedia.org/wiki/RFC_(identifier)>) [7235](https://tools.ietf.org/html/rfc7235) | + 更多方法、状态码<br/>+ 更丰富的协商<br/>+ 缓存<br/>+ 分块传输<br/>+ 默认开启keep-alive<br/>+ 管线化传输 [HTTP pipelining](https://en.wikipedia.org/wiki/HTTP_pipelining) |
| 2015 | [2.0](https://en.wikipedia.org/wiki/HTTP/2)<br/>50% | [RFC](<https://en.wikipedia.org/wiki/RFC_(identifier)>) [7540](https://tools.ietf.org/html/rfc7540)  | 改变结构，大幅优化性能 |
| Draft (2020) | [3.0](https://en.wikipedia.org/wiki/HTTP/3)<br/>5% |  | 改版传输层协议，优化性能 |

### HTTP1.0

HTTP1.0每次请求都需要TCP链接再断开

存在的问题：建立的一次连接，只有包含一个请求响应（对应一个资源）

### Http1.1

Http1.1诞生于(1997)，对其进行了多处改进

- 连接可以复用。一次连接，多个请求响应（对应多个资源）
  - 可以**复用TCP链接**，一次链接可发送多个请求
- 增加流水线（pipeline）操作

  - 下一个请求可**不用等上一个响应来**之后再发送。（但响应到来的顺序不变 FIFO）

- http1.1中默认开启，通过http请求头设置
- http1.0默认是关闭的，通过http请求头设置

**HTTP1.1依旧存在的问题：**

- 请求按次序，后来者需要排队等待
- **请求头**都类似，重复传输浪费资源
- 同一域名浏览器有最大并行**请求限制**
- pipeling 传输方式浏览器在处理时有各自问题和bug，所以一般默认也未开启支持。另外对于大文件依旧会存在服务器阻塞。
- 只能客户端主动发起请求，不能服务器主动发起
- 数据压缩非强制，可能存在未经压缩的情况
- 为了加快并行速度浏览器会开多个连接，一个域名默认最多开约6个连接，超过限制数目的请求会被阻塞。（所以一些网站静态资源使用了多个域名，但域名太多管理不便且域名解析也需要时间）

### HTTP2.0

HTTP 2.0 有如下特点

1. **二进制分帧**
2. **首部压缩**
3. **多路复用**
4. **服务端推送\*\***(Server Push)\*\*
5. 请求可以设置优先级
6. **服务器提示(Server Hints)**，preload 和prefetch。 浏览器会在空闲的时间加载这个大的图片，下次请求可能会用到

**二进制分帧**  
我们知道数据链路层有以太网帧，网络层有 IP 报文分割，此处的二进制分帧设计思路正是基于前两者的特点而得来的使用了二进制分帧后，**每个 HTTP 报文都使用二进制格式传输数据**，每个报文都由一个或多个帧组成.为了正常使用帧，HTTP 2.0 同时使用了流的概念流是一个虚拟通道，可以承载双向消息，每个流都有一个唯一 ID简单理解，**流就是同一组请求和响应的组号** 基于二进制流。 将**一个TCP连接分为若干个流**（Stream），每个流中可以**传输若干消息**（Message），每个消息由**若干最小的二进制帧**（Frame）组成。将 HTTP 消息分解为独立的帧，交错发送，然后在另一端重新组装。

- 并行交错地发送多个请求，**请求之间互不影响**。
- 并行交错地发送多个响应，**响应之间互不干扰**。
- 使用一个连接**并行发送多个请求和响应**。

**首部压缩**  
显然每个请求之间都使用了大量的头部字段，且这些字段的值在浏览器和服务器之前是一致的。HTTP 2.0 则采用了”首部表”来缓存已经发送过的头部字段键值对，使得浏览器和服务器对于与缓存相同的字段，不需要重复在请求中发送，显著减小了请求报文的大小。该首部表在 HTTP 2.0 连接断开前始终存在，由使用双方共同更新。当产生未记录的键值对时，要么更新首部表中的记录值，要么追加到首部表的末端。

**多路复用**  
在 HTTP 2.0 中，相同域名下的所有通信都使用同一个连接完成，该连接可以并发任意数量的请求和响应，克服了 HTTP 1.x 中同一个连接不能并发请求的问题，消除了 TCP 连接多次建立以及浏览器同时维护多个 TCP 连接的开销。之所以可以做到这一点，是因为二进制分帧后，同一个流的每个帧都含有首部流标识，可以乱序发送，双方都可以根据首部流标识得到正确的消息。该设计思路的具体描述可以参考 IP 数据报的分割。

**服务端推送** 是 HTTP 2.0 最重要的特性，在 HTTP 1.x 中，如果浏览器没有发出请求，服务器是不能向浏览器发送数据的。但在 HTTP 2.0 中，服务器可以**打开 PUSH 模式**，当浏览器请求了一个资源后，服务器可以推送相关资源给浏览器。

```javascript
<html>
  <head>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <img src="example.png" />
  </body>
</html>
```

如果在 HTTP 1.x 中，浏览器需要发起 3 个请求，才可以得到整个页面的完整数据。但在 HTTP 2.0 中，如果服务器打开 了 PUSH 模式，浏览器**只需要发送 1 个请求**，申请取得 HTML 文档，服务器就会先返回 HTML 文档，然后根据 HTML 文档中的资源指向，向浏览器推送 css 文件和 png 文件，这样浏览器在后续要使用的时候，就发现已经收到了资源，不需要再发请求了。这样，只要 1 个请求，就完成了以前 3 个请求才能完成的事情，效率显然大大提高。既然**服务器可以主动推送**，客户端自然也可以选择**是否接受**。

如果服务端推送的资源已经被*浏览器缓存过*，浏览器可以通过发送**RST_STREAM帧来拒收**

主动推送也遵守同源策略，服务器不会随便推送第三方资源给客户端。

**Preload与 Server Push** preload 预加载，告诉浏览器下一步立即要加载什么资源。

```javascript
<link rel="preload" href="https://example.com/images/large-background.jpg">
```

prefetch 预加载，告诉浏览器下一步要加载什么资源。在空闲时加载。

```javascript
<link rel="prefetch" href="https://example.com/images/music.mp3">
```

### HTTP3 改进

HTTP / 3是 HTTP 即将发布的主要版本。HTTP语义在各个版本之间是一致的：相同的请求方法，状态代码和消息字段通常适用于所有版本。

**不同之处**在于这些语义到基础传输的映射。

- HTTP / 1.1和HTTP / 2使用**TCP作为其传输**。
- HTTP / 3使用QUIC，这是Google最初开发的一种基于**UDP的传输层网络协议**。改用QUIC的目的是解决HTTP / 2的一个**主要问题HOL阻塞 (head-of-line blocking)** 。HTTP / 1.1中的HOL是指当浏览器中允许的并行请求数用完时，随后的请求需要等待前一个请求完成。HTTP / 2通过请求复用解决了此问题，该复用消除了应用程序层的**HOL阻塞**，但HOL仍存在于传输（TCP）层。

### HTTPS

\*\*HTTPS超文本传输安全协议，在HTTP的基础上通过传输加密和身份认证保证了传输过程的安全性。HTTPS = HTTP + SSL  
HTTPS 基于 SSL 协议，采用 RSA 算法，使得通信双方不需要直接发送私钥，就可以达成合意开始加密通信，HTTP使用80端口，HTTPS使用443端口。

具体流程如下

1. 浏览器向服务器发起 HTTPS 连接请求
2. 服务器向浏览器发送公钥和根据自己的**私钥与公钥联合加密的密文**，服务器生成的随机数、服务器**数字证书**。
3. 浏览器收到**公钥和密文**，随机**产生一个私钥**，向服务器发送根据自己的私钥与公钥联合加密的密文。
4. 双方都**根据公钥、自己的私钥**和对方发送的密文进行计算，得到**共同的密钥**，通信建立。
5. 在之后的通信中，都使用这个计算出来的密钥进行加密通信，二者使用**共享主密钥**，使用对称加密算法加密数据。

HTTPS优点： **SEO、安全**

**如何实施HTTPS**

1. 经销商购买证书：GoGetSSL、SSLs.com、SSLmate.com
2. 本地测试证书
   1. 本地HomeBrew安装：brew installmkcert
   2. 本地安装根证书： $mkcert ---install
   3. 本地生成签名：$mkcert 123.com（域名）
   4. 本地Nginx配置

```nginx
server{
	listen		443 ssl; # 启用HTTPS
  server_name		123.com; #这里是刚才的域名
  ssl_certificate 123+3.pem;
  ssl_certificate_key	123+3-key.pem;
}
```

参考链接

[RFC 2616](https://www.cnblogs.com/Kimbing-Ng/p/12411017.html)  
[一文读懂 HTTP/2 特性](https://zhuanlan.zhihu.com/p/26559480)  
[深入浅出：HTTP/2](https://www.cnblogs.com/confach/p/10141273.html)
