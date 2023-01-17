const Spinner = () => {
  return (
    <div className="flex animate-bounce items-center justify-center space-x-2">
      <div className="h-8 w-8 rounded-full bg-orange-900"></div>
      <div className="h-8 w-8 rounded-full bg-green-400"></div>
      <div className="h-8 w-8 rounded-full bg-red-300"></div>
    </div>
  )
}

export default Spinner
