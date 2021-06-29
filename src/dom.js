window.dom = {
    create(string) {
        const container = document.createElement("template");//可以在template里容纳任意标签
        container.innerHTML = string.trim();//去掉字符串两边的空格，防止空格影响
        return container.content.firstChild;
    },
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling);
    },
    before(node, node2){
        node.parentNode.insertBefore(node2, node);
    },
    append(parent, node){
    parent.appendChild(node)
  },
  wrap(node, parent){
    dom.before(node, parent)
    dom.append(parent, node)
  },
  remove(node){
    node.parentNode.removeChild(node)
    return node
  },
  empty(node){
    const array = []
    let x = node.firstChild
    while(x){
      array.push(dom.remove(node.firstChild))
      x = node.firstChild
    }
    return array
  },
  append(parent, node){
    parent.appendChild(node)
  },
  //在两个节点中加入新节点
  wrap(node, parent){
    dom.before(node, parent)
    dom.append(parent, node)
  },
  remove(node){
    node.parentNode.removeChild(node)
    return node
  },
  //将父元素所有儿子删除
  empty(node){
    const array = []
    let x = node.firstChild
    while(x){
      array.push(dom.remove(node.firstChild))
      x = node.firstChild
    }
    return array
  },
  // 读、获取属性值，重载
  attr(node, name, value){ 
    if(arguments.length === 3){
      node.setAttribute(name, value)
    }else if(arguments.length === 2){
      return node.getAttribute(name)
    }
  },
  // 读、修改标签内容，适配
  text(node, string){ 
    if(arguments.length ===2 ){
      if('innerText' in node){
        node.innerText = string 
      }else{
        node.textContent = string 
      }
    }else if(arguments.length === 1){
      if('innerText' in node){
        return node.innerText
      }else{
        return node.textContent
      }
    }
  },
  html(node, string){
    if(arguments.length === 2){
      node.innerHTML = string
    }else if(arguments.length === 1){
      return node.innerHTML 
    }
  },
  style(node, name, value){
    if(arguments.length===3){//写
      // dom.style(div, 'color', 'red')
      node.style[name] = value
    }else if(arguments.length===2){
      if(typeof name === 'string'){
        // dom.style(div, 'color')
        return node.style[name]
      }else if(name instanceof Object){
        // dom.style(div, {color: 'red'})
        const object = name
        for(let key in object){
          node.style[key] = object[key]
        }
      }
    }
  },
  class: {
    add(node, className){
      node.classList.add(className)
    },
    remove(node, className){
      node.classList.remove(className)
    },
    has(node, className){
      return node.classList.contains(className)
    }
  },
  on(node, eventName, fn){//添加监听
    node.addEventListener(eventName, fn)
  },
  off(node, eventName, fn){//移除监听
    node.removeEventListener(eventName, fn)
  },
  find(selector, scope){
    return (scope || document).querySelectorAll(selector)
  },
  parent(node){
    return node.parentNode
  },
  children(node){
    return node.children
  },
  //寻找兄弟结点
  siblings(node){
    return Array.from(node.parentNode.children)
    .filter(n=>n!==node)
  },
  //下一个节点
  next(node){
    let x = node.nextSibling
    while(x && x.nodeType === 3){
      x = x.nextSibling
    }
    return x
  },
  //上一个节点
  previous(node){
    let x = node.previousSibling
    while(x && x.nodeType === 3){
      x = x.previousSibling
    }
    return x
  },
  //遍历所有节点
  each(nodeList, fn){
    for(let i=0;i<nodeList.length;i++){
      fn.call(null, nodeList[i])
    }
  },
  //元素排名
  index(node){
    const list = dom.children(node.parentNode)
    let i
    for(i=0;i<list.length;i++){
      if(list[i] === node){
        break
      }
    }
    return i
  }
};
