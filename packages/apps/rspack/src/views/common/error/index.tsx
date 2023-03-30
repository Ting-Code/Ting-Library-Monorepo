import './index.less'

const ErrorPage = () => {
  return (
    <div className="error-page-wrapper">
      <div className="error-page">
        <div>
          <h1 className="text-num" data-h1="404">
            404
          </h1>
          <p className="text-fun" data-p="NOT FOUND">
            NOT FOUND
          </p>
        </div>
      </div>
      <div id="particles-js"></div>
    </div>
  )
}

export { ErrorPage }
