import{_ as a,c as n,b as e,o as l}from"./app-DvLA8TUu.js";const i={};function t(p,s){return l(),n("div",null,s[0]||(s[0]=[e(`<p>要使用 OpenSSL 生成一个自签名证书，包含 IP 地址作为 <strong>Subject Alternative Name (SAN)</strong>，并能够导入到 JDK 中使用且在 NGINX 中配置，下面是完整的步骤：</p><h3 id="_1-创建-openssl-配置文件" tabindex="-1"><a class="header-anchor" href="#_1-创建-openssl-配置文件"><span>1. <strong>创建 OpenSSL 配置文件</strong></span></a></h3><p>首先，你需要创建一个 OpenSSL 配置文件，确保在生成证书时包含 IP 地址作为 SAN。</p><h4 id="创建-openssl-cnf-配置文件" tabindex="-1"><a class="header-anchor" href="#创建-openssl-cnf-配置文件"><span>创建 <code>openssl.cnf</code> 配置文件</span></a></h4><p>在任意目录下创建一个名为 <code>openssl.cnf</code> 的配置文件，内容如下：</p><div class="language-ini line-numbers-mode" data-highlighter="prismjs" data-ext="ini" data-title="ini"><pre><code><span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">req</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">distinguished_name</span> <span class="token punctuation">=</span> <span class="token value attr-value">req_distinguished_name</span></span>
<span class="line"><span class="token key attr-name">req_extensions</span> <span class="token punctuation">=</span> <span class="token value attr-value">v3_req</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">req_distinguished_name</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">commonName</span> <span class="token punctuation">=</span> <span class="token value attr-value">Common Name (e.g. server FQDN or YOUR name)</span></span>
<span class="line"><span class="token key attr-name">commonName_default</span> <span class="token punctuation">=</span> <span class="token value attr-value">182.xxx.xx.xx  # 替换为你的 IP 地址</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">v3_req</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">subjectAltName</span> <span class="token punctuation">=</span> <span class="token value attr-value">@alt_names</span></span>
<span class="line"></span>
<span class="line"><span class="token section"><span class="token punctuation">[</span><span class="token section-name selector">alt_names</span><span class="token punctuation">]</span></span></span>
<span class="line"><span class="token key attr-name">IP.1</span> <span class="token punctuation">=</span> <span class="token value attr-value">182.xxx.xx.xx  # 你的 IP 地址</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>在 <code>commonName_default</code> 中设置你希望作为证书的 Common Name（通常是主机名或 IP 地址）。</li><li>在 <code>[alt_names]</code> 部分添加你希望证书支持的 IP 地址或域名。</li></ul><h3 id="_2-生成证书和私钥" tabindex="-1"><a class="header-anchor" href="#_2-生成证书和私钥"><span>2. <strong>生成证书和私钥</strong></span></a></h3><p>接下来，使用 OpenSSL 生成证书和私钥。首先，生成证书请求（CSR）和私钥。</p><h4 id="生成-csr-和私钥" tabindex="-1"><a class="header-anchor" href="#生成-csr-和私钥"><span>生成 CSR 和私钥</span></a></h4><p>运行以下命令来生成一个私钥文件和证书签名请求（CSR）：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">openssl req <span class="token parameter variable">-new</span> <span class="token parameter variable">-newkey</span> rsa:2048 <span class="token parameter variable">-nodes</span> <span class="token parameter variable">-keyout</span> myserver.key <span class="token parameter variable">-out</span> myserver.csr <span class="token parameter variable">-config</span> openssl.cnf</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h4 id="生成自签名证书" tabindex="-1"><a class="header-anchor" href="#生成自签名证书"><span>生成自签名证书</span></a></h4><p>然后，使用 CSR 和私钥来生成自签名证书，并应用你在配置文件中指定的扩展：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">openssl x509 <span class="token parameter variable">-req</span> <span class="token parameter variable">-in</span> myserver.csr <span class="token parameter variable">-signkey</span> myserver.key <span class="token parameter variable">-out</span> myserver.crt <span class="token parameter variable">-extensions</span> v3_req <span class="token parameter variable">-extfile</span> openssl.cnf</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>这将会生成一个包含 IP 地址的自签名证书 <code>myserver.crt</code> 和私钥 <code>myserver.key</code>。</p><h3 id="_3-验证证书内容" tabindex="-1"><a class="header-anchor" href="#_3-验证证书内容"><span>3. <strong>验证证书内容</strong></span></a></h3><p>你可以检查生成的证书，确保它包含正确的 Subject Alternative Name（SAN）：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">openssl x509 <span class="token parameter variable">-in</span> myserver.crt <span class="token parameter variable">-text</span> <span class="token parameter variable">-noout</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>你应该能在输出中看到类似下面的内容：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">X509v3 Subject Alternative Name:</span>
<span class="line">    IP Address:182.xxx.xx.xx</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-将证书导入到-jdk-的信任库" tabindex="-1"><a class="header-anchor" href="#_4-将证书导入到-jdk-的信任库"><span>4. <strong>将证书导入到 JDK 的信任库</strong></span></a></h3><p>为了确保 Java 可以信任这个自签名证书，你需要将证书导入到 JDK 的信任库中。</p><h4 id="使用-keytool-导入证书" tabindex="-1"><a class="header-anchor" href="#使用-keytool-导入证书"><span>使用 <code>keytool</code> 导入证书</span></a></h4><p>首先，确保你使用的证书文件（<code>myserver.crt</code>）和 JDK 安装路径正确。然后，运行以下命令将证书导入到 Java 的 <code>cacerts</code> 信任库：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">keytool <span class="token parameter variable">-import</span> <span class="token parameter variable">-alias</span> myserver <span class="token parameter variable">-file</span> myserver.crt <span class="token parameter variable">-keystore</span> <span class="token variable">$JAVA_HOME</span>/jre/lib/security/cacerts</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ul><li><code>$JAVA_HOME</code> 是你 JDK 安装的路径。例如，在 Linux 中通常是 <code>/usr/lib/jvm/java-&lt;version&gt;/</code>，在 Windows 中可能是 <code>C:\\Program Files\\Java\\jdk-&lt;version&gt;\\</code>。</li><li>默认的信任库密码是 <code>changeit</code>，如果你修改了密码，使用新的密码。</li></ul><h4 id="验证证书导入" tabindex="-1"><a class="header-anchor" href="#验证证书导入"><span>验证证书导入</span></a></h4><p>你可以运行以下命令来验证证书是否已成功导入到信任库：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">keytool <span class="token parameter variable">-list</span> <span class="token parameter variable">-keystore</span> <span class="token variable">$JAVA_HOME</span>/jre/lib/security/cacerts</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>在输出中，你应该能看到你刚才导入的证书（别名为 <code>myserver</code>）。</p><h3 id="_5-在-nginx-配置中使用证书" tabindex="-1"><a class="header-anchor" href="#_5-在-nginx-配置中使用证书"><span>5. <strong>在 NGINX 配置中使用证书</strong></span></a></h3><p>现在，你已经生成了包含 IP 地址的自签名证书并导入到 JDK 中，接下来你需要配置 NGINX 使用这个证书。</p><h4 id="配置-nginx-使用证书" tabindex="-1"><a class="header-anchor" href="#配置-nginx-使用证书"><span>配置 NGINX 使用证书</span></a></h4><ol><li>将生成的 <code>myserver.crt</code> 和 <code>myserver.key</code> 文件移动到 NGINX 的证书目录中。例如，假设将其放在 <code>/etc/nginx/ssl/</code> 目录下。</li><li>修改 NGINX 配置文件（例如 <code>/etc/nginx/sites-available/default</code> 或 <code>/etc/nginx/nginx.conf</code>）来配置 SSL。</li></ol><p>在配置文件的 <code>server</code> 块中添加以下内容：</p><div class="language-nginx line-numbers-mode" data-highlighter="prismjs" data-ext="nginx" data-title="nginx"><pre><code><span class="line"><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">listen</span> <span class="token number">443</span> ssl</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">server_name</span> 182.xxx.xx.xx</span><span class="token punctuation">;</span>  <span class="token comment"># 替换为你的 IP 地址</span></span>
<span class="line"></span>
<span class="line">    <span class="token directive"><span class="token keyword">ssl_certificate</span> /etc/nginx/ssl/myserver.crt</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">ssl_certificate_key</span> /etc/nginx/ssl/myserver.key</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment"># 其他 SSL 配置</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">ssl_protocols</span> TLSv1.2 TLSv1.3</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token directive"><span class="token keyword">ssl_ciphers</span> <span class="token string">&#39;HIGH:!aNULL:!MD5&#39;</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment"># 你的其他配置</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>server_name</code> 设置为你使用的 IP 地址或者域名。</li><li><code>ssl_certificate</code> 和 <code>ssl_certificate_key</code> 指定证书和私钥的路径。</li></ul><ol><li><strong>重新加载 NGINX 配置</strong>：</li></ol><p>在修改完配置文件后，重新加载 NGINX 配置使其生效：</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">sudo</span> nginx <span class="token parameter variable">-s</span> reload</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_6-验证-nginx-配置" tabindex="-1"><a class="header-anchor" href="#_6-验证-nginx-配置"><span>6. <strong>验证 NGINX 配置</strong></span></a></h3><p>最后，验证你的 NGINX 服务器是否能够正常工作：</p><ol><li>使用浏览器访问 <code>https://182.xxx.xx.xx</code>，检查是否能够成功连接，并且证书是否被正确加载。</li><li>可以使用 <code>openssl</code> 命令行工具来测试 SSL 连接：</li></ol><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">openssl s_client <span class="token parameter variable">-connect</span> <span class="token number">182</span>.xxx.xx.xx:443</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>如果一切配置正确，你应该能够看到证书信息，并且没有 SSL/TLS 错误。</p><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结：</span></a></h3><ol><li><strong>生成证书</strong>：使用 OpenSSL 创建一个包含 IP 地址的自签名证书，配置文件中设置了 SAN 扩展。</li><li><strong>导入 JDK 信任库</strong>：使用 <code>keytool</code> 将证书导入到 Java 的信任库，避免 <code>No subject alternative names matching IP address</code> 错误。</li><li><strong>配置 NGINX 使用证书</strong>：将证书配置到 NGINX 中，确保 HTTPS 连接能够正常工作。</li></ol><p>按照这些步骤，你就能成功生成并使用包含 IP 地址的自签名证书，在 JDK 中导入，并且在 NGINX 中配置使用。</p>`,49)]))}const r=a(i,[["render",t],["__file","ip做自签名证书流程.html.vue"]]),o=JSON.parse('{"path":"/%E5%B7%A5%E5%85%B7/windwos%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%83%A8%E7%BD%B2/ip%E5%81%9A%E8%87%AA%E7%AD%BE%E5%90%8D%E8%AF%81%E4%B9%A6%E6%B5%81%E7%A8%8B.html","title":"","lang":"zh-CN","frontmatter":{},"headers":[{"level":3,"title":"1. 创建 OpenSSL 配置文件","slug":"_1-创建-openssl-配置文件","link":"#_1-创建-openssl-配置文件","children":[]},{"level":3,"title":"2. 生成证书和私钥","slug":"_2-生成证书和私钥","link":"#_2-生成证书和私钥","children":[]},{"level":3,"title":"3. 验证证书内容","slug":"_3-验证证书内容","link":"#_3-验证证书内容","children":[]},{"level":3,"title":"4. 将证书导入到 JDK 的信任库","slug":"_4-将证书导入到-jdk-的信任库","link":"#_4-将证书导入到-jdk-的信任库","children":[]},{"level":3,"title":"5. 在 NGINX 配置中使用证书","slug":"_5-在-nginx-配置中使用证书","link":"#_5-在-nginx-配置中使用证书","children":[]},{"level":3,"title":"6. 验证 NGINX 配置","slug":"_6-验证-nginx-配置","link":"#_6-验证-nginx-配置","children":[]},{"level":3,"title":"总结：","slug":"总结","link":"#总结","children":[]}],"git":{"updatedTime":1736757456000,"contributors":[{"name":"kk","username":"kk","email":"duoli.java@gmail.com","commits":1,"url":"https://github.com/kk"}]},"filePathRelative":"工具/windwos服务器部署/ip做自签名证书流程.md"}');export{r as comp,o as data};
