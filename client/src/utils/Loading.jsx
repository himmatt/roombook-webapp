const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-md bg-white/30">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-indigo-600 animate-bounce"></div>
        <div className="w-3 h-3 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '0.15s' }}></div>
        <div className="w-3 h-3 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '0.3s' }}></div>
      </div>
    </div>
  )
}

export default Loading
