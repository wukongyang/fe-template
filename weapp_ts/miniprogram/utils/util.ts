
type optKeyType = 'D' | 'h' | 'm' | 's';
type optType = Partial<Record<'Y' | 'M', number>> & Record<optKeyType, number>;
function addTimePrefix(value: number, isPrefix: boolean = true): string {
  return value < 10 && isPrefix ? `0${value}` : `${value}`;
}
function transTime(opt: optType, format: string): string {
  let reg = new RegExp('Y+|M+|D+|h+|m+|s+', 'g');
  let regY = new RegExp('Y');
  let formartStr: string = format.replace(reg, (v) => {
    let dateStr: string = v;
    // 处理年
    if (regY.test(v)) {
      let y = '' + opt['Y'];
      let len = 4 - v.length;
      dateStr = y.substring(len);
    } else {
      let key: optKeyType = v.substring(0, 1) as optKeyType;
      dateStr = addTimePrefix(opt[key], v.length === 2);
    }
    return dateStr;
  });
  return formartStr;
}
/**
 * @description 格式化时间
 * @method format(time,mat)
 * @param {number | Date | string} [time = new Date()] 时间戳（毫秒）或者日期格式,默认使用当前时间(new Date())
 * @param {string} [mat='YYYY-MM-DD hh:mm:ss'] 时间格式,不填时默认使用'YYYY-MM-DD hh:mm:ss'格式,更改需替换中间连接符号就行'YYYY年MM月DD日 hh时mm分ss秒'
 * @example
 * const timestamp=1673850986000
   const dateStr: string = Time.format(timestamp, 'YYYY年MM月DD日 hh:mm:ss');
 */
function format(
  time: number | Date | string = new Date(),
  mat?: string,
): string {
  try {
    let date: Date = new Date(),
      format: string = mat || 'YYYY-MM-DD hh:mm:ss';
    // 处理时间戳，js一般获取的时间戳是13位根据实际情况做判断处理
    if (typeof time === 'number') {
      if (time.toString().length === 10) {
        date = new Date(time * 1000);
      } else if (time.toString().length === 13) {
        date = new Date(time);
      } else {
        return '';
      }
    } else if (typeof time === 'string') {
      date = new Date(time);
    } else {
      if (time instanceof Date) {
        date = time;
      }
    }
    // 日期数据
    const opt: optType = {
      Y: date.getFullYear(), // 年
      M: date.getMonth() + 1, // 月
      D: date.getDate(), // 日
      h: date.getHours(), // 时
      m: date.getMinutes(), // 分
      s: date.getSeconds(), // 秒
    };
    return transTime(opt, format);
  } catch (error) {
    console.error('tools error', error);
    return '';
  }
}



/**
 * @description: 不足两位前面补零
 * @param  {String} num - 输入时间
 * @return {String} 输出时间
 */

function twoByte(num: number): string | number {
  let numStr = String(num);
  if (numStr.length < 2) {
    return '0' + numStr;
  }
  return num;
};

/**
 * @description 生成 n-m 之间的一个随机数
 * @param {Number} minNum  最小值
 * @param {Number} maxNum  最小值
 * @return {Number} 结果数
 */

function randomNum(num: number): number
function randomNum(minNum: number, maxNum: number): number
function randomNum(minNum: number, maxNum?: number): number {
  let result;

  switch (arguments.length) {
    case 1:
      result = parseInt(String(Math.random() * minNum + 1), 10);
      break;
    case 2:
      if (maxNum) {
        result = parseInt(String(Math.random() * (maxNum - minNum + 1) + minNum), 10);
      } else {
        result = minNum
      }
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
function debounce(func: Function, wait: number, immediate: boolean): Function {
  let timer: number | null, context: any, args: any;
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
  return function (this: any, ...params: any[]) {
    // 如果没有创建延迟执行函数（later），就创建一个
    let _that: any = this
    if (!timer) {
      timer = later();
      // 如果是立即执行，调用函数
      // 否则缓存参数和调用上下文
      if (immediate) {
        func.apply(_that, params);
      } else {
        context = _that;
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
function getRange(array: any[], key?: string): Record<'min' | 'max', number> {
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

}

module.exports = {
  format,
  twoByte,
  randomNum,
  debounce,
  getRange
}
