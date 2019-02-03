import {
  $,
  $$,
  removeNode,
  addClass,
  removeClass,
  setCookie,
  getCookie,
  removeCookie
} from '../src/dom'

/**
 * Dom方法：
 * querySelector(All)简写
 * 删除节点
 * 节点类名增删
 */
describe('[dom]: test dom handler:', () => {
  const bodyHTML = `<div id="app">
      <h3 id="title">Hello World!</h3>
      <ul>
        <li class="weather">rain</li>
        <li class="weather">thunder</li>
        <li class="weather">cloud</li>
      </ul>
    </div>`

  test('test selector', () => {
    document.body.innerHTML = bodyHTML
    const h3title = $('#title')
    const weatherList = $$('.weather')

    expect(h3title).toBe(document.getElementById('title'))
    expect(weatherList).toHaveLength(3)
    expect(weatherList[1].innerHTML).toBe('thunder')
  })

  test('test node removing', () => {
    document.body.innerHTML = bodyHTML
    let titleNode = $('#title')

    expect(titleNode).toBe(document.getElementById('title'))
    removeNode(titleNode)
    expect($('#title')).toBeNull()
  })

  test('test class adding', () => {
    document.body.innerHTML = bodyHTML
    const title = $('#title')
    // initial adding
    addClass(title, 'hello-title')
    expect(title.className).toBe('hello-title')
    // appending
    addClass(title, 'align-center')
    expect(title.className).toBe('hello-title align-center')
    // match duplicate string with RegExp test
    addClass(title, 'center')
    expect(title.className).toBe('hello-title align-center center')
    // match duplicate string with RegExp test
    addClass(title, 'center')
    expect(title.className).toBe('hello-title align-center center')
  })

  test('test class removing', () => {
    document.body.innerHTML = bodyHTML
    const title = $('#title')
    title.className = 'hello-title align-center center'
    // remove matched classname
    removeClass(title, 'center')
    expect(title.className).toBe('hello-title align-center')
    // exactly match
    removeClass(title, 'align')
    expect(title.className).not.toBe('hello-title -center')
    expect(title.className).toBe('hello-title align-center')
    // nothing to do if not match or empty string
    removeClass(title, 'undefined-class')
    expect(title.className).toBe('hello-title align-center')

    const ul = $('ul')
    removeClass(ul, '')
    expect(ul.className).toBe('')
  })
})

/**
 * Cookie相关操作
 */
describe('[dom]: test cookie handlers:', () => {
  test('test cookie setter', () => {
    setCookie('name', 'utaha')
    setCookie('age', '16')
    setCookie('saenai', 'kanojo', {
      path: '/',
      expires: new Date(Date.now() + 600000)
    })
    setCookie('akarin', 'notexsist',{
      domain : '.kagashino.com'
    })
    expect(document.cookie).toBe('name=utaha; age=16; saenai=kanojo')
  })

  test('test cookie getter', () => {
    setCookie('name', 'megumi')
    expect(getCookie('name')).toBe('megumi')
  })

  test('test cookie removing', () => {
    setCookie('name', 'utaha')
    setCookie('age', '16')
    setCookie('saenai', 'kanojo')

    removeCookie('age')
    expect(getCookie('name')).toBe('utaha')
    expect(getCookie('saenai')).toBe('kanojo')
    expect(getCookie('age')).toBe('')
  })
})
