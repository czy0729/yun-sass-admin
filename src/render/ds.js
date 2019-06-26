/*
 * @Author: czy0729
 * @Date: 2019-06-26 11:36:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-26 18:14:27
 */
import { random } from '@/utils'

export const recommendDS = [
  {
    text: '是',
    value: '1',
    status: 'success'
  },
  {
    text: '否',
    value: '0',
    status: 'default'
  }
]

// const _dataSource = Array.from(Array(50), (v, k) => k).map(item => ({
//   id: item,
//   name: `${random(5, 10)}°-${random(30, 90)}°可调焦迷你射灯 ${random(
//     5,
//     10
//   )}° ${random(3, 10)}W ${['1000K', '2000K', '3000K'][random(0, 3)]} ${
//     ['黑色', '白色', '米色', '红色'][random(0, 4)]
//   }`,
//   iesCount: random(1, 9),
//   pv: random(0, 100),
//   uv: random(0, 20),
//   sort: random(0, 100),
//   recommend: random(0, 2),
//   lastDate: 1561516558 + random(0, 360000)
// }))
// console.log(JSON.stringify(_dataSource))

export const dataSource = [
  {
    id: 0,
    name: '5°-52°可调焦迷你射灯 7° 8W 2000K 白色',
    iesCount: 8,
    pv: 15,
    uv: 15,
    sort: 73,
    recommend: 0,
    lastDate: 1561805599
  },
  {
    id: 1,
    name: '7°-67°可调焦迷你射灯 7° 7W 2000K 红色',
    iesCount: 2,
    pv: 66,
    uv: 7,
    sort: 38,
    recommend: 0,
    lastDate: 1561717520
  },
  {
    id: 2,
    name: '5°-72°可调焦迷你射灯 7° 3W 2000K 黑色',
    iesCount: 4,
    pv: 27,
    uv: 13,
    sort: 51,
    recommend: 1,
    lastDate: 1561679270
  },
  {
    id: 3,
    name: '8°-68°可调焦迷你射灯 9° 4W 1000K 黑色',
    iesCount: 7,
    pv: 99,
    uv: 2,
    sort: 45,
    recommend: 1,
    lastDate: 1561518862
  },
  {
    id: 4,
    name: '5°-72°可调焦迷你射灯 8° 6W 2000K 米色',
    iesCount: 8,
    pv: 95,
    uv: 1,
    sort: 71,
    recommend: 0,
    lastDate: 1561591690
  },
  {
    id: 5,
    name: '5°-71°可调焦迷你射灯 8° 8W 3000K 米色',
    iesCount: 6,
    pv: 93,
    uv: 15,
    sort: 45,
    recommend: 1,
    lastDate: 1561651783
  },
  {
    id: 6,
    name: '7°-49°可调焦迷你射灯 5° 5W 2000K 白色',
    iesCount: 6,
    pv: 63,
    uv: 15,
    sort: 3,
    recommend: 1,
    lastDate: 1561829320
  },
  {
    id: 7,
    name: '7°-77°可调焦迷你射灯 8° 9W 2000K 米色',
    iesCount: 2,
    pv: 53,
    uv: 1,
    sort: 60,
    recommend: 0,
    lastDate: 1561856503
  },
  {
    id: 8,
    name: '9°-31°可调焦迷你射灯 8° 7W 2000K 红色',
    iesCount: 1,
    pv: 20,
    uv: 17,
    sort: 0,
    recommend: 1,
    lastDate: 1561647941
  },
  {
    id: 9,
    name: '5°-47°可调焦迷你射灯 6° 7W 2000K 白色',
    iesCount: 2,
    pv: 33,
    uv: 17,
    sort: 2,
    recommend: 0,
    lastDate: 1561720789
  },
  {
    id: 10,
    name: '5°-61°可调焦迷你射灯 8° 8W 1000K 黑色',
    iesCount: 6,
    pv: 14,
    uv: 9,
    sort: 84,
    recommend: 0,
    lastDate: 1561669505
  },
  {
    id: 11,
    name: '9°-83°可调焦迷你射灯 6° 7W 1000K 米色',
    iesCount: 7,
    pv: 28,
    uv: 17,
    sort: 91,
    recommend: 0,
    lastDate: 1561759963
  },
  {
    id: 12,
    name: '9°-50°可调焦迷你射灯 6° 4W 2000K 白色',
    iesCount: 6,
    pv: 4,
    uv: 7,
    sort: 0,
    recommend: 0,
    lastDate: 1561723564
  },
  {
    id: 13,
    name: '6°-77°可调焦迷你射灯 7° 7W 3000K 白色',
    iesCount: 6,
    pv: 29,
    uv: 16,
    sort: 27,
    recommend: 0,
    lastDate: 1561618713
  },
  {
    id: 14,
    name: '7°-77°可调焦迷你射灯 9° 5W 1000K 黑色',
    iesCount: 4,
    pv: 47,
    uv: 9,
    sort: 31,
    recommend: 1,
    lastDate: 1561694658
  },
  {
    id: 15,
    name: '5°-81°可调焦迷你射灯 8° 4W 3000K 红色',
    iesCount: 8,
    pv: 74,
    uv: 1,
    sort: 12,
    recommend: 1,
    lastDate: 1561769260
  },
  {
    id: 16,
    name: '6°-76°可调焦迷你射灯 8° 8W 3000K 红色',
    iesCount: 6,
    pv: 16,
    uv: 16,
    sort: 76,
    recommend: 0,
    lastDate: 1561777464
  },
  {
    id: 17,
    name: '8°-81°可调焦迷你射灯 9° 7W 1000K 黑色',
    iesCount: 1,
    pv: 56,
    uv: 17,
    sort: 84,
    recommend: 1,
    lastDate: 1561624376
  },
  {
    id: 18,
    name: '8°-84°可调焦迷你射灯 9° 8W 3000K 白色',
    iesCount: 5,
    pv: 68,
    uv: 18,
    sort: 65,
    recommend: 1,
    lastDate: 1561875974
  },
  {
    id: 19,
    name: '5°-85°可调焦迷你射灯 7° 4W 1000K 红色',
    iesCount: 2,
    pv: 98,
    uv: 18,
    sort: 64,
    recommend: 1,
    lastDate: 1561706406
  },
  {
    id: 20,
    name: '6°-52°可调焦迷你射灯 6° 9W 2000K 红色',
    iesCount: 1,
    pv: 74,
    uv: 6,
    sort: 73,
    recommend: 1,
    lastDate: 1561805334
  },
  {
    id: 21,
    name: '6°-82°可调焦迷你射灯 5° 3W 2000K 黑色',
    iesCount: 3,
    pv: 15,
    uv: 8,
    sort: 82,
    recommend: 0,
    lastDate: 1561585643
  },
  {
    id: 22,
    name: '6°-88°可调焦迷你射灯 7° 5W 3000K 红色',
    iesCount: 1,
    pv: 87,
    uv: 15,
    sort: 45,
    recommend: 0,
    lastDate: 1561534599
  },
  {
    id: 23,
    name: '8°-53°可调焦迷你射灯 6° 8W 3000K 红色',
    iesCount: 8,
    pv: 26,
    uv: 10,
    sort: 44,
    recommend: 1,
    lastDate: 1561587664
  },
  {
    id: 24,
    name: '8°-43°可调焦迷你射灯 7° 5W 2000K 米色',
    iesCount: 7,
    pv: 60,
    uv: 1,
    sort: 35,
    recommend: 1,
    lastDate: 1561731302
  },
  {
    id: 25,
    name: '9°-73°可调焦迷你射灯 9° 5W 2000K 红色',
    iesCount: 8,
    pv: 81,
    uv: 19,
    sort: 54,
    recommend: 1,
    lastDate: 1561732257
  },
  {
    id: 26,
    name: '7°-38°可调焦迷你射灯 5° 3W 2000K 黑色',
    iesCount: 1,
    pv: 92,
    uv: 1,
    sort: 54,
    recommend: 0,
    lastDate: 1561747294
  },
  {
    id: 27,
    name: '5°-38°可调焦迷你射灯 5° 8W 3000K 白色',
    iesCount: 4,
    pv: 56,
    uv: 18,
    sort: 51,
    recommend: 1,
    lastDate: 1561706736
  },
  {
    id: 28,
    name: '7°-43°可调焦迷你射灯 8° 6W 1000K 红色',
    iesCount: 3,
    pv: 84,
    uv: 15,
    sort: 82,
    recommend: 0,
    lastDate: 1561765255
  },
  {
    id: 29,
    name: '8°-81°可调焦迷你射灯 6° 8W 2000K 白色',
    iesCount: 2,
    pv: 89,
    uv: 10,
    sort: 61,
    recommend: 1,
    lastDate: 1561774880
  },
  {
    id: 30,
    name: '6°-55°可调焦迷你射灯 6° 7W 1000K 米色',
    iesCount: 8,
    pv: 33,
    uv: 19,
    sort: 82,
    recommend: 1,
    lastDate: 1561775697
  },
  {
    id: 31,
    name: '5°-66°可调焦迷你射灯 8° 5W 2000K 黑色',
    iesCount: 5,
    pv: 64,
    uv: 14,
    sort: 40,
    recommend: 0,
    lastDate: 1561861745
  },
  {
    id: 32,
    name: '9°-37°可调焦迷你射灯 9° 8W 2000K 黑色',
    iesCount: 7,
    pv: 44,
    uv: 4,
    sort: 77,
    recommend: 0,
    lastDate: 1561685143
  },
  {
    id: 33,
    name: '7°-30°可调焦迷你射灯 8° 7W 2000K 白色',
    iesCount: 4,
    pv: 79,
    uv: 4,
    sort: 34,
    recommend: 1,
    lastDate: 1561631137
  },
  {
    id: 34,
    name: '8°-74°可调焦迷你射灯 8° 7W 3000K 米色',
    iesCount: 8,
    pv: 48,
    uv: 7,
    sort: 22,
    recommend: 0,
    lastDate: 1561610692
  },
  {
    id: 35,
    name: '6°-44°可调焦迷你射灯 9° 4W 1000K 黑色',
    iesCount: 7,
    pv: 33,
    uv: 19,
    sort: 98,
    recommend: 0,
    lastDate: 1561521322
  },
  {
    id: 36,
    name: '6°-62°可调焦迷你射灯 7° 8W 3000K 米色',
    iesCount: 8,
    pv: 29,
    uv: 3,
    sort: 13,
    recommend: 0,
    lastDate: 1561717623
  },
  {
    id: 37,
    name: '9°-64°可调焦迷你射灯 8° 4W 3000K 黑色',
    iesCount: 5,
    pv: 15,
    uv: 13,
    sort: 37,
    recommend: 0,
    lastDate: 1561540956
  },
  {
    id: 38,
    name: '8°-37°可调焦迷你射灯 7° 6W 3000K 白色',
    iesCount: 7,
    pv: 91,
    uv: 1,
    sort: 15,
    recommend: 0,
    lastDate: 1561716443
  },
  {
    id: 39,
    name: '5°-39°可调焦迷你射灯 8° 3W 2000K 黑色',
    iesCount: 1,
    pv: 57,
    uv: 10,
    sort: 90,
    recommend: 1,
    lastDate: 1561825244
  },
  {
    id: 40,
    name: '8°-47°可调焦迷你射灯 7° 9W 3000K 黑色',
    iesCount: 4,
    pv: 36,
    uv: 6,
    sort: 72,
    recommend: 1,
    lastDate: 1561719936
  },
  {
    id: 41,
    name: '6°-56°可调焦迷你射灯 5° 3W 3000K 米色',
    iesCount: 3,
    pv: 35,
    uv: 7,
    sort: 46,
    recommend: 1,
    lastDate: 1561521163
  },
  {
    id: 42,
    name: '8°-89°可调焦迷你射灯 6° 8W 2000K 红色',
    iesCount: 5,
    pv: 74,
    uv: 10,
    sort: 36,
    recommend: 1,
    lastDate: 1561612667
  },
  {
    id: 43,
    name: '5°-49°可调焦迷你射灯 9° 9W 3000K 红色',
    iesCount: 5,
    pv: 14,
    uv: 15,
    sort: 70,
    recommend: 0,
    lastDate: 1561710719
  },
  {
    id: 44,
    name: '8°-43°可调焦迷你射灯 8° 8W 3000K 黑色',
    iesCount: 4,
    pv: 32,
    uv: 5,
    sort: 54,
    recommend: 0,
    lastDate: 1561813979
  },
  {
    id: 45,
    name: '6°-56°可调焦迷你射灯 5° 5W 1000K 白色',
    iesCount: 1,
    pv: 72,
    uv: 15,
    sort: 25,
    recommend: 1,
    lastDate: 1561654717
  },
  {
    id: 46,
    name: '8°-41°可调焦迷你射灯 7° 8W 1000K 米色',
    iesCount: 2,
    pv: 25,
    uv: 5,
    sort: 87,
    recommend: 0,
    lastDate: 1561722489
  },
  {
    id: 47,
    name: '6°-40°可调焦迷你射灯 6° 8W 2000K 红色',
    iesCount: 4,
    pv: 43,
    uv: 0,
    sort: 99,
    recommend: 0,
    lastDate: 1561622219
  },
  {
    id: 48,
    name: '6°-51°可调焦迷你射灯 7° 5W 1000K 黑色',
    iesCount: 8,
    pv: 59,
    uv: 5,
    sort: 96,
    recommend: 0,
    lastDate: 1561769130
  },
  {
    id: 49,
    name: '7°-46°可调焦迷你射灯 5° 5W 2000K 白色',
    iesCount: 8,
    pv: 72,
    uv: 13,
    sort: 65,
    recommend: 1,
    lastDate: 1561641876
  }
]
