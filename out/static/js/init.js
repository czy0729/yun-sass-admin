/*
 * @Author: czy0729
 * @Date: 2019-07-08 11:09:43
 * @Last Modified by:   czy0729
 * @Last Modified time: 2019-07-08 11:09:43
 */
$(document).ready(function() {
  var niceScroll = $('body').niceScroll({
    cursorcolor: 'rgba(0, 0, 0, 0.32)',
    cursorborder: 0,
    zindex: 10000
  })

  // 检测文档高度改变
  function onElementHeightChange(elm, callback) {
    var lastHeight = elm.clientHeight,
      newHeight
    ;(function run() {
      newHeight = elm.clientHeight
      if (lastHeight != newHeight) callback()
      lastHeight = newHeight

      if (elm.onElementHeightChangeTimer)
        clearTimeout(elm.onElementHeightChangeTimer)

      elm.onElementHeightChangeTimer = setTimeout(run, 1000)
    })()
  }

  onElementHeightChange(document.body, function() {
    niceScroll.resize()
  })
})
