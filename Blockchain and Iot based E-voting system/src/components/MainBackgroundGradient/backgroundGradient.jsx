export default function BackgroundGradient({ children }) {
  return (
    <>
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <div className="absolute top-0 -z-10 h-full w-full bg-slate-100 [&>div]:absolute [&>div]:bottom-auto [&>div]:left-auto [&>div]:right-0 [&>div]:top-0 [&>div]:h-[350px] [&>div]:w-[350px] [&>div]:-translate-x-[320%] [&>div]:translate-y-[-30%] [&>div]:rounded-full [&>div]:bg-[rgba(212,60,202,0.71)] [&>div]:opacity-65 [&>div]:blur-[80px]">
          <div></div>
        </div>
      </div>
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <div className="absolute top-0 h-full w-full [&>div]:h-[550px] [&>div]:w-[550px] [&>div]:absolute [&>div]:inset-0 [&>div]:bg-[rgba(211,209,52,0.71)] [&>div]:opacity-65 [&>div]:rounded-full [&>div]:blur-[80px] [&>div]:-translate-x-[-220%] [&>div]:translate-y-[40%]">
          <div></div>
        </div>
      </div>
      {children}
    </>
  );
}
