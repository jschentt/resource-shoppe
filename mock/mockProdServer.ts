import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import testModule from './index'

export function setupProdMockServer(): void {
  createProdMockServer([...testModule])
}
