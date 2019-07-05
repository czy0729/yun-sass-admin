/*
 * @Author: czy0729
 * @Date: 2019-07-04 14:22:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-05 17:48:39
 */
import { observable } from 'mobx'
import { getTimestamp } from '@/utils'
import fetch from '@/utils/fetch'
import store from '@/utils/store'
import { LIST_EMPTY } from '@/constants'
import {
  API_PRODUCT_LIST,
  API_PRODUCT_COMMIT,
  API_CATEGORY_LIST,
  API_CATEGORY_COMMIT,
  API_CATEGORY_EDIT
} from '@/constants/api'

class GlobalStore extends store {
  @observable state = {
    productList: LIST_EMPTY,
    categories: [
      // {
      //   active: 1,
      //   id: '5d1ee927e5b72b0e882a7a9a',
      //   name: '灯具',
      //   state: 1,
      //   user_id: '100094'
      // }
    ]
  }

  /* ==================== Fetch ==================== */
  fetchProductList = async (page = 1) => {
    const data = await fetch(API_PRODUCT_LIST, {
      page
    })
    if (data.state === 1) {
      const productList = {
        list: data.content.rows,
        pagination: {
          page: data.content.page,
          pageTotal: data.content.page_num
        },
        _loaded: getTimestamp()
      }
      this.setState({
        productList
      })
    }
  }

  fetchCategories = async () => {
    const data = await fetch(API_CATEGORY_LIST)
    if (data.state === 1) {
      this.setState({
        categories: data.content.map(item => ({
          text: item.name,
          value: item.name,
          ...item
        }))
      })
    }
  }

  /* ==================== Action ==================== */
  doProductCommit = values => fetch(API_PRODUCT_COMMIT, values)

  doCategoryCommit = values => fetch(API_CATEGORY_COMMIT, values)

  doCategoriesEdit = values => fetch(API_CATEGORY_EDIT, values)

  /* ==================== Page ==================== */
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

export default new GlobalStore()
