// store
import Store from '../database/postgres/store'

// types
import { TBudget, TBudgetItem } from '../../../../lib/ts/types'

// interfaces
import { IBucketService } from '../../../../lib/ts/interfaces'

class Service implements IBucketService {
  private store: Store

  constructor(store: Store) {
    this.store = store
  }

  getBudget = async (id: string): Promise<TBudget> => {
    try {
      const budget = await this.store.getBudget(id)
      return budget
    } catch (err) {
      throw err
    }
  }

  listBudgets = async (): Promise<[TBudget]> => {
    try {
      const budgets = await this.store.listBudgets()
      return budgets
    } catch (err) {
      throw err
    }
  }

  createBudget = async (userId: string, budgetLimit: number): Promise<TBudget> => {
    try {
      const budget = await this.store.createBudget(userId, budgetLimit)
      return budget
    } catch (err) {
      throw err
    }
  }

  addItem = async (budgetId: string, item: TBudgetItem): Promise<TBudget> => {
    try {
      let budget = await this.store.getBudget(budgetId)
      const found = budget.items !== null ? budget.items.filter((ele) => ele.id === item.id) : []

      if (found.length === 0) {
        await this.store.addItem(budgetId, item)
      }

      budget = await this.store.getBudget(budgetId)
      return budget
    } catch (err) {
      throw err
    }
  }

  deleteItem = async (budgetId: string, item: TBudgetItem): Promise<TBudget> => {
    try {
      await this.store.deleteItem(budgetId, item)
      const budget = await this.store.getBudget(budgetId)
      return budget
    } catch (error) {
      throw error
    }
  }

  deleteBudget = async (id: string): Promise<TBudget> => {
    try {
      const budget = await this.store.getBudget(id)
      await this.store.deleteBudget(id)
      return budget
    } catch (error) {
      throw error
    }
  }
}

export default Service
