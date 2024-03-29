/* @flow */

import type Watcher from './watcher'
import { remove } from '../util/index'
import config from '../config'

let uid = 0

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor() {
    this.id = uid++
    this.subs = [] //初始化了一个subs数组，用来存放依赖
  }

  addSub(sub: Watcher) {
    this.subs.push(sub)
  }

  // 删除一个依赖
  removeSub(sub: Watcher) {
    remove(this.subs, sub)
  }

  // 添加一个依赖
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  // 通知所有依赖更新
  notify() {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort((a, b) => a.id - b.id)
    }
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null
const targetStack = []

// 将watcher实例赋值给Dep.target，用于依赖收集。同时将该实例存入target栈中
export function pushTarget(target: ?Watcher) {
  targetStack.push(target)
  Dep.target = target
}

export function popTarget() {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
