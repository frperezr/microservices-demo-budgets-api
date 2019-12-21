// node modules
import { Client } from 'pg'
import squel from 'squel'

// lib
import { TBudget, TBudgetItem } from '../../../../../lib/ts/types'
import { IBudgetStore } from '../../../../../lib/ts/interfaces'
import { camelCaseObject } from '../../../../../lib/ts/transform'

// queries
import { getQuery, listQuery } from './queries'

class Store implements IBudgetStore {
  private db: Client

  constructor(db: Client) {
    this.db = db
  }

  // getBudget ...
  getBudget = async (id: string): Promise<TBudget> => {
    try {
      const result = await this.db.query(getQuery(id), [])
      if (result.rows.length === 0) {
        throw new Error('no budget found')
      }

      if (result.rows[0].row_to_json === null) {
        throw new Error('no budget found')
      }
      return camelCaseObject(result.rows[0].row_to_json)
    } catch (err) {
      throw err
    }
  }

  // listBudgets ...
  listBudgets = async (userId: string): Promise<[TBudget]> => {
    try {
      const result = await this.db.query(listQuery(userId), [])
      if (result.rows.length === 0) {
        throw new Error('no budgets found')
      }

      if (result.rows[0].array_to_json === null) {
        throw new Error('no budgets found')
      }
      return camelCaseObject(result.rows[0].array_to_json)
    } catch (err) {
      throw err
    }
  }

  // createBudget ...
  createBudget = async (userId: string, budgetLimit: number, name: string): Promise<TBudget> => {
    const query =
      squel
        .insert()
        .into('budgets')
        .set('user_id', userId)
        .set('budget_limit', budgetLimit)
        .set('name', name)
        .toString() + ' RETURNING *'

    try {
      const result = await this.db.query(query, [])
      return camelCaseObject(result.rows[0])
    } catch (err) {
      throw err
    }
  }

  // updateBudget ...
  updateBudget = async (budgetId: string, budgetLimit: number, spent: number, remaining: number): Promise<TBudget> => {
    const query =
      squel
        .update()
        .table('budgets')
        .set('budget_limit', budgetLimit)
        .set('spent', spent)
        .set('remaining', remaining)
        .where('id = ?', budgetId)
        .toString() + ' RETURNING *'

    try {
      const result = await this.db.query(query, [])
      return camelCaseObject(result.rows[0])
    } catch (err) {
      throw err
    }
  }

  // deleteBudget ...
  deleteBudget = async (id: string): Promise<TBudget> => {
    const query =
      squel
        .update()
        .table('budgets')
        .set('deleted_at', new Date().toISOString())
        .where('id = ?', id)
        .toString() + ' RETURNING *'

    try {
      const result = await this.db.query(query, [])
      return camelCaseObject(result.rows[0])
    } catch (err) {
      throw err
    }
  }

  // getItem ...
  getItem = async (itemId: string): Promise<TBudgetItem> => {
    const query = squel
      .select()
      .from('budgets_items')
      .where('id = ? and deleted_at is null', itemId)
      .toString()

    try {
      const result = await this.db.query(query, [])
      if (result.rows.length === 0) {
        throw new Error('no item found')
      }
      return camelCaseObject(result.rows[0])
    } catch (err) {
      throw err
    }
  }

  // addItem ...
  addItem = async (budgetId: string, item: TBudgetItem): Promise<TBudgetItem> => {
    const query =
      squel
        .insert()
        .into('budgets_items')
        .set('budget_id', budgetId)
        .set('city', item.city)
        .set('traveling_cost', item.travelingCost)
        .set('staying_cost', item.stayingCost)
        .toString() + ' RETURNING *'

    try {
      const result = await this.db.query(query, [])
      return camelCaseObject(result.rows[0])
    } catch (err) {
      throw err
    }
  }

  // deleteItem ...
  deleteItem = async (budgetId: string, item: TBudgetItem): Promise<TBudgetItem> => {
    const query =
      squel
        .update()
        .table('budgets_items')
        .set('deleted_at', new Date().toISOString())
        .where(`budget_id = '${budgetId}' AND id = '${item.id}'`)
        .toString() + ' RETURNING *'

    try {
      const result = await this.db.query(query, [])
      return camelCaseObject(result.rows[0])
    } catch (err) {
      throw err
    }
  }
}

export default Store
