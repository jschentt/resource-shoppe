import { user, userRole, roleRoute, route, IMenubarList } from './data/user'
import { IReq } from './index'

export const setToken = (name: string): string => {
  return `token_${name}_token`
}

export const checkToken = (req: IReq): string => {
  const token = req.headers['access-token']
  const match = token.match(/^token_([\w|\W]+?)_token/)
  const userName = match ? match[1] : ''
  return userName
}

export const login = (name: string, pwd: string): boolean => {
  return user.findIndex((v) => v.name === name && v.pwd === pwd) !== -1
}

export const getUser = (name: string): { name: string; role: Array<string> } => {
  return {
    name,
    role: userRole.filter((v) => v.userName === name).map((v) => v.roleName)
  }
}

export const getRoute = (name: string): Array<IMenubarList> => {
  const { role } = getUser(name)
  const arr = roleRoute.filter((v) => role.findIndex((val) => val === v.roleName) !== -1)
  const filterRoute: Array<IMenubarList> = []
  route.forEach((v) => {
    arr.forEach((val) => {
      if (val.id === v.id) {
        const obj = { ...v }
        obj.meta.permission = val.permission
        filterRoute.push(obj)
      }
    })
  })
  return filterRoute
}
