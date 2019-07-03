/*
 * @Author: czy0729
 * @Date: 2019-07-02 10:29:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-03 15:32:57
 */
import { observable } from 'mobx'
import store from '@/utils/store'

class GlobalStore extends store {
  @observable state = {
    categories: [
      {
        text: '灯具',
        value: '灯具'
      },
      {
        text: '灯饰',
        value: '灯饰'
      },
      {
        text: '光源',
        value: '光源'
      },
      {
        text: '家居',
        value: '家居'
      },
      {
        text: '办公',
        value: '办公'
      },
      {
        text: '商业',
        value: '商业'
      }
    ]
  }

  /**
   * 添加分类
   */
  addCategory = category => {
    const { categories } = this.state
    if (categories.findIndex(item => item.text === category) !== -1) {
      return false
    }

    const newCategories = [
      ...this.state.categories,
      {
        text: category,
        value: category
      }
    ]
    this.setState({
      categories: newCategories
    })
    return true
  }

  /**
   * 更新分类
   */
  updateCategories = categories => {
    this.setState({
      categories
    })
  }
}

const Store = new GlobalStore()

export default Store
