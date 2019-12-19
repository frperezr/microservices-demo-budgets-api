// node modules
import { Context } from 'mali'

// service
import Service from '../service'

// lib
import {
  TGetBudgetResponse,
  TListbudgetsResponse,
  TCreateBudgetResponse,
  TAddItemResponse,
  TDeleteItemResponse,
  TDeleteBudgetResponse,
} from '../../../../lib/ts/types'

import { IBudgetRPC } from '../../../../lib/ts/interfaces'

class RPC implements IBudgetRPC {
  private service: Service

  constructor(service: Service) {
    this.service = service
  }

  getBudget = async (ctx: Context, next: Function): Promise<void> => {
    const { id } = ctx.req
    if (id === undefined) {
      const res = <TGetBudgetResponse>{
        data: null,
        error: {
          code: 400,
          message: 'missing id param',
        },
      }
      ctx.res = res
      return
    }

    try {
      const budget = await this.service.getBudget(id)
      const res = <TGetBudgetResponse>{
        data: budget,
        error: null,
      }

      ctx.res = res
      return
    } catch (error) {
      const res = <TGetBudgetResponse>{
        data: null,
        error: {
          code: 500,
          message: error.message,
        },
      }

      ctx.res = res
      return
    }
  }

  listBudgets = async (ctx: Context, next: Function): Promise<void> => {
    const { userId } = ctx.req
    if (userId === undefined) {
      const res = <TListbudgetsResponse>{
        data: null,
        error: {
          code: 400,
          message: 'missing userId param',
        },
      }
      ctx.res = res
      return
    }
    try {
      const budgets = await this.service.listBudgets(userId)
      const res = <TListbudgetsResponse>{
        data: budgets,
        error: null,
      }

      ctx.res = res
      return
    } catch (error) {
      const res = <TListbudgetsResponse>{
        data: null,
        error: {
          code: 500,
          message: error.message,
        },
      }

      ctx.res = res
      return
    }
  }

  createBudget = async (ctx: Context, next: Function): Promise<void> => {
    const { userId, budgetLimit, name } = ctx.req
    if (userId === undefined) {
      const res = <TCreateBudgetResponse>{
        data: null,
        error: {
          code: 400,
          message: 'missing user_id param',
        },
      }

      ctx.res = res
      return
    }

    if (budgetLimit === undefined) {
      const res = <TCreateBudgetResponse>{
        data: null,
        error: {
          code: 400,
          message: 'missing budget_limit param',
        },
      }

      ctx.res = res
      return
    }

    if (name === undefined) {
      const res = <TCreateBudgetResponse>{
        data: null,
        error: {
          code: 400,
          message: 'missing name param',
        },
      }

      ctx.res = res
      return
    }

    try {
      const budget = await this.service.createBudget(userId, budgetLimit, name)
      const res = <TCreateBudgetResponse>{
        data: budget,
        error: null,
      }

      ctx.res = res
      return
    } catch (error) {
      const res = <TCreateBudgetResponse>{
        data: null,
        error: {
          code: 500,
          message: error.message,
        },
      }

      ctx.res = res
      return
    }
  }

  addItem = async (ctx: Context, next: Function): Promise<void> => {
    const { budgetId, item } = ctx.req
    const { city, travelingCost, stayingCost } = item
    if (budgetId === undefined) {
      const res = <TAddItemResponse>{
        data: null,
        error: {
          code: 400,
          message: 'missing budget_id param',
        },
      }

      ctx.res = res
      return
    }

    if (item === undefined || item === null) {
      const res = <TAddItemResponse>{
        data: null,
        error: {
          code: 400,
          message: 'missing item param',
        },
      }

      ctx.res = res
      return
    }

    if (city === undefined) {
      const res = <TAddItemResponse>{
        data: null,
        error: {
          code: 400,
          message: 'missing city param',
        },
      }

      ctx.res = res
      return
    }

    if (travelingCost === undefined) {
      const res = <TAddItemResponse>{
        data: null,
        error: {
          code: 400,
          message: 'missing traveling_cost param',
        },
      }

      ctx.res = res
      return
    }

    if (stayingCost === undefined) {
      const res = <TAddItemResponse>{
        data: null,
        error: {
          code: 400,
          message: 'missing staying_cost param',
        },
      }

      ctx.res = res
      return
    }

    try {
      const budget = await this.service.addItem(budgetId, item)
      const res = <TAddItemResponse>{
        data: budget,
        error: null,
      }

      ctx.res = res
      return
    } catch (error) {
      const res = <TAddItemResponse>{
        data: null,
        error: {
          code: 500,
          message: error.message,
        },
      }

      ctx.res = res
      return
    }
  }

  deleteItem = async (ctx: Context, next: Function): Promise<void> => {
    const { budgetId, item } = ctx.req
    const { id } = item
    if (budgetId === undefined) {
      const res = <TDeleteItemResponse>{
        data: null,
        error: {
          code: 400,
          message: 'missing budget_id param',
        },
      }

      ctx.res = res
      return
    }

    if (item === undefined || item === null) {
      const res = <TDeleteItemResponse>{
        data: null,
        error: {
          code: 400,
          message: 'missing item param',
        },
      }

      ctx.res = res
      return
    }

    if (item === undefined) {
      const res = <TDeleteItemResponse>{
        data: null,
        error: {
          code: 400,
          message: 'missing item.id param',
        },
      }

      ctx.res = res
      return
    }

    try {
      const budget = await this.service.deleteItem(budgetId, item)
      const res = <TDeleteItemResponse>{
        data: budget,
        error: null,
      }

      ctx.res = res
      return
    } catch (error) {
      const res = <TDeleteItemResponse>{
        data: null,
        error: {
          code: 500,
          message: error.message,
        },
      }

      ctx.res = res
      return
    }
  }

  deleteBudget = async (ctx: Context, next: Function): Promise<void> => {
    const { id } = ctx.req
    if (id === undefined) {
      const res = <TDeleteBudgetResponse>{
        data: null,
        error: {
          code: 400,
          message: 'missing budget_id param',
        },
      }

      ctx.res = res
      return
    }

    try {
      const budget = await this.service.deleteBudget(id)
      const res = <TDeleteBudgetResponse>{
        data: budget,
        error: null,
      }

      ctx.res = res
      return
    } catch (error) {
      const res = <TDeleteBudgetResponse>{
        data: null,
        error: {
          code: 500,
          message: error.message,
        },
      }

      ctx.res = res
      return
    }
  }
}

export default RPC
