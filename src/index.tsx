import React from 'react';
import ReactDOM from 'react-dom';

const 获得随机成功序列 = (成功次数: number, 总次数: number) => {
  const 序列 = Array(parseInt(总次数 + '')).fill(0);
  for (let 次 = 0; 次 < 成功次数; 次++) {
    const 成功那次 = parseInt(Math.random() * 总次数 + '');
    let 临时次 = 成功那次;
    while (序列[临时次]) {
      临时次 + 1;
    }
    序列[临时次] = 1;
  }
  return 序列;
};

const App = () => {
  const 投资初始金额 = 35000;
  const 单次开单比例 = 0.3;
  const 预估胜率 = 0.3;
  const 每月成功笔数 = 1;
  const 预计浮盈比例 = 1;
  const 预计亏损比例 = 0.3;
  const 每月开单数 = 1 / 预估胜率;
  const 每月失败单数 = 每月开单数 - 每月成功笔数;

  const 每月详细数据: { 本月份: number; 本月份金额: number }[] = [];
  const 详细输出: string[] = [];

  const 计算年终金额 = (初始金额: number) => {
    let 初始月份 = 1;
    const 计算每月收益 = (本月份金额: number, 本月份: number): number => {
      每月详细数据.push({ 本月份, 本月份金额 });
      console.log(`月份 ${本月份} 开始，本月金额 ${本月份金额}`);
      if (本月份 === 13) {
        return 本月份金额;
      }
      const 开单成功序列 = 获得随机成功序列(每月成功笔数, 每月开单数);
      let 临时金额 = 本月份金额;
      开单成功序列.forEach((是否成功, index) => {
        if (是否成功) {
          临时金额 = 临时金额 + 临时金额 * 单次开单比例 * 预计浮盈比例;
        } else {
          临时金额 = 临时金额 - 临时金额 * 单次开单比例 * 预计亏损比例;
        }
        if (临时金额 < 0) {
          throw new Error(`爆仓了，金额为 ${临时金额}`);
        }
        console.log(
          `第 ${index} 次开单，是否成功 ${是否成功}，剩余金额 ${临时金额}`
        );
      });
      console.log(
        `月份 ${本月份} 结束，本月金额 ${临时金额}，本月收益 ${
          ((临时金额 - 本月份金额) / 本月份金额) * 100
        }，总收益 ${((临时金额 - 投资初始金额) / 投资初始金额) * 100}`
      );
      return 计算每月收益(临时金额, 本月份 + 1);
    };
    return 计算每月收益(初始金额, 初始月份);
  };

  const 年终金额 = 计算年终金额(投资初始金额);
  console.log(每月详细数据);
  return (
    <div>
      年终金额：{年终金额.toFixed(2)}
      <br />
      收益率：{(年终金额 / 投资初始金额).toFixed(2)}%
      <ul>
        {每月详细数据.map(({ 本月份, 本月份金额 }) => {
          return (
            <li key={本月份}>
              月份：{本月份} 本月份金额：{本月份金额.toFixed(2)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ReactDOM.render(<App></App>, document.querySelector('#root'));
