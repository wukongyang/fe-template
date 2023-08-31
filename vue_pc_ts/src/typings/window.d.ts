// * global
declare global {
  interface Navigator {
    msSaveOrOpenBlob: (blob: Blob, fileName: string) => void
    browserLanguage: string
  }
  interface Window {
    returnCitySN: any //全局变量名
    performance: any
  }
}

export {}
