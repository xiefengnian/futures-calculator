const { writeFileSync } = require('fs');

const fullyearTradingCount = 100;
const successRate = 0.25;
const tradingSuccessCount = fullyearTradingCount * successRate;
const returnRate = [0.5, 1];
const lossRate = [0.1, 0.3];

const allTradingRecord = Array(fullyearTradingCount).fill(0);
for (let i = 0; i < successRate * fullyearTradingCount; i++) {
  let j = parseInt(allTradingRecord.length * Math.random());
  while (allTradingRecord[j]) {
    if (j === allTradingRecord.length - 1) {
      j = 0;
    } else {
      j++;
    }
  }
  allTradingRecord[j] = 1;
}

const buyRate = 0.2;

const trading = () => {
  let tradingMoney = 30000;
  const initialMoney = tradingMoney;
  const record = [];

  const getRandomRate = (from, to) => {
    return Math.random() * (to - from) + from;
  };

  for (let index = 0; index < allTradingRecord.length; index++) {
    const tradingSuccess = allTradingRecord[index];
    if (tradingSuccess) {
      tradingMoney =
        tradingMoney +
        tradingMoney * buyRate * getRandomRate(returnRate[0], returnRate[1]);
    } else {
      tradingMoney =
        tradingMoney -
        tradingMoney * buyRate * getRandomRate(lossRate[0], lossRate[1]);
    }
    record.push(
      `第 ${index} 次交易，${
        tradingSuccess ? '盈利' : '亏损'
      }，余额：${tradingMoney}`
    );
    if (tradingMoney < 0) {
      record.push('爆仓！');
      return;
    }
  }

  record.push(
    `最终余额 ${tradingMoney}，盈利比例：${(
      ((tradingMoney - initialMoney) / initialMoney) *
      100
    ).toFixed(2)}%`
  );

  writeFileSync('./output.txt', record.join('\n'));

  console.log(tradingMoney);
};

trading();
