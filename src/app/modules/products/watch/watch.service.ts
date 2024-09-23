import ApiError from '../../../../errors/ApiError'
import { Watch } from './watch.model'
import { IWatch } from './watch.interface'

const createWatch = async (payload: IWatch): Promise<IWatch | null> => {
  const createdWatch = await Watch.create(payload)

  if (!createdWatch) {
    throw new ApiError(400, `Failed to create Watch!`)
  }

  return createdWatch
}

export const WatchService = {
  createWatch,
}
