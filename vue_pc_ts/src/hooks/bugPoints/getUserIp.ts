const getUserIp = () => {
  return new Promise((resolve, reject) => {
    const scriptElement = document.createElement('script')
    // 这个是测试获取ip的接口
    scriptElement.src = `https://pv.sohu.com/cityjson?ie=utf-8`
    document.body.appendChild(scriptElement)
    scriptElement.onload = () => {
      try {
        document.body.removeChild(scriptElement)
        resolve(window.returnCitySN)
      } catch (e) {
        reject(e)
      }
    }
  })
}

export default getUserIp
