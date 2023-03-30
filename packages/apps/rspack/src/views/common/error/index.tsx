import s from './index.module.css'
const ErrorPage = () => {
  return (
    <>
      <div className={s.errorPage}>
        <div>
          <h1 className={s.textNum} data-h1="404">
            404
          </h1>
          <p className={s.textFun} data-p="NOT FOUND">
            NOT FOUND
          </p>
        </div>
      </div>
      <div id={s.particles}></div>
    </>
  )
}

export { ErrorPage }
