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

  listBudgets = async (userId: string): Promise<[TBudget]> => {
    try {
      const budgets = await this.store.listBudgets(userId)
      return budgets
    } catch (err) {
      throw err
    }
  }

  createBudget = async (userId: string, budgetLimit: number, name: string): Promise<TBudget> => {
    try {
      const budget = await this.store.createBudget(userId, budgetLimit, name)
      return budget
    } catch (err) {
      throw err
    }
  }

  addItem = async (budgetId: string, item: TBudgetItem): Promise<TBudget> => {
    try {
      let budget = await this.store.getBudget(budgetId)
      const { spent, budgetLimit } = budget
      const { stayingCost, travelingCost } = item

      const found = budget.items !== null ? budget.items.filter((ele) => ele.city === item.city) : []

      if (found.length > 0) {
        return budget
      }

      const newSpent = spent + (stayingCost + travelingCost)
      if (newSpent > budgetLimit) {
        throw new Error('budget exceeded')
      }

      await this.store.addItem(budgetId, item)
      await this.store.updateBudget(budgetId, budgetLimit, newSpent, budgetLimit - newSpent)

      budget = await this.store.getBudget(budgetId)
      return budget
    } catch (err) {
      throw err
    }
  }

  deleteItem = async (budgetId: string, item: TBudgetItem): Promise<TBudget> => {
    try {
      const budgetItem = await this.store.getItem(item.id)
      const { stayingCost, travelingCost } = budgetItem
      await this.store.deleteItem(budgetId, item)

      let budget = await this.store.getBudget(budgetId)
      const { spent, budgetLimit } = budget

      const newSpent = spent - (stayingCost + travelingCost)

      if (newSpent < 0) {
        await this.store.updateBudget(budgetId, budgetLimit, 0, budgetLimit)
      } else {
        await this.store.updateBudget(budgetId, budgetLimit, newSpent, budgetLimit - newSpent)
      }

      budget = await this.store.getBudget(budgetId)
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
