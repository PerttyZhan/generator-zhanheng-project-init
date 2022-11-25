import type { Options } from 'deepmerge'
import Merge from 'deepmerge'
interface deepOptions extends Options {
  cloneUnlessOtherwiseSpecified(source: object, options: Options): any[];
  isMergeableObject(source: object): boolean;
}

// deepmerge库，数组合并的规则
export const overwriteMerge = (target: any[] = [], source: any[] = [], options: deepOptions): any[] => {
  const destination = target.slice();
  source.forEach((item, index) => {
    if (typeof destination[index] === 'undefined') {
      destination[index] = options.cloneUnlessOtherwiseSpecified(item, options)
    } else if (options.isMergeableObject(item)) {
      destination[index] = Merge(target[index], item, options)
    } else if (target.indexOf(item) === -1) {
      destination.push(item)
    }
  })
  return destination
}
export const merge = (
  source: Record<string, any>,
  target: Record<string, any>,
  options?: deepOptions 
) => {
  return Merge(source, target, Object.assign(options || {}, {
    arrayMerge: overwriteMerge
  }))
}