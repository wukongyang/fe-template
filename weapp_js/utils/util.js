/** 
 * @description 时间戳转化为年 月 日 时 分 秒 
 * @method formatTime(format,num)
 * @param {string} [format='YYYY-mm-dd HH:MM:SS'] 时间格式,不填时默认使用'YYYY-mm-dd HH:MM:SS'格式,更改需替换中间连接符号就行'YYYY年mm月dd日 HH时MM分SS秒'
 * @param {number} [num = new Date().getTime()] 时间戳,默认使用当前时间戳, new Date().getTime(); 获取当前时间戳（毫秒）
 * @example 
 *  var sjc = 1472048779952; //js一般获取的时间戳是13位，PHP一般是10位
    formatTime('YYYY-mm-dd HH:MM:SS',sjc)
 */
const formatTime = (format = "", num = new Date().getTime()) => {
  format = format || "YYYY-mm-dd HH:MM:SS"; //第一个参数不填时，使用默认格式
  let ret, date, renum;
  // 处理时间戳，js一般获取的时间戳是13位，PHP一般是10位,根据实际情况做判断处理
  if (num.toString().length == 10) {
    date = new Date(parseInt(num) * 1000);
  } else {
    date = new Date(parseInt(num));
  }
  const opt = {
    "Y": date.getFullYear().toString(), // 年
    "m": (date.getMonth() + 1).toString(), // 月
    "d": date.getDate().toString(), // 日
    "H": date.getHours().toString(), // 时
    "M": date.getMinutes().toString(), // 分
    "S": date.getSeconds().toString() // 秒
    // 目前用的是这六种符号,有其他格式化字符需求可以继续添加，值必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + "+)").exec(format);
    if (ret) {
      renum = (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")) //根据复数前面是否补零,如“mm”补零，单“m”前面不补零
      format = format.replace(ret[1], renum) //替换
    };
  };
  return format;
};

/**
 * @description: 不足两位前面补零
 * @param  {String} num - 输入时间
 * @return {String} 输出时间
 */

const twoByte = (num) => {
  num = String(num);
  if (num.length < 2) {
    return '0' + num;
  }
  return num;
};

/**
 * @description 生成 n-m 之间的一个随机数
 * @param {Number} minNum  最小值
 * @param {Number} maxNum  最小值
 * @return {Number} 结果数
 */

const randomNum = (minNum, maxNum) => {
  let result;

  switch (arguments.length) {
    case 1:
      result = parseInt(String(Math.random() * minNum + 1), 10);
      break;
    case 2:
      result = parseInt(String(Math.random() * (maxNum - minNum + 1) + minNum), 10);
      break;
    default:
      result = 0;
      break;
  }

  return result;
};

/**
 * @description 防抖函数，返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 * @param {Function} func - 要执行的函数
 * @param {Number} wait - 表示时间窗口的间隔
 * @param {Boolean} immediate - 是否立即调用函数
 * @return {Function} - 返回调用函数
 */
const debounce = function (func, wait, immediate) {
  let timer, context, args;
  // 延迟执行函数
  const later = () =>
    setTimeout(() => {
      // 延迟函数执行完毕，清空缓存的定时器序号
      timer = null;
      // 延迟执行的情况下，函数会在延迟函数中执行
      // 使用到之前缓存的参数和上下文
      if (!immediate) {
        func.apply(context, args);
        context = args = null;
      }
    }, wait);

  // 这里返回的函数是每次实际调用的函数
  return function (...params) {
    // 如果没有创建延迟执行函数（later），就创建一个
    if (!timer) {
      timer = later();
      // 如果是立即执行，调用函数
      // 否则缓存参数和调用上下文
      if (immediate) {
        func.apply(this, params);
      } else {
        context = this;
        args = params;
      }
      // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
      // 这样做延迟函数会重新计时
    } else {
      clearTimeout(timer);
      timer = later();
    }
  };
};
/**
 * @description 获取数组中的最大值和最小值
 * @param {Array} array - 要判断的数组
 * @param {String} key - 需要判断的key
 * @return {Object} - 返回最大值和最小值集合
 */
const getRange = (array, key) => {
  if (array.length > 0) {
    // 最大值
    const max = Math.max.apply(Math, array.map(item => {
      return key ? item[key] : item
    }))
    // 最小值 
    const min = Math.min.apply(Math, array.map(item => {
      return key ? item[key] : item
    }))
    return {
      min,
      max
    }
  }else{
    console.error('getRange函数，请传入需要的数据')
  }

}

module.exports = {
  formatTime,
  twoByte,
  randomNum,
  debounce,
  getRange
}