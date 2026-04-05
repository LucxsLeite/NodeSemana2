export class ItemAlreadyExistsError extends Error {
  constructor() {
    super('O item criado já existe no sistema')
  }
}
