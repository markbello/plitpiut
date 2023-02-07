import { FC, PropsWithChildren } from 'react'
import { QueryStatus } from 'react-query'
import Spinner from '../Spinner'

const LoadingWrapper: FC<
  PropsWithChildren<{ queryStatuses: QueryStatus[] }>
> = ({ children, queryStatuses }) => {
  if (queryStatuses.some((status) => status === 'error')) {
    return <>Something went wrong</>
  }

  if (queryStatuses.some((status) => status === 'loading')) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return <>{children}</>
}

export default LoadingWrapper
